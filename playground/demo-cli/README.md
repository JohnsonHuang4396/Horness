# demo-cli — Codex + Harness 演示项目

最小 Node CLI，由 **horness** 初始化 Harness 治理骨架（agent: **Codex**）。本仓库演示一条真实任务走完 P0→P10 阶段流水线并留下完整证据链。

## 项目

- 技术栈：Node 24 / TypeScript，零第三方依赖
- 命令：`node src/index.ts greet <name>`、`node src/index.ts --version`
- Harness 配置：`.harness/config.json`（`harness.agents: ["codex"]`）

## 任务：增加 `--version` 子命令

| 项 | 值 |
|---|---|
| Session | `demo-cli-001` |
| 任务类型 | `small-change` |
| Assurance | `standard` |
| 风险 | R1 |
| 决定 | 代码可合并 |

### 阶段产物（`.harness/host-sessions/<session>/`）

| 阶段 | 产物 | 通过项 |
|---|---|---|
| P0 接收 | `intake.md` | 边界：允许改 index.ts/新增测试；禁止改 greet |
| P1 需求 | `requirements.md` | REQ-1/2/3，各映射 AC |
| P3 方案 | `design.md` | 方案 B：`import.meta.main` 隔离入口 |
| P4 任务 | `tasks.md` | TASK-1：写集合/验证/回滚/完成证据 |
| P7 验证 | `verification-report.md` | 3 条命令证据，AC 全绿 |
| P9 验收 | `acceptance-release.md` | 验收矩阵 + 决定「可合并」 |

### 证据账本（`adapter-events.jsonl`）

任务执行事件由 `.harness/scripts/evidence.sh` 真实写入（host-sessions 无 session 时静默，不伪造）：

```
task.register   src/index.ts        demo-cli --version
file            intake.md           write
file            requirements.md     write
file            design.md           write
file            tasks.md            write
file            verification-report.md  write
file            acceptance-release.md   write
tool            node --test         test (exit 0)
task.complete   acceptance-release.md  merge
```

### 真实验证结果

```bash
$ node src/index.ts --version        # → 1.0.0
$ node src/index.ts greet harness    # → hello, harness
$ node --test src/index.test.ts      # → 2 passed, 0 failed
```

## 复现

```bash
horness init ./demo-cli --name DemoCLI --agents codex
# 重启 Codex 会话，按 AGENTS.md 规则 + 技能驱动，无 slash 命令
```