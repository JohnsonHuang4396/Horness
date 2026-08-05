// 模板安装：拷贝骨架、备份冲突、生成配置、合并 gitignore。
import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { generateConfig, validateConfig, type AgentId } from './config.ts'
import { detectStack } from './detect.ts'

/** 模板根目录。打包时由 tsdown 注入指向 dist/template；源码运行时回退到项目根 template。 */
declare const __HARNESS_TEMPLATE_ROOT__: string | undefined

export function templateRoot(): string {
  const root =
    typeof __HARNESS_TEMPLATE_ROOT__ === 'string' ? __HARNESS_TEMPLATE_ROOT__ : '../template/'
  return new URL(root, import.meta.url).pathname
}

export interface InstallOpts {
  name: string
  stack?: string
  dryRun?: boolean
  force?: boolean
  agents?: AgentId[]
}

export interface InstallReport {
  dryRun: boolean
  detected: {
    stack: string
    lang: string
    packageManager: string
    evidence: string[]
  }
  actions: string[]
  backup?: string
  configPath?: string
  skipReason?: string
}

/** 所有 agent 共享、与具体 agent 无关的资产。`.agents/skills` 是通用技能中心，codex/opencode/pi 自动读取。 */
const SHARED_ASSETS = ['.harness', '.agents', 'AGENTS.md', 'HARNESS.md'] as const

/** 每个 agent 专属的脚手架资产（相对项目根）。 */
const AGENT_ASSETS: Record<AgentId, readonly string[]> = {
  claude: ['.claude'],
  codex: ['.codex'],
  opencode: ['.opencode', 'opencode.json'],
  pi: ['.pi'],
}

/** 备份时覆盖全部资产（含各 agent），保证不覆盖用户任何已有配置。 */
const ALL_ASSETS = [...SHARED_ASSETS, ...Object.values(AGENT_ASSETS).flat()] as const

/** 解析要安装的 agent 清单（默认仅 claude，向后兼容）。 */
export function resolveAgents(agents?: AgentId[]): AgentId[] {
  return agents && agents.length > 0 ? agents : ['claude']
}

/** 若目标已有任何资产，移动到 .harness.backup-<ts>/（不覆盖）。 */
export function backupExisting(target: string, ts: string, dryRun: boolean): string | undefined {
  const existing = ALL_ASSETS.filter(a => existsSync(join(target, a)))
  if (existing.length === 0) return undefined
  const backup = join(target, `.harness.backup-${ts}`)
  if (!dryRun) {
    mkdirSync(backup, { recursive: true })
    for (const a of existing) renameSync(join(target, a), join(backup, a))
  }
  return backup
}

/** 拷贝指定 list 的模板资产到目标。 */
function copyAssets(target: string, assets: readonly string[], dryRun: boolean): string[] {
  const actions: string[] = []
  const root = templateRoot()
  for (const a of assets) {
    const src = join(root, a)
    const dest = join(target, a)
    if (!existsSync(src)) continue
    if (!dryRun) cpSync(src, dest, { recursive: true })
    actions.push(`拷贝 ${a}`)
  }
  return actions
}

/**
 * 拷贝模板骨架：共享资产 + 所选 agent 的脚手架。
 * 技能以 `.agents/skills` 为单一来源（codex/opencode/pi 自动读取）；
 * Claude 只读 `.claude/skills`，选中 claude 时把技能镜像过去。
 */
export function copyTemplate(target: string, dryRun: boolean, agents: AgentId[]): string[] {
  const actions = copyAssets(target, SHARED_ASSETS, dryRun)
  for (const a of agents) actions.push(...copyAssets(target, AGENT_ASSETS[a], dryRun))
  if (agents.includes('claude')) {
    const src = join(templateRoot(), '.agents', 'skills')
    const dest = join(target, '.claude', 'skills')
    if (!dryRun) cpSync(src, dest, { recursive: true })
    actions.push('镜像技能 → .claude/skills')
  }
  return actions
}

/** 生成 .harness/config.json 并校验。 */
export function writeConfig(target: string, opts: InstallOpts, dryRun: boolean): string {
  const detected = detectStack(target)
  const cfg = generateConfig({
    name: opts.name,
    stack: opts.stack ?? detected.stack,
    lang: detected.lang,
    packageManager: detected.packageManager,
    agents: resolveAgents(opts.agents),
  })
  const v = validateConfig(cfg)
  if (!v.ok) throw new Error(`生成配置校验失败: ${v.errors.join('; ')}`)
  const configPath = join(target, '.harness', 'config.json')
  if (!dryRun) {
    mkdirSync(join(target, '.harness'), { recursive: true })
    writeFileSync(configPath, JSON.stringify(cfg, null, 2) + '\n')
  }
  return configPath
}

/** 把 gitignore.harness 规则合并进目标 .gitignore（不重复追加）。 */
export function mergeGitignore(target: string, dryRun: boolean): boolean {
  const rules = readFileSync(join(templateRoot(), 'gitignore.harness'), 'utf8')
  const giPath = join(target, '.gitignore')
  let updated = false
  if (existsSync(giPath)) {
    const existing = readFileSync(giPath, 'utf8')
    if (!existing.includes('.harness/host-sessions')) {
      if (!dryRun) writeFileSync(giPath, existing.trimEnd() + '\n\n' + rules + '\n')
      updated = true
    }
  } else if (!dryRun) {
    writeFileSync(giPath, rules + '\n')
    updated = true
  }
  return updated
}

/** 主安装流程：探测 → 备份 → 拷贝 → 配置 → gitignore。返回报告。 */
export function install(target: string, opts: InstallOpts): InstallReport {
  const detected = detectStack(target)
  const actions: string[] = []

  // 幂等：已初始化且非 --force 时跳过。
  const existingCfg = join(target, '.harness', 'config.json')
  if (!opts.force && existsSync(existingCfg)) {
    return {
      dryRun: !!opts.dryRun,
      detected,
      actions,
      skipReason: '目标已初始化（.harness/config.json 存在），用 --force 覆盖。',
    }
  }

  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  const backup = backupExisting(target, ts, !!opts.dryRun)
  if (backup) actions.push(`备份已有资产 → ${backup}`)

  actions.push(...copyTemplate(target, !!opts.dryRun, resolveAgents(opts.agents)))
  const configPath = writeConfig(target, opts, !!opts.dryRun)
  actions.push(`生成配置 ${configPath}`)

  if (mergeGitignore(target, !!opts.dryRun)) actions.push('合并 .gitignore')

  return { dryRun: !!opts.dryRun, detected, actions, backup, configPath }
}
