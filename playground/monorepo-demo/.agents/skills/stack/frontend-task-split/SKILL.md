---
name: task-split
description: 任务拆分专项技能。触发关键词：任务拆分、tasks.md、任务分解。
metadata:
    author: zhongyuan10
    version: '1.1'
---

# 任务拆分

## 职责边界

本技能仅负责**编码任务拆分与 tasks.md 生成**，负责基于设计文档将编码工作拆分为细粒度可执行任务，输出带复选框的tasks.md。

## 前置依赖

执行前必须已加载：

- `.agents/changes/{变更目录}/requirements.md`
- `.agents/changes/{变更目录}/design.md`

## 流程步骤

### 1. 读取设计文档

从设计文档中提取：

- 目录结构设计（确定需要新建/修改的文件清单）
- 分层架构
- 接口设计（确定 API 层任务数量）
- 组件设计（确定页面/组件任务数量）

### 2. 生成任务列表

按以下**标准分层顺序**拆分任务（根据实际需求删减不需要的层）：

1. **TypeScript 类型声明**（`src/types/modules/[module].ts`）
2. **枚举/常量声明**（如有枚举值）
3. **API 层封装**（`src/api/modules/[module].ts`，每个独立接口一个任务）
4. **Service 层封装**（`src/services/modules/[module].ts`）
5. **路由配置**（`src/router/modules/[module].ts`）
6. **页面开发**（每个页面一个任务，含 `index.vue` + `useConfig.ts`）
7. **子组件开发**（每个可复用子组件一个任务）
8. **工具函数**（如有自定义工具函数）
9. **接口联调**（替换 mock 数据，验证接口参数）

### 3. 任务粒度要求

- 每个任务应该是可操作和可测试的
- 包含带复选框的验收标准
- 定义任务依赖关系
- 添加技术细节和实现说明

### 4. 生成 tasks.md

使用 `reference/tasks-template.md` 模板结构生成 `tasks.md`，按实际需求填充各任务内容。

### 5. 输出产物

- 文件路径：`.agents/changes/{变更目录}/planning/tasks.md`
- 向用户展示任务清单和工作量评估
