// 技术栈探测：从锁文件/构建描述识别 stack/packageManager/lang。
// 只读目标目录，不联网、不猜目录名。信号规则见 registry/stack.json。

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
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

export interface Detection {
  stack: string
  lang: string
  packageManager: string
  testEntry: string | null
  buildCommand: string | null
  evidence: string[]
}

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

/** 探测目标目录的技术栈。无匹配时 stack 为 'unknown'。 */
export function detectStack(dir: string): Detection {
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

  const pm = firstMatch(registry.packageManagers, dir)
  const packageManager = pm?.id ?? 'unknown'
  if (pm) evidence.push(...pm.evidence)

  return { stack, lang, packageManager, testEntry: null, buildCommand: null, evidence }
}
