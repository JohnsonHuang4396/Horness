import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { initArgsFromArgv, parseAgents, parseInitArgs } from '../src/cli.ts'
import { validateConfig } from '../src/config.ts'
import { install } from '../src/copy.ts'

function tmpProject(): string {
  return mkdtempSync(join(tmpdir(), 'horness-init-'))
}

test('dry-run 不写入，但列出动作', () => {
  const dir = tmpProject()
  try {
    const r = install(dir, { name: 'demo', dryRun: true })
    assert.equal(r.dryRun, true)
    assert.ok(r.actions.length >= 4, '应列出拷贝/配置/gitignore 动作')
    assert.equal(existsSync(join(dir, '.claude')), false, 'dry-run 不写文件')
    assert.equal(existsSync(join(dir, '.harness', 'config.json')), false)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('真实安装：骨架就位 + config 合法 + gitignore 生成', () => {
  const dir = tmpProject()
  try {
    const r = install(dir, { name: 'demo' })
    assert.equal(existsSync(join(dir, '.claude', 'agents', 'controller.md')), true)
    assert.equal(existsSync(join(dir, '.claude', 'settings.json')), true)
    assert.equal(existsSync(join(dir, '.harness', 'scripts', 'evidence.sh')), true)
    assert.equal(existsSync(join(dir, '.harness', 'templates', 'intake.md')), true)
    assert.equal(existsSync(join(dir, 'AGENTS.md')), true)
    assert.equal(existsSync(join(dir, 'HARNESS.md')), true)
    assert.equal(existsSync(join(dir, '.gitignore')), true)

    const cfg = JSON.parse(readFileSync(join(dir, '.harness', 'config.json'), 'utf8'))
    assert.equal(cfg.project.name, 'demo')
    assert.equal(validateConfig(cfg).ok, true)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('幂等：重复安装提示已初始化', () => {
  const dir = tmpProject()
  try {
    install(dir, { name: 'demo' })
    const r2 = install(dir, { name: 'demo' })
    assert.ok(r2.skipReason, '应提示已初始化')
    assert.ok(r2.skipReason.includes('已初始化'))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('冲突备份：已有 .claude 时备份而不覆盖', () => {
  const dir = tmpProject()
  try {
    mkdirSync(join(dir, '.claude'), { recursive: true })
    writeFileSync(join(dir, '.claude', 'user-file.md'), 'mine')
    const r = install(dir, { name: 'demo' })
    assert.ok(r.backup, '应有备份目录')
    assert.ok(r.backup!.includes('.harness.backup-'))
    // 用户文件被备份，未被覆盖
    assert.equal(existsSync(join(dir, '.claude', 'user-file.md')), false, '原位置被移动')
    assert.equal(existsSync(join(r.backup!, '.claude', 'user-file.md')), true, '备份里有用户文件')
    // 模板已安装
    assert.equal(existsSync(join(dir, '.claude', 'agents', 'controller.md')), true)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('CLI：解析 init 参数（位置参数 + 选项 + 默认值）', () => {
  const a = parseInitArgs(['/tmp/x', '--name', 'myapp', '--stack', 'react', '--dry-run'])
  assert.equal(a.target, '/tmp/x')
  assert.equal(a.name, 'myapp')
  assert.equal(a.stack, 'react')
  assert.equal(a.dryRun, true)
  assert.equal(a.force, false)
})

test('CLI：缺 target 默认当前目录', () => {
  assert.equal(parseInitArgs(['--dry-run']).target, '.')
  assert.equal(parseInitArgs([]).target, '.')
})

test('CLI：未知 --flag 抛错', () => {
  assert.throws(() => initArgsFromArgv(['/tmp/x', '--bogus']), /未知参数/)
})

test('CLI：解析 --agents 清单与 all', () => {
  const a = parseInitArgs(['/tmp/x', '--agents', 'codex,pi'])
  assert.deepEqual(a.agents, ['codex', 'pi'])
  assert.deepEqual(parseAgents('all'), ['claude', 'codex', 'opencode', 'pi'])
  assert.equal(parseInitArgs(['/tmp/x']).agents, undefined, '默认不入 agents，由 install 回退 claude')
})

test('CLI：未知 agent 抛错', () => {
  assert.throws(() => parseAgents('foo'), /未知 agent/)
})

test('安装多 agent：各脚手架就位 + 技能中心 + claude 镜像', () => {
  const dir = tmpProject()
  try {
    const r = install(dir, { name: 'demo', agents: ['codex', 'opencode', 'pi'] })
    assert.equal(existsSync(join(dir, '.codex', 'config.toml')), true, 'codex 配置')
    assert.equal(existsSync(join(dir, 'opencode.json')), true, 'opencode 根配置')
    assert.equal(existsSync(join(dir, '.pi', 'settings.json')), true, 'pi 配置')
    // 技能通用中心始终安装（codex/opencode/pi 自动读取）
    assert.equal(existsSync(join(dir, '.agents', 'skills')), true, '通用技能中心')
    // 不选 claude 时不生成 .claude/skills 镜像
    assert.equal(existsSync(join(dir, '.claude')), false, '未选 claude 无 .claude')
    const cfg = JSON.parse(readFileSync(join(dir, '.harness', 'config.json'), 'utf8'))
    assert.deepEqual(cfg.harness.agents, ['codex', 'opencode', 'pi'])
    assert.ok(!r.actions.some((x) => x.includes('镜像技能')), '未选 claude 不应有 claude 镜像动作')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('默认仅安装 claude（向后兼容）+ 技能镜像到 .claude/skills', () => {
  const dir = tmpProject()
  try {
    const r = install(dir, { name: 'demo' })
    assert.equal(existsSync(join(dir, '.claude', 'settings.json')), true)
    assert.equal(existsSync(join(dir, '.claude', 'skills', 'api-contract-design', 'SKILL.md')), true, 'claude 技能镜像')
    assert.equal(existsSync(join(dir, '.codex')), false)
    assert.equal(existsSync(join(dir, '.pi')), false)
    assert.ok(r.actions.some((x) => x.includes('镜像技能')))
    const cfg = JSON.parse(readFileSync(join(dir, '.harness', 'config.json'), 'utf8'))
    assert.deepEqual(cfg.harness.agents, ['claude'])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
