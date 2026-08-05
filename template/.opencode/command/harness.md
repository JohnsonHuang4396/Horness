---
description: 任务执行器：登记任务、建立 Host Session、走 P0→P10 阶段流水线（含门禁/角色/回退），产出证据账本
---

# 任务执行器（P0→P10 阶段流水线）

把当前请求作为一次任务登记，建立 Host Session，走 P0→P10 流水线。每个阶段有 entry 门禁、角色、阶段产物、exit 门禁和失败回退。证据写入 `.harness/host-sessions/<session>/`。阶段角色与产物见 `.opencode/agent/`，模板见 `.harness/templates/`。

## 阶段契约总览

| 阶段 | 名称 | 角色 | 产物 | exit 门禁 |
|---|---|---|---|---|
| P0 | 接收与初始路由 | controller | `intake.md` | 任务类型+模式已定 |
| P1 | 需求分析 | requirement-analyst | `requirements.md` | 需求已评审 |
| P2 | 项目发现与影响分析 | — | `project-inventory.md`, `impact-ledger.md` | 影响已列全 |
| P3 | 方案设计 | design-architect | `design.md` | 设计已评审 |
| P4 | 任务、风险与测试策略 | — | `tasks.md`, `test-plan.md`, `risk-register.md` | 任务可验证 |
| P5 | 实施前检查与基线 | controller | `preflight.md`, `baseline-a.md` | 基线干净 |
| P6 | 编码实现 | developer | `implementation-attempt.md` | 实现+窄验证通过 |
| P7 | 机械化验证 | controller | `verification-report.md`, `baseline-b.md` | 验证通过 |
| P8 | 独立评审与安全检查 | quality/security | `review-report.md`, `security-review.md` | P0/P1 全关 |
| P9 | 验收与发布准备 | release-reviewer | `acceptance-release.md` | 验收通过 |
| P10 | 收尾、学习与项目沉淀 | controller | `summary.md`, `run-report.md` | 证据完整 |

**门禁规则**：每个阶段先判断是否可进入（entry），产出后做 exit 检查；未通过则回退到本阶段或前一阶段（最多 3 次），仍失败则停止并记录原因/恢复点/下一步。低风险任务（`answer`/`small-change`）可合并阶段，但 P0 红线、验证、失败回退不可跳过。

**Human-in-the-loop**：P3 设计完成后、P9 交付前，向用户展示摘要并等待明确确认。用户确认「继续」才进入下一阶段。

## 0. 登记任务（P0）

1. 生成 session id：`date -u +%Y%m%dT%H%M%SZ` → `s-<ts>`。
2. 建 session 并写初始事件：`.harness/scripts/evidence.sh session s-<ts>` 与 `evidence.sh event intake.registered "" "<原始请求>" 0`。
3. 判断任务类型（`answer/small-change/feature/migration/debug/release`）与 Assurance 模式（`fast/standard/high-assurance`，按风险默认 `standard`）。
4. 写 `intake.md`：任务名称、原始请求（不改写）、任务类型、模式、预估风险（R0-R4）、是否需代码写入、是否含外部副作用、初始边界（允许/禁止/禁区）。

## 1. P1 需求分析

- 角色：requirement-analyst。
- 产出 `requirements.md`：目标、范围、需求表（REQ-*）、验收条件（AC-*）、必须保持的契约、假设、未决问题、追踪完整性。
- exit 门禁：每个 REQ 至少映射一个 AC；用户原话与推断分开；未决问题有责任人。
- 评审：quality-reviewer 检查需求理解、范围、可测试性、边界遗漏。

## 2-3. P2 发现与 P3 设计

- P2：只读扫描项目（以锁文件/构建描述/入口源码为准，不猜目录名），产出 `project-inventory.md` 与 `impact-ledger.md`（IMP id、影响面、是否需动作）。
- P3：design-architect 产出 `design.md`（现状、约束、方案对比 A/B、选定方案、追踪矩阵、决策与剩余风险）。
- **⏸️ HitL 1**：向用户展示 requirements + design 摘要 + 评审结论，等待「确认，继续」或「方案修订：xxx」。

## 4. P4 任务、风险与测试策略

产出 `tasks.md`（批次概览 + TASK-*，含写集合/禁止项/窄验证/失败路由/回滚/完成证据）、`risk-register.md`、`test-plan.md`。
exit 门禁：并行任务写集合不冲突；迁移/删除任务含负向搜索；每批有恢复点和退出证据。

## 5. P5 实施前检查与基线

- 角色：controller。产出 `preflight.md`（Git 基线、用户已有变化、工具链、构建/测试入口、网络/秘密需求）与 `baseline-a.md`（命令/结果/退出码/影响/决定）。
- exit 门禁：基线记录真实命令与退出码；保留用户已有变化清单。

## 6. P6 编码实现

- 角色：developer。按 `tasks.md` 顺序一次执行一个可验证批次，只修改任务范围内文件。
- 产出 `implementation-attempt.md`；发现契约冲突时停下记录，不擅自扩大范围。
- exit 门禁：窄验证通过；影响账本项已处理；不删除用户文件。

## 7. P7 机械化验证

- 角色：controller。产出 `verification-report.md`（命令/退出码/结果/哈希、AC 与影响映射、失败分类、`git diff --name-status` 核对、最终结论）与 `baseline-b.md`。
- 失败路由：验证失败→回 P7 重试（≤2）；实现缺陷→回 P6（≤2）。
- exit 门禁：结论不写「应该没问题」；无法验证项有替代证据或风险审批。

## 8. P8 独立评审与安全检查

- 角色：quality-reviewer + security-reviewer。产出 `review-report.md` 与 `security-review.md`。
- 强制门禁：默认拒绝未知输入/来源；网络访问必须用户明确触发；安全修复后验证负向用例；P0 未关闭禁止继续。
- exit 门禁：P0/P1 问题全关；发现密钥立即阻断并说明处理路径。

## 9. P9 验收与发布准备

- 角色：release-reviewer + controller。产出 `acceptance-release.md`（验收矩阵、核销表、发布准备、回滚、剩余风险与批准、决定）。
- **⏸️ HitL 2**：向用户展示变更清单 + 评审结论 + 验证报告，等待「确认」或「需要修改：xxx」。
- exit 门禁：任何未执行检查标记为未执行，不用「应该通过」替代。

## 10. P10 收尾、学习与项目沉淀

- 角色：controller。产出 `summary.md`（SSOT）与 `run-report.md`（教训、未知项、可沉淀候选）。
- 新规则/Skill 改进候选写入 `.harness/generated/` 或 `.harness/packs/candidates/`（不直接激活）。

## 失败回退与证据

- 每阶段失败最多重试 3 次；仍失败停止并记录原因、恢复点、下一步动作。
- 不删除用户文件/旧数据/冲突源文件；修改前确认影响范围。
- 每次进入/退出阶段写事件：`.harness/scripts/evidence.sh event stage.<P0..P10> "<阶段名>" "<命令或结论>" <退出码>`。

## 安全约定

不读取/打印/提交秘密；默认不联网；不把猜测写成候选；发现密钥立即阻断。