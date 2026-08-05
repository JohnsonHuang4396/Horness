# horness

> 一条命令，把 Agent Harness 的治理纪律装进你的项目。

<a href="https://www.npmjs.com/package/@johnsonhuang4396/horness"><img src="https://img.shields.io/npm/v/@johnsonhuang4396/horness.svg" alt="npm version"></a>
<a href="https://www.npmjs.com/package/@johnsonhuang4396/horness"><img src="https://img.shields.io/npm/dm/@johnsonhuang4396/horness.svg" alt="npm downloads"></a>

<p align="center"><strong>中文</strong> · <a href="README.en.md">English</a></p>

horness 把 Agent Harness 的治理纪律——**P0→P10 阶段流水线、8 角色、候选制、证据账本**——提炼成一套**项目无关、跨 agent** 的模板，用一条命令初始化到任意项目。同一条治理规范同时驱动 **Claude Code / Codex / OpenCode / Pi** 四种 agent，零重复维护。

## 特性

- **一条命令接入**：`horness init` 自动探测技术栈，生成完整的治理脚手架。
- **四 agent 同构**：同一治理语义为 Claude Code / Codex / OpenCode / Pi 各生成对应语法的配置与角色。
- **单一技能来源**：`.agents/skills/` 技能中心一份，所有 agent 共享；Claude 自动镜像。
- **证据账本**：每次文件编辑 / 工具调用自动写入证据链，阶段产物留痕可审计。
- **安全幂等**：遇到已有配置先备份到 `.harness.backup-<ts>/`，绝不覆盖用户文件；重复安装自动跳过。
- **自包含 CLI**：Node 24 原生 TS，zod 校验参数与配置，tsdown 打包成单文件可执行，零运行时依赖。

## 安装

```bash
pnpm add -D @johnsonhuang4396/horness
# 或全局安装
pnpm add -g @johnsonhuang4396/horness
```

> 需要 Node.js ≥ 24。

## 快速上手

在项目根目录运行：

```bash
horness init --name MyApp
```

然后重启你的 Agent 会话，运行接入自检（Claude / OpenCode / Pi 均可执行 `/harness-check`；Codex 由 AGENTS.md 规则 + 技能驱动）。

## 用法

### `horness init` — 初始化治理脚手架

```bash
# 当前目录（默认）初始化
horness init --name MyApp

# 指定目标目录
horness init /path/to/project --name MyApp

# 指定 agent：claude / codex / opencode / pi，逗号分隔
horness init --name MyApp --agents codex,pi

# 一步接入全部四种 agent
horness init --name MyApp --agents all

# 只预览会执行的动作，不写入
horness init --name MyApp --dry-run

# 强制重新初始化（覆盖已有配置）
horness init /path/to/project --name MyApp --force
```

| 选项        | 说明                                              | 默认               |
| ----------- | ------------------------------------------------- | ------------------ |
| `[target]`  | 目标项目目录（第一个位置参数）                    | 当前目录 `.`       |
| `--name`    | 项目名                                            | 自动从目标目录推断 |
| `--stack`   | 技术栈（如 `react`、`java-spring`），跳过自动探测 | 自动探测           |
| `--agents`  | 要生成的 agent 脚手架，逗号分隔或 `all`           | `claude`           |
| `--dry-run` | 只列出将执行的动作，不写入                        | `false`            |
| `--force`   | 已初始化时强制覆盖                                | `false`            |

### 其他命令

```bash
horness --help       # 查看用法
horness --version    # 查看版本
```

## 初始化生成什么

在目标项目里生成一套 agent 无关的共享核心 + 各 agent 脚手架：

```
.harness/                 # agent 无关运行时：scripts + templates（阶段产物）+ config
.agents/skills/           # 通用技能中心（codex/opencode/pi 自动读取）
AGENTS.md                 # 通用工作规范（所有 agent 读取）
HARNESS.md                # 治理使用说明
gitignore 规则            # .harness 运行时忽略规则（合并进目标 .gitignore）
.claude/                  # Claude Code：agents(8) + commands(7) + settings.json + skills 镜像
.codex/                   # Codex：config.toml + agents/*.toml + rules/*.rules
.opencode/                # OpenCode：agent(8) + command(7) + plugin（证据 hook）+ opencode.json
.pi/                      # Pi：agents(8) + prompts(7) + extensions（证据 hook）
```

## 跨 agent 支持

| 能力      | Claude Code              | Codex                  | OpenCode                 | Pi                     |
| --------- | ------------------------ | ---------------------- | ------------------------ | ---------------------- |
| 配置      | `.claude/settings.json`  | `.codex/config.toml`   | `opencode.json`          | `.pi/settings.json`    |
| 角色(8)   | `.claude/agents/*.md`    | `.codex/agents/*.toml` | `.opencode/agent/*.md`   | `.pi/agents/*.md`      |
| 命令(7)   | `.claude/commands/*.md`  | 无（用技能/AGENTS）    | `.opencode/command/*.md` | `.pi/prompts/*.md`     |
| 技能      | `.claude/skills`（镜像） | `.agents/skills`       | `.agents/skills`         | `.agents/skills`       |
| 证据 hook | settings.json hook       | config.toml hooks      | plugin/evidence.ts       | extensions/evidence.ts |

- **共享核心**：`.harness/` 运行时、`AGENTS.md` 规则、`.agents/skills/` 技能中心——所有 agent 消费同一份，零重复。
- **技能单一来源**：`.agents/skills/`（codex/opencode/pi 自动读取）；仅 Claude 需 `.claude/skills`，安装时镜像。
- **角色/命令/配置逐 agent 生成**：同一治理语义按各 agent 语法出稿（TOML vs MD frontmatter vs TS hook）。

## 配置

`.harness/config.json` 由 `init` 生成，记录项目信息、Assurance 档位、启用的角色与技能、已生成的 agent 清单等。完整 schema 见 `template/.harness/config.schema.json`。

## 开发

从源码构建并本地测试：

```bash
git clone <repo> && cd horness
pnpm install         # 安装依赖
pnpm build           # tsdown 打包到 dist/horness.mjs（自包含单文件）
pnpm test            # 运行测试（node --test）
pnpm typecheck       # tsc --noEmit 类型检查
```

本地直接用全局命令测试：

```bash
pnpm setup           # 首次：配置 PNPM_HOME（写入 shell，重启终端生效）
pnpm link --global   # 全局注册 `horness` 命令
horness init --name Demo   # 之后任何目录直接可用
```

> `pnpm build` 后全局命令即反映最新版本（bin 指向 `dist/horness.mjs`）。

## 注意事项

- OpenCode 是**独立 CLI**（npm 包名 `opencode-ai`，也支持 curl 安装），不是本项目依赖；horness 只生成它的配置脚手架，要跑 OpenCode 需单独安装。
- codex 的 `rules/*.rules`（Starlark 执行策略）与 opencode/pi 的 TS hook 是按当前文档约定的**参考实现**；各 agent 版本 API 可能演进，接入时以目标版本为准微调（详见各文件内注释）。
- Codex 无自定义 slash 命令，阶段流水线由 AGENTS.md 规则 + 技能 + 角色驱动。
