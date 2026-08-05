# HARNESS — 项目治理骨架使用说明

本项目的 agent 脚手架与 `.harness/` 由 **horness** 初始化（模板来源：`horness/template/`）。它提供一套治理纪律：任务走 P0→P10 阶段流水线、证据写入 `.harness/`、新规则/Skill 走候选审批。支持 **Claude Code / Codex / OpenCode / Pi**，共享同一份 `.harness/` 运行时、`AGENTS.md` 规则与 `.agents/skills/` 技能中心。

## 快速开始

```bash
# 1. 初始化（选择 agent：claude / codex / opencode / pi，逗号分隔或 all）
horness init . --name <项目名> --agents all

# 2. 重启对应 Agent 会话，让 hook 与技能生效
# 3. 验证接入（按 agent，见下）
```

## 各 agent 接入

| Agent | 读哪份 skill | 证据 hook | 自检命令 |
|---|---|---|---|
| Claude Code | `.claude/skills`（安装时镜像） | `.claude/settings.json` FileChanged | `/harness-check` |
| Codex | `.agents/skills` | `.codex/config.toml` hooks | 无，用规则+技能 |
| OpenCode | `.agents/skills` | `.opencode/plugin/evidence.ts` | `/harness-check` |
| Pi | `.agents/skills` | `.pi/extensions/evidence.ts` | `/harness-check` |

## 命令

| 命令 | 作用 |
|---|---|
| `/harness` | 任务执行器：P0→P10 阶段流水线（门禁/角色/回退/HitL） |
| `/bootstrap` | 只读扫描项目 → 生成规则/Skill 候选 |
| `/scan` | 重新扫描，更新技术栈事实 |
| `/harness-check` | 验证 Harness 是否真被使用（非文件存在） |
| `/doctor` | 体检 |
| `/evolution` | 自进化复盘 → 改进候选 |
| `/uninstall` | 安全卸载（预览/备份/回滚） |

（Codex 无自定义 slash 命令：阶段流水线由 AGENTS.md 规则 + 技能 + 角色驱动。）

## 角色

8 个逻辑角色（`.claude/agents/`、`.codex/agents/`、`.opencode/agent/`、`.pi/agents/`）：controller、requirement-analyst、design-architect、developer、quality-reviewer、security-reviewer、database-reviewer、release-reviewer。流水线按阶段调度。

## 证据账本

`.harness/host-sessions/<session>/` 记录每次任务事件（`adapter-events.jsonl`）与阶段产物。各 agent 的证据 hook 自动把文件变化写入账本。

## 配置

`.harness/config.json` 记录项目名称、技术栈、Assurance 默认、启用角色、已装 Skill、agent 清单与 hook。由 `horness init` 生成，`harness.agents` 记录已生成脚手架的 agent；schema 见 `.harness/config.schema.json`。

## 常见问题

- **hook 未生效**：重启对应 Agent 会话；确认各 agent 配置存在（`.claude/settings.json` / `.codex/config.toml` / `opencode.json` / `.pi/settings.json`）。
- **技能未识别**：重启会话；技能单一来源在 `.agents/skills/`（codex/opencode/pi 直接读），Claude 用 `.claude/skills`（已镜像）。
- **证据不存在**：确认当前有 Host Session（`/harness` 登记后），无 session 不伪造事件。