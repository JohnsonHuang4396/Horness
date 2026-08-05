---
description: 自进化复盘：基于真实任务失败与评审打回生成可审计的规则/Skill 改进候选，走 candidate→eval→approval→canary→rollback，不自动激活
---

# 自进化复盘（Self-Evolution）

基于真实任务失败、阻断证据、重复未知项和用户明确反馈生成改进候选。**不修改正式规则、不激活 Skill、不删除历史记录、不调用外部模型。**

## 生命周期

1. **observe**：读取 `.harness/host-sessions/`、评审报告、CI 报告、`summary.md` 和用户反馈，提取 P0/P1 问题根因。
2. **candidate**：生成唯一 `proposal_id`、根因、证据路径、目标文件、优先级（P0/P1/P2）、影响面、回滚点，追加到 `.harness/generated/evolution-candidates.json`。
3. **eval**：对候选执行 schema、静态、冲突、权限、提示词注入和回归评测；失败候选保持 `pending`。
4. **approval**：用户明确批准具体候选、版本和范围；批准不能默认为「所有候选」。
5. **canary/install**：先在隔离目录或单个规则上灰度，记录前后哈希、验证命令和退出码。
6. **rollback**：验证失败、冲突或用户撤回时恢复基线；用户文件和冲突源文件永远保留。

## 数据来源与根因框架

- 数据来源优先级：评审报告（P0/P1）> CI 报告（残留 Error）> summary.md 阶段数据 > 主控观察。
- 根因类型：规范缺失 / 规范模糊 / 检查点缺失 / 模板缺陷 / 流程卡点 / 阶段门禁不足。
- 每条根因：问题来源、问题现象、问题类型、harness 根因（哪个文件的哪个位置缺什么）、影响范围（高/中/低）。

## 候选必含字段

```json
{
  "proposal_id": "prop-<ts>-<n>",
  "root_cause": "<根因一句话>",
  "evidence": ["<评审报告路径>", "<问题 ID>"],
  "target_file": "<.claude/ 或 .harness/ 下目标文件>",
  "priority": "P0|P1|P2",
  "impact": "high|medium|low",
  "before_hash": "<sha256>",
  "after_hash": "<sha256>",
  "eval": { "status": "pending|pass|fail", "notes": "" },
  "approval": { "status": "none|approved|rejected", "actor": "", "scope": "" },
  "state": "candidate|eval|approved|canary|installed|rolled-back",
  "rollback": "<回滚命令或步骤>",
  "unknowns": []
}
```

无证据的最低要求：没有 `source`/`facts_hash`/`before-after hash`/评测/审批者/回滚/unknowns 的建议只能显示为「待补证据」，不能进入 active。

## 安全

- 不要把「重复失败」自动解释为规则缺失；先区分需求不清、环境不可用、实现缺陷和 Harness 缺陷。
- 候选内容必须脱敏；外部来源只有用户明确刷新时才访问。
- 用户批准具体候选与版本，不默认批准所有；回滚恢复 Frozen/Project Slot 基线。

## 输出

生成 `.harness/generated/evolution-report-<YYYYMMDD>.md`，列出根因 N、方案 N（目标文件/修改位置/修改类型/修改内容/预期效果）。P0 级方案分析完成后可立即执行，但写入正式规则前仍须经候选审批。