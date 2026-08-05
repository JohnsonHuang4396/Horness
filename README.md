# horness — Agent Harness 通用模板 CLI

把 Agent Harness 的治理纪律（P0→P10 阶段流水线、8 角色、候选制、证据账本）提炼为**项目无关、跨 agent 的模板**，用一条命令初始化到任意项目。支持 **Claude Code / Codex / OpenCode / Pi**。Node 24 原生 TS，zod 校验参数与配置，tsdown 打包成自包含可执行 CLI，consola 美化输出。

## 结构

```
horness/
  template/                 # 项目无关骨架（拷入任意项目）
    .harness/               #   agent 无关运行时：scripts + templates(阶段产物) + config
    .agents/skills/         #   通用技能中心（25 技能，codex/opencode/pi 自动读取）
    AGENTS.md / HARNESS.md  #   通用工作规范 / 使用说明（所有 agent 读取）
    gitignore.harness       #   .harness 运行时忽略规则
    .claude/                #   Claude Code 脚手架：agents(8) + commands(7) + settings.json
    .codex/                 #   Codex 脚手架：config.toml + agents/*.toml + rules/*.rules
    .opencode/              #   OpenCode 脚手架：agent(8) + command(7) + plugin(证据 hook)
    opencode.json           #   OpenCode 根配置（权限/技能/默认 agent）
    .pi/                    #   Pi 脚手架：agents(8) + prompts(7) + extensions(证据 hook)
  bin/horness.ts            # CLI 入口（tsdown 由此打包）
  tsdown.config.ts          # 打包配置（单文件、内联 zod/consola、template 拷入 dist）
  dist/                     # 打包产物（bin 指向 dist/horness.mjs，含 dist/template）
  src/
    cli.ts                  # zod 命令行参数解析
    detect.ts               # 技术栈探测
    copy.ts                 # 拷贝/备份/配置/gitignore（按 agent 生成脚手架）
    config.ts               # zod 配置 schema 与生成校验（含 agents 字段）
  registry/stack.json       # 栈→探测信号映射
  tasks/                    # 计划与任务清单
```

## 安装 / 构建

```bash
pnpm install
pnpm build                 # tsdown 打包到 dist/horness.mjs（自包含，含 zod/consola/registry/template）
pnpm setup                 # 首次：配置 PNPM_HOME（写入 shell，重启终端生效）
pnpm link --global         # 全局注册 `horness` 命令（或 npm link）
```

> 本地开发：`pnpm link --global` 后，任何目录直接 `horness <cmd>` 即可；`pnpm build` 后全局命令即反映最新版本（bin 指向 `dist/horness.mjs`）。

## 用法

```bash
# 初始化（target 可省略，默认当前目录；默认仅 Claude Code，向后兼容）
horness init --name MyApp
horness init /path/to/project --name MyApp

# 指定 agent：claude / codex / opencode / pi，逗号分隔或 all
horness init --name MyApp --agents all
horness init /path/to/project --name MyApp --agents codex,pi

# 预览（不写入）/ 指定技术栈 / 强制覆盖
horness init --name MyApp --dry-run
horness init --name MyApp --stack java-spring
horness init /path/to/project --name MyApp --force

# 帮助 / 版本
horness --help
horness --version
```

初始化后：重启对应 Agent 会话，运行各 agent 的接入自检命令（Claude `/harness-check`、OpenCode `/harness-check`、Pi `/harness-check`；Codex 无自定义命令，用 AGENTS.md 规则 + 技能驱动）。

## 跨 agent 设计

| 能力      | Claude Code              | Codex                  | OpenCode                 | Pi                     |
| --------- | ------------------------ | ---------------------- | ------------------------ | ---------------------- |
| 配置      | `.claude/settings.json`  | `.codex/config.toml`   | `opencode.json`          | `.pi/settings.json`    |
| 角色(8)   | `.claude/agents/*.md`    | `.codex/agents/*.toml` | `.opencode/agent/*.md`   | `.pi/agents/*.md`      |
| 命令(7)   | `.claude/commands/*.md`  | 无（用技能/AGENTS）    | `.opencode/command/*.md` | `.pi/prompts/*.md`     |
| 技能      | `.claude/skills`（镜像） | `.agents/skills`       | `.agents/skills`         | `.agents/skills`       |
| 证据 hook | settings.json hook       | config.toml hooks      | plugin/evidence.ts       | extensions/evidence.ts |
| 权限      | settings.json            | config + rules         | permission 键            | 扩展拦截               |

- **共享核心**：`.harness/` 运行时、`AGENTS.md` 规则、`.agents/skills/` 技能中心——所有 agent 消费同一份，零重复。
- **技能单一来源**：`.agents/skills/`（codex/opencode/pi 自动读取）；仅 Claude 需 `.claude/skills`，安装时镜像。
- **角色/命令/配置逐 agent 生成**：同一治理语义按各 agent 语法出稿（TOML vs MD frontmatter vs TS hook）。

## 安装器行为

- **探测**：从锁文件/构建描述识别 stack/packageManager/lang（`registry/stack.json`），不猜目录名。
- **安全**：目标已有任何资产（`.claude/.codex/.opencode/.pi/.harness/…`）时先备份到 `.harness.backup-<ts>/`，绝不覆盖用户文件。
- **幂等**：已初始化（有 config.json）时提示跳过，需 `--force` 覆盖。
- **配置**：生成 `.harness/config.json`（项目名/技术栈/Assurance/角色/技能/agent 清单/hook），schema 见 `config.schema.json`。
- **gitignore**：把 `.harness` 运行时忽略规则合并进目标 `.gitignore`（不重复）。

## 配置

`.harness/config.json`（zod 校验）由 init 生成，`harness.agents` 记录已生成脚手架的 agent 清单。schema 见 `template/.harness/config.schema.json`。

## 测试

```bash
node --test src/*.test.ts bin/*.test.ts
```

覆盖：config 生成/校验（zod，含 agents）、CLI 参数解析（含 `--agents`）、技术栈探测（react/maven/空目录/vue 优先级）、安装（dry-run/真实/幂等/冲突备份/多 agent 组合/技能镜像）。

## 打包产物验证

`pnpm build` 后 `dist/horness.mjs` 是**单个可执行 JS**（zod/consola/registry/版本号已内联），`bin` 字段指向它；`template/`（含全部 agent 脚手架）随 `dist/template` 分发，自包含。

评审标准：

- `./dist/horness.mjs --version` → 输出版本（单文件即可，不依赖 node_modules）
- 消费者项目 `pnpm add <horness>` 后 `horness init <target> --agents all` 正常拷入四套 agent 脚手架、镜像技能、生成配置、合并 gitignore
- `node --test src/*.test.ts bin/*.test.ts` 全过；`tsc --noEmit` 无错

## 注意事项（脚手架校验）

- OpenCode 是**独立 CLI**（npm 包名 `opencode-ai`，也支持 curl 安装），不是本项目依赖；horness 只生成它的配置脚手架（`.opencode/` + `opencode.json`），要跑 OpenCode 需单独装 CLI。
- codex 的 `rules/*.rules`（Starlark 执行策略）与 opencode/pi 的 TS hook 是按当前文档约定的**参考实现**；各 agent 版本 API 可能演进，接入时以目标版本为准微调（详见各文件内注释）。
- Codex 无自定义 slash 命令，阶段流水线由 AGENTS.md 规则 + 技能 + 角色驱动。
