---
name: controlled-evolution
description: 候选制门禁：新 Skill/规则/领域知识一律进候选（candidate→eval→approval→canary/install→rollback），禁止把模型猜测直接写成正式规则。触发关键词：新技能、候选、规则改进、领域知识、自进化。
---

# Controlled Evolution（候选制门禁）

新 Skill、规则、领域知识一律先写成候选，走候选生命周期，审核通过才激活。**禁止把模型猜测直接写成正式规则。**

## 触发

- 用户要求「生成新 Skill / 新规则 / 领域知识 / 改进规则」。
- 任务中发现能力缺口或规则缺失，需要新增资产。

## 生命周期

```
candidate → eval → approval → canary/install → rollback
```

1. **candidate**：写入 `.harness/packs/candidates/`（Skill/领域）或 `.harness/generated/`（规则/进化），默认 `candidate` 状态，不直接安装或激活。
2. **eval**：执行 schema 校验、静态检查、冲突检查、权限检查、提示词注入和回归评测；失败候选保持 `pending`。
3. **approval**：用户明确批准**具体候选、版本和范围**；批准不能默认「所有候选」。
4. **canary/install**：先在隔离目录或单个 Project Slot 灰度，记录前后哈希、验证命令和退出码。
5. **rollback**：验证失败、冲突或用户撤回时恢复基线；用户文件和冲突源文件永远保留。

## 候选必含证据

- 来源（source/uri/license/content_hash/verified_at）
- `facts_hash`、`before_hash`/`after_hash`
- 评测结果、审批者、安装范围、回滚命令、unknowns
- 触发器（positive/negative）与权限（tools/filesystem/network/secrets/approval_level）

无证据的最低要求：没有证据的候选只能显示为「待补证据」，不能进入 active。

## 边界

- 项目已有同名 Skill/规则时做差异报告，不覆盖。
- 外部来源只有用户明确刷新时才访问；默认不联网。
- 不属于当前项目的通用研发流程归 Core，技术栈细节归 Stack。
- 不写入正式规则或修改 skill-lock 直到用户批准。

## 失败回退

候选在任何阶段失败都保持 `pending` 或 `rolled-back` 状态，不静默删除；记录原因、恢复点、下一步动作。