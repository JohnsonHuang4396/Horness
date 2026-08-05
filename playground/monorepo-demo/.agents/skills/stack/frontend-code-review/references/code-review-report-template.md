# 代码审查报告：{需求名称} v{N}

## 基本信息

| 项目      | 内容                         |
| --------- | ---------------------------- |
| 审查日期  | YYYY-MM-DD                   |
| Git 分支  | `feature/xxx`                |
| 基准分支  | `master`                     |
| P0 问题数 | {N} 个                       |
| P1 问题数 | {N} 个                       |
| P2 问题数 | {N} 个                       |
| 评审结论  | APPROVED / REVISION REQUIRED |

---

## 文件变更清单

| 文件路径                         | 变更类型 | 说明         |
| -------------------------------- | -------- | ------------ |
| `src/pages/order/list/index.vue` | 新增     | 订单列表页面 |
| `src/api/modules/order.ts`       | 新增     | 订单 API     |
| `src/router/modules/order.ts`    | 修改     | 新增列表路由 |

---

## 问题清单

### P0 — 必须修复（阻塞上线）

#### 【P0-01】{问题标题}

- **位置**：`src/pages/order/list/index.vue` 第 XX 行
- **问题**：{清晰描述违反了哪条规范}
- **规范引用**：check-standard.md S28 / check-quality.md 一 / check-security.md X.X
- **问题代码**：
    ```ts
    // 错误写法
    ```
- **修复代码**：
    ```ts
    // 正确写法
    ```

---

### P1 — 必须修复（阻塞上线）

#### 【P1-01】{问题标题}

- **位置**：`src/services/modules/order.ts` 第 XX 行
- **问题**：{清晰描述违反了哪条规范}
- **规范引用**：check-standard.md S{N}
- **问题代码**：
    ```ts
    // 错误写法
    ```
- **修复代码**：
    ```ts
    // 正确写法
    ```

---

### P2 — 建议优化（不阻塞上线）

#### 【P2-01】{问题标题}

- **位置**：`src/pages/order/list/index.vue` 第 XX 行
- **问题**：{描述可优化点}
- **规范引用**：check-quality.md {章节}
- **修复建议**：{简要说明如何优化}
