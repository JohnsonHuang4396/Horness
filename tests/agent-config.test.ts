import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { install } from '../src/copy.ts'

function tmp(p: string): string {
  return mkdtempSync(join(tmpdir(), `horness-${p}-`))
}

// codex 内置权限 profile（default_permissions 引用时须为其中之一；见 codex 源码 permissions.rs）。
// 历史 bug：模板曾写成 `:workspace-write`，新版 codex 报
// "default_permissions refers to unknown built-in profile"，导致 agent 无法启动。
const CODEX_BUILTIN_PROFILES = new Set([':workspace', ':read-only'])

function codexDefaultProfiles(toml: string): string[] {
  const out: string[] = []
  for (const line of toml.split('\n')) {
    const m = line.match(/^\s*default_permissions\s*=\s*"([^"]+)"/)
    if (m) out.push(m[1])
  }
  return out
}

describe('各 agent 配置体检（harness-doctor 配置层）', () => {
  it('codex：default_permissions 只引用内置 profile，且不含非法名 :workspace-write', () => {
    const dir = tmp('agents')
    try {
      install(dir, { name: 'demo', agents: ['claude', 'codex', 'opencode', 'pi'] })
      const codex = readFileSync(join(dir, '.codex', 'config.toml'), 'utf8')
      for (const p of codexDefaultProfiles(codex)) {
        expect(CODEX_BUILTIN_PROFILES.has(p), `codex default_permissions=${p} 非内置 profile`).toBe(true)
      }
      expect(codex).not.toMatch(/default_permissions\s*=\s*":workspace-write"/)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('opencode / pi / claude：生成配置 JSON 可解析且关键结构就位', () => {
    const dir = tmp('agents')
    try {
      install(dir, { name: 'demo', agents: ['claude', 'codex', 'opencode', 'pi'] })

      const opencode = JSON.parse(readFileSync(join(dir, 'opencode.json'), 'utf8'))
      expect(opencode.permission).toBeDefined()
      expect(opencode.skills.paths).toContain('.agents/skills')

      const pi = JSON.parse(readFileSync(join(dir, '.pi', 'settings.json'), 'utf8'))
      expect(Array.isArray(pi.skills)).toBe(true)
      expect(pi.defaultProjectTrust).toBe(true)

      const claude = JSON.parse(readFileSync(join(dir, '.claude', 'settings.json'), 'utf8'))
      expect(claude.hooks.FileChanged).toBeDefined()
      expect(Array.isArray(claude.permissions.allow)).toBe(true)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})