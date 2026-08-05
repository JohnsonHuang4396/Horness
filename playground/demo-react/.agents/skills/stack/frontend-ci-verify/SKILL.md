---
name: ci-verify
description: CI 验证，针对变更文件清单执行静态扫描检查。
metadata:
  author: zhongyuan10
  version: '1.1'
---

# CI 验证 Skill

针对本次变更文件清单执行静态扫描验证。覆盖 ESLint / Stylelint / Prettier 语法风格扫描、TypeScript 类型检查两个阶段。

## 职责边界

**本 Skill 负责**：

- 获取变更文件清单
- 执行 ESLint / Stylelint / Prettier 静态扫描（自动修复 + 收集残留问题）
- 执行 TypeScript 类型检查（`vue-tsc --noEmit`）
- 输出结构化 CI 验证结论

## 执行流程

> **强制约定**：步骤 1 → 5 必须完整顺序执行，不得跳过，不得在中途输出结果等待用户。

### 步骤 1：提取变更文件清单

按执行模式选择对应获取方式：

**场景 A：调用方传入了 `summary.md` 路径（Plan / Spec 模式）**

读取 `summary.md` 的「变更文件清单」，提取所有新增/修改的文件路径：

```
新增文件：从「新增文件」表格提取 [文件路径] 列
修改文件：从「修改文件」表格提取 [文件路径] 列
```

**场景 B：调用方直接传入变更文件路径列表（Vibe 模式，无 summary.md）**

直接使用调用方传入的文件路径列表，跳过读取 `summary.md`。

按文件类型分组：

- `.ts` / `.vue` / `.js`：参与 ESLint 扫描
- `.vue`（`<style>` 块） / `.scss` / `.css`：参与 Stylelint 扫描
- `.ts` / `.vue` / `.js` / `.scss` / `.css`：参与 Prettier 格式化

---

### 步骤 2：ESLint 扫描

**跳过条件**：以下配置文件均不存在时跳过，并在输出结论的「工具修复」章节注明原因：
`.eslintrc{,.js,.cjs,.mjs,.json,.yaml,.yml}` / `eslint.config.{js,mjs,cjs}`，或 `package.json` 中含 `eslintConfig`
字段。

```bash
# 第一步：自动修复
npx eslint --fix <文件路径1> <文件路径2> ...

# 第二步：收集残留问题（修复后立即执行，记录无法自动修复的 Error/Warning）
npx eslint <文件路径1> <文件路径2> ...
```

收集输出中的所有 Error / Warning，记入残留问题列表。

---

### 步骤 3：Stylelint 扫描

**跳过条件**：以下配置文件均不存在时跳过，并在输出结论的「工具修复」章节注明原因：
`.stylelintrc{,.js,.cjs,.mjs,.json,.yaml,.yml}` / `stylelint.config.{js,mjs,cjs}`，或 `package.json` 中含 `stylelint`
字段。

```bash
# 第一步：自动修复
npx stylelint --fix <vue文件或scss文件路径> ...

# 第二步：收集残留问题
npx stylelint <vue文件或scss文件路径> ...
```

收集输出中的所有 Error / Warning，记入残留问题列表。

---

### 步骤 4：Prettier 格式化

**必须在 ESLint 和 Stylelint 之后执行**（避免格式冲突）。

**跳过条件**：以下配置文件均不存在时跳过，并在输出结论的「工具修复」章节注明原因：
`.prettierrc{,.js,.cjs,.mjs,.json,.json5,.yaml,.yml,.toml}` / `prettier.config.{js,mjs,cjs}`，或 `package.json` 中含
`prettier` 字段。

```bash
# 第一步：格式化
npx prettier --write <文件路径1> <文件路径2> ...

# 第二步：收集残留问题（检查格式化后是否仍有不符合项）
npx prettier --check <文件路径1> <文件路径2> ...
```

收集 `--check` 输出中仍不符合格式要求的文件，记入残留问题列表。

---

### 步骤 5：TypeScript 类型检查

**跳过条件**：项目根目录不存在 `tsconfig.json` 时跳过，并在输出结论的「工具修复」章节注明原因。

> **当前项目**：本项目为纯 JavaScript 项目，无 TypeScript，此步骤默认跳过。

```bash
npx vue-tsc --noEmit -p tsconfig.json --composite false
```

**说明**：

- `--noEmit`：只做类型检查，不输出编译产物
- 检查整个项目的 TypeScript 类型正确性（不局限于变更文件，因为类型改动可能影响其他文件）
- 收集所有类型错误（文件路径 + 行号 + 错误描述），记入残留问题列表

---

## 输出结论

所有步骤执行完毕后，统一输出：

```
CI 验证结论：CI_PASS / CI_FAIL

自动修复汇总：
- ESLint：已修复 {N} 处 / 已跳过（原因：未找到配置文件）
- Stylelint：已修复 {N} 处 / 已跳过（原因：未找到配置文件）
- Prettier：已格式化 {N} 处 / 已跳过（原因：未找到配置文件）

残留问题明细（需人工修复）：
[ESLint ERROR] src/pages/order/list/index.vue:45:12
  规则：no-explicit-any
  说明：禁止使用 any 类型
  建议：将 any 替换为明确的 interface 类型定义

[TS ERROR TS2322] src/services/modules/order.ts:23:5
  说明：Type 'string' is not assignable to type 'number'
  建议：检查 getOrderList 返回值类型声明与实际返回值是否一致

[BUILD ERROR] src/pages/order/list/index.vue
  说明：Cannot find module '@/api/modules/order'
  建议：检查模块路径是否正确，确认文件已创建
```

**整体判定**：

| 结论      | 判定条件                                                 |
| --------- | -------------------------------------------------------- |
| CI_PASS   | 无残留 Error 级别问题，vue-tsc 无类型错误                |
| CI_PASS\* | 仅有 Warning 级别问题（不阻塞，在结论中注明）            |
| CI_FAIL   | 存在残留 Error 级别问题，或 vue-tsc 类型错误（输出原因） |

> CI_FAIL 时只输出结论和残留问题明细，**不做回退决策**。回退目标由 `@quality-reviewer` 根据失败类型判定。

---

## 常用命令速查

```bash
# ESLint 修复（精准指定文件）
npx eslint --fix src/pages/order/list/index.vue

# ESLint 仅检查（收集残留）
npx eslint src/pages/order/list/index.vue

# Stylelint 修复
npx stylelint --fix src/pages/order/list/index.vue

# Stylelint 仅检查（收集残留）
npx stylelint src/pages/order/list/index.vue

# Prettier 格式化
npx prettier --write src/pages/order/list/index.vue

# Prettier 格式检查（收集残留）
npx prettier --check src/pages/order/list/index.vue

# TypeScript 类型检查（含 .vue 文件）
npx vue-tsc --noEmit -p tsconfig.json --composite false
```
