# horness Playground — 完整功能链演示场

本目录验证 **horness** 的完整功能链：**一条命令初始化跨 agent 的 Harness 治理骨架 → 在真实项目上跑真实任务 → 走完 P0→P10 阶段流水线 → 留下可由证据账本（`adapter-events.jsonl`）回溯的证据链**。

三个演示项目分别覆盖不同 agent、不同技术栈、不同任务，每个都在 `.harness/host-sessions/<session>/` 留有完整证据链（六份阶段产物 + 事件账本），并在各自 README 汇总。

## 演示矩阵

| 项目 | Agent | 技术栈 | 任务 | Session | 决定 |
|---|---|---|---|---|---|
| [demo-cli](demo-cli/README.md) | **Codex** | Node 24 / TS | 加 `--version` 子命令 | `demo-cli-001` | 可合并 |
| [demo-react](demo-react/README.md) | **Claude Code** | React 18 / Vite | 加 Counter 计数器 | `demo-react-001` | 可合并 |
| [demo-api](demo-api/README.md) | **OpenCode** | Node 24 / `node:http` | 加 `/health` 端点 | `demo-api-001` | 可合并 |

## 验证的功能链

1. **初始化**：对每个项目 `horness init … --agents <agent>` → 共享核心 `.harness/` + `AGENTS.md` + `.agents/skills/`（技能中心）+ 对应 agent 脚手架（`.claude | .codex | .opencode` + `opencode.json`）。
2. **任务运行**：登记 Host Session → 走 P0 接收 / P1 需求 / P3 方案 / P4 任务 / P7 验证 / P9 验收，每阶段产出对应模板文档。
3. **证据账本**：`.harness/scripts/evidence.sh` 把 `task.register / file.* / tool.* / task.complete` 事件真实写入 `.harness/host-sessions/<session>/adapter-events.jsonl`（无 session 时静默，不伪造）。
4. **机械化验证**（非口号）：
   - demo-cli：`node --test` 2 过 + CLI 真实输出
   - demo-react：counter 纯函数测试 2 过 + `tsc --noEmit`
   - demo-api：**真实 HTTP 集成测试**（启动 server + fetch `/health`）2 过
5. **接入自检**：每个项目可运行对应该 agent 的 `/harness-check`（Claude / OpenCode；Codex 用 AGENTS.md 规则 + 技能驱动）验证「真被使用」而非文件存在。

## 证据链位置

每个项目内：

```
.harness/host-sessions/<session>/
  intake.md  requirements.md  design.md  tasks.md
  verification-report.md  acceptance-release.md
  adapter-events.jsonl        # 事件账本（JSONL）
```

项目 README 的「证据账本」与「真实验证结果」两节是对每条证据的可读汇总。

## 从零复现

```bash
# 1. 打包
pnpm build

# 2. 初始化三个项目（不同 agent）
./dist/horness.mjs init playground/demo-cli   --name DemoCLI   --agents codex
./dist/horness.mjs init playground/demo-react --name DemoReact --agents claude
./dist/horness.mjs init playground/demo-api   --name DemoAPI   --agents opencode

# 3. 重启对应 Agent 会话，/harness-check 自检，/harness 发起任务
```

> 本目录是 horness 的端到端测试产物，已由 `../.gitignore` 的 `playground/` 忽略，不入 horness 仓库。