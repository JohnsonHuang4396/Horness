# demo-react — Claude + Harness 演示项目

React + Vite 演示项目，由 **horness** 初始化 Harness 治理骨架（agent: **Claude Code**）。本仓库演示一条真实任务走完 P0→P10 阶段流水线并留下完整证据链。

## 项目

- 技术栈：React 18 / Vite / TypeScript
- 结构：`src/App.tsx`（Counter 组件）、`src/counter.ts`（纯逻辑）、`src/main.tsx`
- Harness 配置：`.harness/config.json`（`harness.agents: ["claude"]`）

## 任务：增加 Counter 计数器组件

| 项 | 值 |
|---|---|
| Session | `demo-react-001` |
| 任务类型 | `small-change` |
| Assurance | `standard` |
| 风险 | R1 |
| 决定 | 代码可合并 |

### 阶段产物（`.harness/host-sessions/<session>/`）

| 阶段 | 产物 | 通过项 |
|---|---|---|
| P0 接收 | `intake.md` | 边界：允许新增 counter/App/测试；禁用状态库 |
| P1 需求 | `requirements.md` | REQ-1/2，初值 0 可增减 + 逻辑可独立验证 |
| P3 方案 | `design.md` | 方案 B：counter 纯函数解耦，node 可验证 |
| P4 任务 | `tasks.md` | TASK-1 写集合/验证/回滚 |
| P7 验证 | `verification-report.md` | counter 测试 + tsc 通过；UI 交互列剩余风险 |
| P9 验收 | `acceptance-release.md` | 验收矩阵 + 决定「可合并」 |

### 证据账本（`adapter-events.jsonl`）

任务事件由 `.harness/scripts/evidence.sh` 真实写入：

```
task.register   src/App.tsx   counter 组件
file            intake.md … acceptance-release.md   (六份阶段产物 write)
tool            node --test   test (exit 0)
tool            tsc --noEmit  typecheck (exit 0)
task.complete   acceptance-release.md  merge
```

### 真实验证结果

```bash
$ node --test src/counter.test.ts   # → 2 passed, 0 failed
$ npx tsc --noEmit                  # → 类型检查通过
```

## 复现

```bash
horness init ./demo-react --name DemoReact --agents claude
# 重启 Claude Code 会话 → /harness-check 自检 → /harness 发起任务
```