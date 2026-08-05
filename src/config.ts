// 实例配置：生成与校验 `.harness/config.json`。
// 用 zod 定义 schema 并派生类型，validateConfig 走 zod.safeParse。

import { z } from 'zod'

export const AGENT_IDS = ['claude', 'codex', 'opencode', 'pi'] as const
export type AgentId = (typeof AGENT_IDS)[number]

export const HarnessConfigSchema = z.object({
  schema_version: z.literal(1),
  project: z.object({
    name: z.string().min(1),
    lang: z.string().min(1),
    stack: z.string().min(1),
    packageManager: z.string().min(1),
    testEntry: z.string().nullable(),
    buildCommand: z.string().nullable(),
  }),
  harness: z.object({
    assuranceDefault: z.enum(['fast', 'standard', 'high-assurance']),
    artifactLang: z.string().min(1),
    rolesEnabled: z.array(z.string()).min(1),
    installedSkills: z.array(z.string()),
    agents: z.array(z.enum(AGENT_IDS)).min(1),
    hooks: z.record(z.string(), z.string()),
  }),
})

export type HarnessConfig = z.infer<typeof HarnessConfigSchema>
export type AssuranceMode = HarnessConfig['harness']['assuranceDefault']

/** 模板默认启用的通用（core）技能。 */
export const REQUIRED_SKILLS = [
  'api-contract-design',
  'change-management',
  'code-review',
  'controlled-evolution',
  'eval-authoring',
  'harness-doctor',
  'impact-analysis',
  'implementation',
  'migration-refactor',
  'project-discovery',
  'project-rule-authoring',
  'release-readiness',
  'requirement-analysis',
  'requirement-preprocessing',
  'risk-assessment',
  'security-review',
  'self-evolution',
  'solution-design',
  'systematic-debugging',
  'task-planning',
  'test-strategy',
  'verification',
] as const

export const DEFAULT_ROLES = [
  'controller',
  'requirement-analyst',
  'design-architect',
  'developer',
  'quality-reviewer',
  'security-reviewer',
  'release-reviewer',
  'database-reviewer',
] as const

export interface GenerateOpts {
  name: string
  lang?: string
  stack?: string
  packageManager?: string
  testEntry?: string | null
  buildCommand?: string | null
  assuranceDefault?: AssuranceMode
  artifactLang?: string
  installedSkills?: string[]
  agents?: AgentId[]
}

export function generateConfig(opts: GenerateOpts): HarnessConfig {
  return {
    schema_version: 1,
    project: {
      name: opts.name,
      lang: opts.lang ?? 'unknown',
      stack: opts.stack ?? 'unknown',
      packageManager: opts.packageManager ?? 'unknown',
      testEntry: opts.testEntry ?? null,
      buildCommand: opts.buildCommand ?? null,
    },
    harness: {
      assuranceDefault: opts.assuranceDefault ?? 'standard',
      artifactLang: opts.artifactLang ?? 'zh',
      rolesEnabled: [...DEFAULT_ROLES],
      installedSkills: opts.installedSkills ?? [...REQUIRED_SKILLS],
      agents: opts.agents ?? ['claude'],
      hooks: { FileChanged: '.harness/scripts/hook-file-change.sh' },
    },
  }
}

export interface ValidateResult {
  ok: boolean
  errors: string[]
}

/** zod 校验 `.harness/config.json`。 */
export function validateConfig(c: unknown): ValidateResult {
  const r = HarnessConfigSchema.safeParse(c)
  if (r.success) return { ok: true, errors: [] }
  return {
    ok: false,
    errors: r.error.issues.map((i) => `${i.path.join('.') || 'config'}: ${i.message}`),
  }
}