import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const ENTRY = new URL('../bin/horness.ts', import.meta.url).pathname

/** 合并 stdout+stderr（consola 写 stderr）。子进程剥离 vitest 测试环境变量并设 NODE_ENV=production，避免 consola 静默。 */
function run(args: string[]): { stdout: string; status: number } {
  const env: NodeJS.ProcessEnv = {}
  for (const [k, v] of Object.entries(process.env)) {
    if (k.startsWith('VITEST')) continue
    env[k] = v
  }
  env.NODE_ENV = 'production'
  const r = spawnSync(process.execPath, [ENTRY, ...args], { encoding: 'utf8', env })
  return { stdout: `${r.stdout ?? ''}${r.stderr ?? ''}`, status: r.status ?? -1 }
}

describe('CLI 端到端', () => {
  it('--version 输出版本', () => {
    const { stdout } = run(['--version'])
    expect(stdout.trim()).toMatch(/^horness \d+\.\d+\.\d+$/)
  })

  it('--help / 无参 打印用法', () => {
    expect(run(['--help']).stdout).toContain('用法: horness init')
    expect(run([]).stdout).toContain('用法: horness init')
  })

  it('未知命令报错退出码 2', () => {
    const r = run(['frobnicate'])
    expect(r.status).toBe(2)
    expect(r.stdout).toContain('未知命令')
  })

  it('未知 flag 报错退出码 2', () => {
    const r = run(['init', '--bogus'])
    expect(r.status).toBe(2)
    expect(r.stdout).toContain('未知参数')
  })

  it('目标不存在报错退出码 1', () => {
    const r = run(['init', '/no/such/dir/horness-e2e'])
    expect(r.status).toBe(1)
    expect(r.stdout).toContain('目标不存在')
  })

  it('init 真实安装：生成骨架+config+gitignore', () => {
    const dir = mkdtempSync(join(tmpdir(), 'horness-e2e-'))
    try {
      const r = run(['init', dir, '--name', 'E2E', '--agents', 'all'])
      expect(r.status).toBe(0)
      expect(existsSync(join(dir, '.harness', 'config.json'))).toBe(true)
      expect(existsSync(join(dir, '.claude'))).toBe(true)
      expect(existsSync(join(dir, '.codex'))).toBe(true)
      expect(existsSync(join(dir, 'opencode.json'))).toBe(true)
      expect(existsSync(join(dir, '.pi'))).toBe(true)
      // config 记录了全部四个 agent
      const cfg = JSON.parse(readFileSync(join(dir, '.harness', 'config.json'), 'utf8'))
      expect(cfg.project.name).toBe('E2E')
      expect(cfg.harness.agents).toEqual(['claude', 'codex', 'opencode', 'pi'])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('init dry-run 不写文件', () => {
    const dir = mkdtempSync(join(tmpdir(), 'horness-e2e-'))
    try {
      const r = run(['init', dir, '--name', 'E2E', '--dry-run'])
      expect(r.status).toBe(0)
      expect(existsSync(join(dir, '.harness'))).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('init monorepo：config 记录 stack=monorepo 与各工作区', () => {
    const dir = mkdtempSync(join(tmpdir(), 'horness-e2e-'))
    try {
      writeFileSync(join(dir, 'pnpm-workspace.yaml'), 'packages:\n  - "backend/*"\n  - "frontend/*"\n')
      const mk = (p: string, c: string) => {
        mkdirSync(join(dir, p.split('/').slice(0, -1).join('/')), { recursive: true })
        writeFileSync(join(dir, p), c)
      }
      mk('backend/pom.xml', '<project><deps>spring-boot-starter</deps></project>')
      mk('frontend/package.json', '{"dependencies":{"vue":"^3"}}')
      mk('frontend2/package.json', '{"dependencies":{"react":"^18"}}')

      const r = run(['init', dir, '--name', 'Mono', '--agents', 'claude'])
      expect(r.status).toBe(0)
      const cfg = JSON.parse(readFileSync(join(dir, '.harness', 'config.json'), 'utf8'))
      expect(cfg.project.stack).toBe('monorepo')
      expect(cfg.project.packageManager).toBe('pnpm')
      const rels = cfg.project.workspaces.map((w: { rel: string }) => w.rel)
      expect(rels).toEqual(expect.arrayContaining(['backend', 'frontend', 'frontend2']))
      const backend = cfg.project.workspaces.find((w: { rel: string }) => w.rel === 'backend')
      expect(backend).toMatchObject({ stack: 'java-spring', lang: 'java', packageManager: 'maven' })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
