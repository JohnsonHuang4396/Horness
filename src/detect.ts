// 技术栈探测：从锁文件/构建描述识别 stack/packageManager/lang。
// 只读目标目录，不联网、不猜目录名。信号规则见 registry/stack.json。
//
// monorepo：根目录命中工作区标记（pnpm-workspace.yaml / lerna.json / nx.json /
// turbo.json / package.json workspaces）时，stack='monorepo'，并扫子目录（深度≤2、
// 跳过噪音目录）逐个跑同一套检测器收集各工作区 stack。

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import registryJson from '../registry/stack.json' with { type: 'json' }

interface Signal {
  type: 'file-exists' | 'file-contains'
  path: string
  needle?: string
}

interface StackDef {
  id: string
  label: string
  lang: string
  signals: Signal[]
}

interface PkgMgrDef {
  id: string
  signals: Signal[]
}

interface Registry {
  stacks: StackDef[]
  packageManagers: PkgMgrDef[]
}

const registry = registryJson as Registry

export interface WorkspaceDetection {
  rel: string
  stack: string
  lang: string
  packageManager: string
}

export interface Detection {
  stack: string
  lang: string
  packageManager: string
  testEntry: string | null
  buildCommand: string | null
  evidence: string[]
  isMonorepo: boolean
  workspaces: WorkspaceDetection[]
}

/** monorepo 扫描时跳过的目录（构建产物/元数据/本工具自身脚手架）。 */
const NOISE_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  'out',
  'target',
  'coverage',
  '.harness',
  '.claude',
  '.codex',
  '.opencode',
  '.pi',
  '.agents',
  '.vscode',
  '.idea',
  '.next',
  '.nuxt',
  '.cache',
  '.turbo',
  '.nx',
  'vendor',
  '.venv',
  '__pycache__',
  'tmp',
  '.gitlab',
  '.github',
  'docs',
])

/** monorepo 工作区标记 → 默认包管理器（可被锁文件 / packageManager 字段覆盖）。 */
const MONOREPO_MARKERS: { file: string; needle?: string; packageManager: string }[] = [
  { file: 'pnpm-workspace.yaml', packageManager: 'pnpm' },
  { file: 'rush.json', packageManager: 'pnpm' },
  { file: 'lerna.json', packageManager: 'npm' },
  { file: 'nx.json', packageManager: 'npm' },
  { file: 'turbo.json', packageManager: 'npm' },
  { file: 'turborepo.json', packageManager: 'npm' },
  { file: 'package.json', needle: '"workspaces"', packageManager: 'npm' },
]

function signalMatches(dir: string, s: Signal): boolean {
  const p = join(dir, s.path)
  if (s.type === 'file-exists') return existsSync(p)
  if (s.type === 'file-contains') {
    if (!existsSync(p)) return false
    try {
      return readFileSync(p, 'utf8').includes(s.needle ?? '')
    } catch {
      return false
    }
  }
  return false
}

function firstMatch(defs: { id: string; signals: Signal[] }[], dir: string): { id: string; evidence: string[] } | null {
  for (const d of defs) {
    const matched = d.signals.filter(s => signalMatches(dir, s))
    if (matched.length > 0) return { id: d.id, evidence: matched.map(s => s.path) }
  }
  return null
}

/** 读该目录 package.json 的 `packageManager:"pnpm@9"` 字段（返回 pnpm）。 */
function packageManagerFromPkg(dir: string): string | null {
  const p = join(dir, 'package.json')
  if (!existsSync(p)) return null
  try {
    const field = JSON.parse(readFileSync(p, 'utf8')).packageManager
    if (typeof field === 'string' && field) return field.split('@')[0]
  } catch {
    /* 忽略坏 JSON */
  }
  return null
}

/** 根/单目录的包管理器：锁文件优先 → packageManager 字段 → 工作区标记默认。 */
function detectPackageManager(dir: string, markerPm?: string): string {
  const lock = firstMatch(registry.packageManagers, dir)
  if (lock) return lock.id
  const pkg = packageManagerFromPkg(dir)
  if (pkg) return pkg
  return markerPm ?? 'unknown'
}

/** 从子项目向上逐级找最近包管理器（锁文件 → packageManager 字段），边界到 monorepo 根。 */
function detectUpwardPM(full: string, root: string): string {
  const inBoundary = (p: string) => p === root || relative(root, p).startsWith('..') === false
  let cur = full
  for (;;) {
    if (!inBoundary(cur)) break
    const lock = firstMatch(registry.packageManagers, cur)
    if (lock) return lock.id
    const pkg = packageManagerFromPkg(cur)
    if (pkg) return pkg
    if (cur === root) break
    cur = dirname(cur)
  }
  return 'unknown'
}

/** 命中任一 monorepo 工作区标记则返回 {packageManager}，否则 null。 */
function monorepoMarker(dir: string): { packageManager: string; evidence: string } | null {
  for (const m of MONOREPO_MARKERS) {
    if (signalMatches(dir, { type: 'file-exists', path: m.file })) {
      if (!m.needle || signalMatches(dir, { type: 'file-contains', path: m.file, needle: m.needle })) {
        return { packageManager: m.packageManager, evidence: m.file }
      }
    }
  }
  return null
}

/** 扫描子目录（深度≤2，跳过噪音）收集各工作区 stack，有实际信号的才上报。 */
function collectWorkspaces(root: string): WorkspaceDetection[] {
  const out: WorkspaceDetection[] = []
  const seen = new Set<string>()
  const walk = (base: string, depth: number) => {
    if (depth > 2) return
    let entries
    try {
      entries = readdirSync(base, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (!e.isDirectory() || NOISE_DIRS.has(e.name)) continue
      const full = join(base, e.name)
      const d = detectStack(full)
      const rel = relative(root, full)
      if (d.stack !== 'unknown' && !seen.has(rel)) {
        seen.add(rel)
        out.push({
          rel,
          stack: d.stack,
          lang: d.lang,
          // 子项目向上就近找包管理器（锁文件→packageManager 字段），而非直接继承根
          packageManager: detectUpwardPM(full, root),
        })
      }
      walk(full, depth + 1)
    }
  }
  walk(root, 0)
  return out
}

/** 探测目标目录的技术栈。monorepo 根返回 stack='monorepo' + 工作区清单。 */
export function detectStack(dir: string): Detection {
  const marker = monorepoMarker(dir)
  if (marker) {
    const packageManager = detectPackageManager(dir, marker.packageManager)
    return {
      stack: 'monorepo',
      lang: 'multi',
      packageManager,
      testEntry: null,
      buildCommand: null,
      evidence: [marker.evidence],
      isMonorepo: true,
      workspaces: collectWorkspaces(dir),
    }
  }

  const evidence: string[] = []
  let stack = 'unknown'
  let lang = 'unknown'

  for (const s of registry.stacks) {
    if (s.signals.some(sig => signalMatches(dir, sig))) {
      stack = s.id
      lang = s.lang
      evidence.push(...s.signals.map(sig => sig.path))
      break
    }
  }

  const packageManager = detectPackageManager(dir)
  if (stack !== 'unknown') {
    const pm = firstMatch(registry.packageManagers, dir)
    if (pm) evidence.push(...pm.evidence)
    return {
      stack,
      lang,
      packageManager,
      testEntry: null,
      buildCommand: null,
      evidence,
      isMonorepo: false,
      workspaces: [],
    }
  }

  // 无 workspace 标记、根也无单项目信号 → 多项目目录（backend×N + frontend×N）容器扫描
  const workspaces = collectWorkspaces(dir)
  if (workspaces.length > 0) {
    return {
      stack: 'multi-project',
      lang: 'multi',
      packageManager,
      testEntry: null,
      buildCommand: null,
      evidence: [],
      isMonorepo: true,
      workspaces,
    }
  }

  return {
    stack,
    lang,
    packageManager,
    testEntry: null,
    buildCommand: null,
    evidence,
    isMonorepo: false,
    workspaces: [],
  }
}
