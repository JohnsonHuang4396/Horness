# demo-api — OpenCode + Harness 演示项目

最小 HTTP 服务（`node:http`，零依赖），由 **horness** 初始化 Harness 治理骨架（agent: **OpenCode**）。本仓库演示一条真实任务走完 P0→P10 阶段流水线并留下完整证据链。

## 项目

- 技术栈：Node 24 / TypeScript / `node:http`
- 结构：`src/server.ts`（导出 `handler` 便于注入测试）、`src/server.test.ts`
- Harness 配置：`.harness/config.json`（`harness.agents: ["opencode"]`）
- 证据 hook：`.opencode/plugin/evidence.ts`（按 opencode 1.18 插件 API）

## 任务：增加 `/health` 健康检查端点

| 项 | 值 |
|---|---|
| Session | `demo-api-001` |
| 任务类型 | `small-change` |
| Assurance | `standard` |
| 风险 | R1 |
| 决定 | 代码可合并 |

### 阶段产物（`.harness/host-sessions/<session>/`）

| 阶段 | 产物 | 通过项 |
|---|---|---|
| P0 接收 | `intake.md` | 边界：允许改 server/测试；禁止加依赖 |
| P1 需求 | `requirements.md` | REQ-1/2，`/health` 200 + 未知路径 404 |
| P3 方案 | `design.md` | 方案 B：导出 `handler` 注入，真实可测 |
| P4 任务 | `tasks.md` | TASK-1 写集合/验证/回滚 |
| P7 验证 | `verification-report.md` | 真实 HTTP 集成测试 2 过 |
| P9 验收 | `acceptance-release.md` | 验收矩阵 + 决定「可合并」 |

### 证据账本（`adapter-events.jsonl`）

```
task.register   src/server.ts   /health 端点
file            intake.md … acceptance-release.md   (六份阶段产物 write)
tool            node --test   test (exit 0)   # 真实启动 HTTP + fetch
task.complete   acceptance-release.md  merge
```

### 真实验证结果（真实 HTTP 集成）

```bash
$ node --test src/server.test.ts
✔ /health 返回 200 {status:ok}
✔ 未知路径返回 404
ℹ pass 2  fail 0
```

## 复现

```bash
horness init ./demo-api --name DemoAPI --agents opencode
# 重启 OpenCode 会话 → /harness-check 自检 → /harness 发起任务
```