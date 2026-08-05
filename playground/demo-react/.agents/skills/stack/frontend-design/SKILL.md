---
name: design
description: 技术方案设计专项技能。触发关键词：方案设计、技术设计、生成design.md。
metadata:
    author: zhongyuan10
    version: '1.1'
---

# 技术方案设计

## 职责边界

本技能仅负责**技术方案文档生成**，负责基于需求文档生成完整技术设计方案（design.md），含架构设计、组件设计、API集成设计、安全设计、性能优化。

## 前置依赖

执行前必须已加载：

- `requirements.md`（需求文档）
- `rules/工程结构.md`（项目目录规范）
- `rules/编码规范.md`（编码规范）

如需要使用具体的页面/功能模板，调用 **template-provider** skill 获取对应模板内容。

## 流程步骤

### 1. 读取需求文档

从 `.agents/changes/{变更目录}/requirements.md` 加载需求文档，重点识别：

- 「模板类型识别」中已勾选的类型
- 所有功能点及验收标准
- 接口文档章节的接口信息

### 2. 加载页面/功能模板

根据需求文档中勾选的模板类型，调用 **template-provider** skill 读取对应模板：

- 列表页开发 → `list-page-template.md`
- 详情页开发 → `detail-page-template.md`
- 各功能模板（导出、导入、数据源等）→ 对应 `*-feature-template.md`
- ...

### 3. 生成设计文档

使用 `reference/design-template.md` 模板结构生成 `design.md`，按实际需求填充各章节内容。

### 4. 输出产物

- 文件路径：`.agents/changes/{变更目录}/planning/design.md`
- 向用户展示设计文档
