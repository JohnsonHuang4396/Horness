---
description: 任务执行器：登记任务、建立 Host Session、走 P0→P10 阶段流水线（含门禁/角色/回退），产出证据账本
---

# Harness 任务执行器（P0→P10 阶段流水线）

把当前请求作为一次任务登记，建立 Host Session，走 P0→P10 流水线。每个阶段有 entry 门禁、角色、阶段产物、exit 门禁和失败回退。证据写入 `.harness/host-sessions/<session>/`。角色定义见 `.pi/agents/`，证据脚本见 `.harness/scripts/evidence.sh`，规则见 AGENTS.md。

## 阶段契约总览

| 阶段 | 名称 | 角色 | 产物 | exit 门禁 |
|---|---|---|---|---|
| P0 | 接收与初始路由 | controller | `intake.md` | 任务类型+模式已定 |
| P1 | 需求分析 | requirement-analyst | `requirements.md` | 需求已评审 |
| P2 | 项目发现与影响分析 | discovery | `project-inventory.md`, `impact-ledger.md` | 影响已列全 |
| P3 | 方案设计 | design-architect | `design.md` | 设计已评审 |
| P4 | 任务、风险与测试策略 | solution, controller | `tasks.md`, `test-plan.md`, `risk-register.md` | 任务可验证 |
| P5 | 实施前检查与基线 | controller | `preflight.md`, `baseline-a.md` | 基线干净 |
| P6 | 编码实现 | developer | `implementation-attempt.md` | 实现+窄验证通过 |
| P7 | 机械化验证 | controller, quality-reviewer | `verification-report.md`, `baseline-b.md` | 验证通过 |
| P8 | 独立评审与安全检查 | quality-reviewer, security-reviewer | `review-report.md`, `security-review.md` | P0/P1 全关 |
| P9 | 验收与发布准备 | release-reviewer, controller | `acceptance-release.md` | 验收通过 |
| P10 | 收尾、学习与项目沉淀 | controller | `summary.md`, `run-report.md` | 证据完整 |

**门禁规则**：每个阶段先判断是否可进入（entry），产出后做 exit 检查；未通过则回退到本阶段或前一阶段（最多 3 次），仍失败则停止并记录原因/恢复点/下一步。

**低风险任务**（`answer`/`small-change`）可合并阶段，但 P0 红线、验证、失败回退不可跳过。

**Human-in-the-loop**：P3 设计完成后、P9 交付前，向用户展示摘要并等待明确确认。用户确认「继续」才进入下一阶段。

## 0. 登记任务（P0 接收与路由）

1. 生成 session id：`date -u +%Y%m%dT%H%M%SZ` → `s-<ts>`。
2. 建 session 并写初始事件：
   ```bash
   .harness/scripts/evidence.sh session s-<ts>
   .harness/scripts/evidence.sh event intake.registered "" "<原始请求>" 0
   ```
3. 判断任务类型（`answer/small-change/feature/migration/debug/release`）与 Assurance 模式（`fast/standard/high-assurance`，按风险默认 `standard`）。
4. 写 `intake.md`：任务名称、原始请求（不改写）、任务类型、模式、预估风险（R0-R4）、是否需代码写入、是否含外部副作用、初始边界。

## 1-9. P1 需求分析 → P9 验收与发布准备

按上表逐阶段执行：加载对应角色与 `.claude/skills` 技能（Pi 通过 settings.json 复用），产出阶段文档，执行 exit 门禁与失败回退。P3 后 HitL 1、P9 前 HitL 2 等待用户确认。各阶段产物字段与评审要点以 `.pi/agents/` 对应角色文件为准。

## 10. P10 收尾、学习与项目沉淀

- 角色：controller。
- 产出 `summary.md`（SSOT：各阶段状态、证据引用、时间）、`run-report.md`（学到的教训、未知项、可沉淀的候选）。
- 新规则/Skill 改进候选写入 `.harness/generated/` 或 `.harness/packs/candidates/`（不直接激活）。
- 把 session id 与结论写入记忆，供 harness-check 验证「真被使用」。

## 失败回退总则

- 每阶段失败最多重试 3 次；仍失败停止并记录原因、恢复点、下一步动作。
- 不删除用户文件/旧数据/冲突源文件；修改前确认影响范围。
- 每次进入/退出阶段写事件：
  ```bash
  .harness/scripts/evidence.sh event stage.<P0..P10> "<阶段名>" "<命令或结论>" <退出码>
  ```

## 安全约定

- 不读取/打印/提交秘密；默认不联网；不把猜测写成候选；发现密钥立即阻断。