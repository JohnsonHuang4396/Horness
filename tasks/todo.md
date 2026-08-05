# Harness 通用模板 + 初始化脚本 任务清单

## 进度
- [x] Task 1 — 模板骨架（horness/template/）
- [x] Task 2 — 实例配置机制（config schema + 生成校验）
- [x] Task 3 — 技术栈探测（registry + detect.ts）
- [x] Task 4 — harness-init 安装器（bin/harness-init.ts）
- [x] Task 5 — 端到端验证 + 文档
- [x] Task 6 — CLI 化：bin=horness + zod 校验（bin/horness.ts + src/cli.ts + config.ts 用 zod）
- [x] Task 7 — tsdown 打包单文件 + consola 美化输出（tsdown.config.ts + dist/ + bin 指向 dist/horness.mjs）
- [x] Task 8 — 多 agent 支持：Claude / Codex / OpenCode / Pi（`--agents` flag + `.agents/skills` 通用技能中心 + 每 agent 脚手架 + config 记录 `harness.agents`）

## 验收结果
- Task 1：模板无项目特有引用（react-admin-kit/wayfinder/ticket）；spring 仅存在于合法 stack 技能与 schema 描述；templates 6 个齐全；settings.json 用根相对路径（项目无关）。
- Task 2：config.schema.json + config.example.json + src/config.ts（generateConfig/validateConfig）；单测 4 个通过。
- Task 3：registry/stack.json + src/detect.ts；单测 4 个（react/maven/空目录/vue 优先级）通过。
- Task 4：bin/harness-init.ts + src/copy.ts；单测 4 个（dry-run/真实/幂等/冲突备份）通过。
- Task 5：端到端验证通过（见下）；README.md 完成。
- Task 6：`bin` 字段注册 `horness`，`horness init <target>` 直接触发；`src/cli.ts` 用 zod 校验命令行参数；`src/config.ts` 的 HarnessConfig 由 zod schema 派生、validateConfig 走 safeParse；由于 zod 4.x 无 `z.cli`，用轻量 argv 解析 + zod safeParse 组合。新增 3 个 CLI 测试，共 15 个通过。
- Task 7：tsdown 打包 `bin/horness.ts` → `dist/horness.mjs`（esm/node24，`deps.neverBundle: []` 无效、改用 `alwaysBundle: ['zod', /^consola/]` 内联全部依赖，产物 0 第三方依赖；`registry/stack.json` 改静态 JSON import 内联进 bundle；版本号用 tsdown `define` 注入 `__HORNESS_VERSION__`，源码运行时回退读 package.json；shebang 保留、自动加执行权限）。consola 美化输出（start spinner / success✓ / infoℹ / warn / error + box 下一步）。bin 字段指向 `dist/horness.mjs`。产物验证：单文件 `--version` 可用；消费者 `pnpm add` 后 `horness init` 完整拷模板/生成配置/合并 gitignore；`template/` 目录随包分发（脚手架模板无法内联进 JS）。
- Task 8：`--agents claude|codex|opencode|pi|all`（逗号分隔，默认仅 claude 向后兼容）。共享核心 `.harness/` + `.agents/skills/`（通用技能中心，codex/opencode/pi 自动读取）+ AGENTS.md/HARNESS.md；每 agent 脚手架：`.claude/`（agents/commands/settings，安装时镜像技能到 `.claude/skills`）、`.codex/`（config.toml + agents/*.toml + rules/*.rules）、`.opencode/` + 根 `opencode.json`（agent/command/plugin 证据 hook、skills.paths、permission）、`.pi/`（agents/prompts/extensions 证据 hook、skills 指向 `.agents/skills`）。config 增加 `harness.agents` 字段（schema enum + minItems 1）。备份范围扩到全部 agent 资产。新增 6 个测试（agents 解析/未知 agent/多 agent 安装/默认 claude + 技能镜像 claude），共 21 个通过。端到端：all 四套脚手架就位、pi-only 无 .claude 且技能只装 `.agents/skills`、dist 自包含（含 dist/template 四套）。

## 端到端验证（/tmp/horness-demo）
- 初始化：`--dry-run` 预览正确 → 真实安装（探测 react/ts、拷骨架、生成 config、合并 gitignore）→ 幂等重跑提示已初始化。
- 证据自检：`demo/.harness/scripts/test.sh` → PASS。
- config.json：schema_version 1、project react/ts、8 角色、22 技能、FileChanged hook 齐全。
- git status：只出现预期的 .claude/.harness/AGENTS.md/HARNESS.md/.gitignore。
- 测试：`node --test src/*.test.ts bin/*.test.ts` → 15 个全过。
- CLI：`horness --version` → `horness 1.0.0`；`horness --help` 输出用法；`horness init` 缺 target 报 zod 校验错误；`horness bogus` 报未知命令。