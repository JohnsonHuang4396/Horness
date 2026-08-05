import { describe, expect, it } from 'vitest'
import { generateConfig, REQUIRED_SKILLS, validateConfig } from '../src/config.ts'

describe('config 生成与校验', () => {
  it('generateConfig 产出合法配置', () => {
    const cfg = generateConfig({ name: 'MyApp', stack: 'react', packageManager: 'pnpm' })
    expect(cfg.schema_version).toBe(1)
    expect(cfg.project.name).toBe('MyApp')
    expect(cfg.project.stack).toBe('react')
    expect(cfg.harness.assuranceDefault).toBe('standard')
    expect(cfg.harness.installedSkills).toEqual([...REQUIRED_SKILLS])
    expect(cfg.harness.hooks.FileChanged).toBe('.harness/scripts/hook-file-change.sh')
    expect(validateConfig(cfg).ok).toBe(true)
  })

  it('validateConfig 拒绝缺 project', () => {
    const r = validateConfig({ schema_version: 1, harness: {} })
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => e.includes('project'))).toBe(true)
  })

  it('validateConfig 拒绝非法 assuranceDefault', () => {
    const cfg = generateConfig({ name: 'X' })
    ;(cfg.harness as { assuranceDefault: string }).assuranceDefault = 'bogus'
    const r = validateConfig(cfg)
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => e.includes('assuranceDefault'))).toBe(true)
  })

  it('validateConfig 拒绝非对象', () => {
    expect(validateConfig(null).ok).toBe(false)
    expect(validateConfig('x').ok).toBe(false)
  })

  it('generateConfig 默认 agents 为 claude', () => {
    const cfg = generateConfig({ name: 'X' })
    expect(cfg.harness.agents).toEqual(['claude'])
    expect(validateConfig(cfg).ok).toBe(true)
  })

  it('generateConfig 支持多 agent 清单', () => {
    const cfg = generateConfig({ name: 'X', agents: ['codex', 'opencode', 'pi'] })
    expect(cfg.harness.agents).toEqual(['codex', 'opencode', 'pi'])
    expect(validateConfig(cfg).ok).toBe(true)
  })

  it('generateConfig 记录 monorepo 工作区清单', () => {
    const cfg = generateConfig({
      name: 'Monorepo',
      stack: 'monorepo',
      packageManager: 'pnpm',
      workspaces: [
        { rel: 'backend', stack: 'java-spring', lang: 'java', packageManager: 'maven' },
        { rel: 'frontend', stack: 'vue', lang: 'ts', packageManager: 'pnpm' },
      ],
    })
    expect(cfg.project.stack).toBe('monorepo')
    expect(cfg.project.workspaces).toHaveLength(2)
    expect(cfg.project.workspaces![1]).toMatchObject({ rel: 'frontend', stack: 'vue' })
    expect(validateConfig(cfg).ok).toBe(true)
  })
})
