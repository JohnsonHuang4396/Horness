// CLI 参数：用 zod 定义并校验 `horness init` 的命令行参数。
import { z } from 'zod'
import { AGENT_IDS, type AgentId } from './config.ts'

const AGENT_ENUM = z.enum(AGENT_IDS)
const ALL = 'all'

export const InitArgsSchema = z.object({
  target: z.string({ message: '缺少目标目录（第一个位置参数）' }).min(1, '缺少目标目录（第一个位置参数）'),
  name: z.string().optional(),
  stack: z.string().optional(),
  dryRun: z.boolean().default(false),
  force: z.boolean().default(false),
  agents: z.array(AGENT_ENUM).optional(),
})
export type InitArgs = z.infer<typeof InitArgsSchema>

/** 把 argv 摊成键值对象（不做校验，交给 zod）。未知 `--flag` 直接抛错。 */
export function initArgsFromArgv(argv: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  const positional: string[] = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--dry-run') out.dryRun = true
    else if (a === '--force') out.force = true
    else if (a === '--name') out.name = argv[++i]
    else if (a === '--stack') out.stack = argv[++i]
    else if (a === '--agents') out.agents = parseAgents(argv[++i])
    else if (a.startsWith('--')) throw new Error(`未知参数: ${a}`)
    else positional.push(a)
  }
  if (positional.length) out.target = positional[0]
  return out
}

/** 解析 `--agents` 值：逗号分隔的 agent id，或 `all`。 */
export function parseAgents(value: string | undefined): AgentId[] | undefined {
  if (!value) return undefined
  const raw = value
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  if (raw.length === 0) return undefined
  if (raw.includes(ALL)) return [...AGENT_IDS]
  for (const a of raw) {
    if (!(AGENT_IDS as readonly string[]).includes(a)) throw new Error(`未知 agent: ${a}（可选 ${AGENT_IDS.join('|')} 或 all）`)
  }
  return [...new Set(raw)] as AgentId[]
}

/** 校验 argv 一次调用，返回落定的 InitArgs（含默认值）。 */
export function parseInitArgs(argv: string[]): InitArgs {
  const parsed = InitArgsSchema.safeParse(initArgsFromArgv(argv))
  if (!parsed.success) {
    const detail = parsed.error.issues
      .map((i) => `  ${i.path.join('.') || 'arg'}: ${i.message}`)
      .join('\n')
    throw new Error(`参数校验失败:\n${detail}`)
  }
  return parsed.data
}