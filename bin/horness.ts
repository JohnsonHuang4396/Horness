#!/usr/bin/env node
// horness：把 Harness 通用模板初始化到目标项目。
// 用法: horness init <target> [--name <name>] [--stack <stack>] [--dry-run] [--force]
import { consola } from 'consola'
import { box, colors } from 'consola/utils'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { parseInitArgs } from '../src/cli.ts'
import { install } from '../src/copy.ts'

const USAGE = `用法: horness init <target> [--name <name>] [--stack <stack>] [--agents <claude|codex|opencode|pi|all>] [--dry-run] [--force]`

// 打包时由 tsdown 的 define 注入；源码运行时 typeof 为 undefined，回退读 package.json。
declare const __HORNESS_VERSION__: string | undefined

function version(): string {
  const v =
    typeof __HORNESS_VERSION__ === 'string'
      ? __HORNESS_VERSION__
      : JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version
  return `horness ${v}`
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
    console.log(USAGE)
    return
  }
  if (argv[0] === '--version' || argv[0] === '-v') {
    console.log(version())
    return
  }

  const cmd = argv.shift()
  if (cmd !== 'init') {
    consola.error(`未知命令: ${cmd}`)
    console.log(USAGE)
    process.exit(2)
  }

  let args
  try {
    args = parseInitArgs(argv)
  } catch (e) {
    consola.error((e as Error).message)
    console.log(USAGE)
    process.exit(2)
  }

  const target = resolve(args.target)
  if (!existsSync(target) || !statSync(target).isDirectory()) {
    consola.error(`目标不存在或不是目录: ${target}`)
    process.exit(1)
  }
  const name = args.name ?? basename(target)

  consola.start(args.dryRun ? '预览初始化（dry-run，不写入）…' : `初始化 ${colors.bold(name)} …`)
  let report
  try {
    report = install(target, { name, stack: args.stack, dryRun: args.dryRun, force: args.force, agents: args.agents })
  } catch (e) {
    consola.error((e as Error).message)
    process.exit(2)
  }
  consola.success(args.dryRun ? '预览完成（未写入文件）' : '初始化完成')

  // 探测结果
  consola.info(`技术栈: ${colors.cyan(report.detected.stack)} / ${colors.cyan(report.detected.lang)}`)
  if (report.detected.isMonorepo && report.detected.workspaces.length) {
    for (const w of report.detected.workspaces) {
      consola.log(`  ${colors.dim(`  ${w.rel}: ${w.stack} / ${w.lang} / ${w.packageManager}`)}`)
    }
  }
  if (report.detected.evidence.length) {
    consola.log(`  ${colors.dim('证据: ' + report.detected.evidence.join(', '))}`)
  }

  if (report.skipReason) {
    consola.warn(report.skipReason)
    return
  }

  // 逐动作
  for (const act of report.actions) consola.success(act)
  if (report.backup) consola.log(`  ${colors.dim('备份: ' + report.backup)}`)

  if (!args.dryRun) {
    consola.log(
      box(`重启 Agent 会话，运行 ${colors.cyan('/harness-check')} 验证接入。`, {
        title: '下一步',
        style: { borderColor: 'cyan', borderStyle: 'rounded', padding: 1 },
      }),
    )
  }
}

try {
  main()
} catch (e) {
  consola.error((e as Error).message)
  process.exit(2)
}
