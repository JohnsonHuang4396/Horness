---
description: 安全卸载：停用/清理/卸载当前项目 Harness，预览按删除/备份/保留/需确认分类，用户文件与冲突源文件默认保留
---

# 卸载当前项目 Harness

安全停用/清理/卸载当前项目的 Harness。**用户文件与冲突源文件默认保留**，有备份与回滚路径。

## 模式

| 模式 | 动作 |
|---|---|
| `detach` | 停用：移除 `.harness/current-session` 指针与运行事件，保留规则与 `.opencode/` |
| `clean-history` | 清理运行记录：清空 `.harness/host-sessions/` 与 `.harness/generated/` 运行时状态 |
| `uninstall` | 完整卸载：移除 `.opencode/` 的 agents/skills/commands/hooks、`.claude/` 与 `.harness/` |

## 步骤

1. **预览（preview）**：扫描 `.opencode/`、`.claude/` 与 `.harness/` 所有资产，按以下分类：
   - **删除（Harness 生成物）**：`.harness/` 运行时账本、`.opencode/command` 的 harness 命令、`.opencode/plugin` 的 hook、`.claude/settings.json` 的 hook。
   - **备份（用户修改过的）**：用户编辑过的 AGENTS.md 工作规范、`opencode.json`。
   - **保留（用户资产）**：业务代码、CONTEXT.md、HANDOFF.md、用户自建规则。
   - **需确认**：`.opencode/agent/`、`.claude/skills/`、`.claude/agents/`（可能是用户自建，需逐项确认）。
2. 生成卸载计划 `.harness/generated/uninstall-plan.json`（mode、backup_directory、move_paths、state=preview）。
3. **确认**：向用户展示分类清单，等待明确确认。
4. **应用**：按分类执行；删除前把改动文件复制到 `backup_directory`（`.harness/migrations/<uninstall-id>/`）。
5. **报告**：写 `.harness/generated/uninstall-report.json`（删除/备份/保留清单、回滚步骤）。
6. **回滚**：任何一步失败，从备份目录恢复；执行 `git status` 确认只动了预期文件。

## 安全红线

不删除用户文件、旧数据、冲突源文件或用户自建 Skill/规则；删除前必须备份；有回滚路径；不读取/打印/提交秘密；卸载报告脱敏。