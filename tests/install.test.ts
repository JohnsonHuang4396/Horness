import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { validateConfig } from '../src/config.ts'
import { install } from '../src/copy.ts'

function tmpProject(): string {
  return mkdtempSync(join(tmpdir(), 'horness-init-'))
}
function readCfg(dir: string) {
  return JSON.parse(readFileSync(join(dir, '.harness', 'config.json'), 'utf8'))
}

describe('install 安装流程', () => {
  it('dry-run 不写入，但列出动作', () => {
    const dir = tmpProject()
    try {
      const r = install(dir, { name: 'demo', dryRun: true })
      expect(r.dryRun).toBe(true)
      expect(r.actions.length).toBeGreaterThanOrEqual(4)
      expect(existsSync(join(dir, '.claude'))).toBe(false)
      expect(existsSync(join(dir, '.harness', 'config.json'))).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('真实安装：骨架就位 + config 合法 + gitignore 生成', () => {
    const dir = tmpProject()
    try {
      const r = install(dir, { name: 'demo' })
      expect(existsSync(join(dir, '.claude', 'agents', 'controller.md'))).toBe(true)
      expect(existsSync(join(dir, '.claude', 'settings.json'))).toBe(true)
      expect(existsSync(join(dir, '.harness', 'scripts', 'evidence.sh'))).toBe(true)
      expect(existsSync(join(dir, '.harness', 'templates', 'intake.md'))).toBe(true)
      expect(existsSync(join(dir, 'AGENTS.md'))).toBe(true)
      expect(existsSync(join(dir, 'HARNESS.md'))).toBe(true)
      expect(existsSync(join(dir, '.gitignore'))).toBe(true)

      const cfg = readCfg(dir)
      expect(cfg.project.name).toBe('demo')
      expect(validateConfig(cfg).ok).toBe(true)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('幂等：重复安装提示已初始化', () => {
    const dir = tmpProject()
    try {
      install(dir, { name: 'demo' })
      const r2 = install(dir, { name: 'demo' })
      expect(r2.skipReason).toBeTruthy()
      expect(r2.skipReason).toContain('已初始化')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('冲突备份：已有 .claude 时备份而不覆盖', () => {
    const dir = tmpProject()
    try {
      mkdirSync(join(dir, '.claude'), { recursive: true })
      writeFileSync(join(dir, '.claude', 'user-file.md'), 'mine')
      const r = install(dir, { name: 'demo' })
      expect(r.backup).toBeTruthy()
      expect(r.backup).toContain('.harness.backup-')
      expect(existsSync(join(dir, '.claude', 'user-file.md'))).toBe(false)
      expect(existsSync(join(r.backup!, '.claude', 'user-file.md'))).toBe(true)
      expect(existsSync(join(dir, '.claude', 'agents', 'controller.md'))).toBe(true)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('安装多 agent：各脚手架就位 + 技能中心 + claude 镜像', () => {
    const dir = tmpProject()
    try {
      const r = install(dir, { name: 'demo', agents: ['codex', 'opencode', 'pi'] })
      expect(existsSync(join(dir, '.codex', 'config.toml'))).toBe(true)
      expect(existsSync(join(dir, 'opencode.json'))).toBe(true)
      expect(existsSync(join(dir, '.pi', 'settings.json'))).toBe(true)
      expect(existsSync(join(dir, '.agents', 'skills'))).toBe(true)
      expect(existsSync(join(dir, '.claude'))).toBe(false)
      const cfg = readCfg(dir)
      expect(cfg.harness.agents).toEqual(['codex', 'opencode', 'pi'])
      expect(r.actions.some(x => x.includes('镜像技能'))).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('默认仅安装 claude（向后兼容）+ 技能镜像到 .claude/skills', () => {
    const dir = tmpProject()
    try {
      const r = install(dir, { name: 'demo' })
      expect(existsSync(join(dir, '.claude', 'settings.json'))).toBe(true)
      expect(existsSync(join(dir, '.claude', 'skills', 'api-contract-design', 'SKILL.md'))).toBe(true)
      expect(existsSync(join(dir, '.codex'))).toBe(false)
      expect(existsSync(join(dir, '.pi'))).toBe(false)
      expect(r.actions.some(x => x.includes('镜像技能'))).toBe(true)
      const cfg = readCfg(dir)
      expect(cfg.harness.agents).toEqual(['claude'])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
