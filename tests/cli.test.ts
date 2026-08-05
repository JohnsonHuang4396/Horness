import { describe, expect, it } from 'vitest'
import { initArgsFromArgv, parseAgents, parseInitArgs } from '../src/cli.ts'

describe('CLI init 参数解析', () => {
  it('解析 init 位置参数 + 选项 + 默认值', () => {
    const a = parseInitArgs(['/tmp/x', '--name', 'myapp', '--stack', 'react', '--dry-run'])
    expect(a.target).toBe('/tmp/x')
    expect(a.name).toBe('myapp')
    expect(a.stack).toBe('react')
    expect(a.dryRun).toBe(true)
    expect(a.force).toBe(false)
  })

  it('缺 target 默认当前目录', () => {
    expect(parseInitArgs(['--dry-run']).target).toBe('.')
    expect(parseInitArgs([]).target).toBe('.')
  })

  it('未知 --flag 抛错', () => {
    expect(() => initArgsFromArgv(['/tmp/x', '--bogus'])).toThrow(/未知参数/)
  })

  it('解析 --agents 清单与 all', () => {
    const a = parseInitArgs(['/tmp/x', '--agents', 'codex,pi'])
    expect(a.agents).toEqual(['codex', 'pi'])
    expect(parseAgents('all')).toEqual(['claude', 'codex', 'opencode', 'pi'])
    expect(parseInitArgs(['/tmp/x']).agents).toBeUndefined()
  })

  it('未知 agent 抛错', () => {
    expect(() => parseAgents('foo')).toThrow(/未知 agent/)
  })

  it('--agents 去重', () => {
    expect(parseAgents('claude,claude,codex')).toEqual(['claude', 'codex'])
  })
})
