# 设计文档

> **智能详设模板**: 本模板会根据 Requirements 中勾选的模板类型，自动整合对应的页面模板（Page
> Template）和功能模板（Feature Template）

## 文档信息

- **需求名称**: [填写需求名称]
- **设计日期**: [YYYY-MM-DD]
- **关联需求文档**: [需求文档路径]

---

## 架构设计

### 技术栈选择

[说明本次需求如何遵循项目技术架构约束]

### 目录结构设计

具体实现严格按照目录结构设计来组织代码

[实现将如何遵循项目组织约定，严格遵守 **`.agents\rules\工程结构.md`** 规范来组织]

### 数据流设计

[描述数据在组件间的流动方式]

- API调用 → Service层处理（强制）→ 组件状态更新 → UI渲染
- 全局状态使用 Pinia Store 管理
- 局部状态使用 ref/reactive 管理

---

## 组件设计

### 核心组件清单

根据 Requirements 中勾选的页面类型，以下是对应的组件设计：

#### 通用组件说明

所有页面组件必须：

1. 使用 `<script setup>` 语法
2. 通过 `defineOptions({name: 'ComponentName'})` 定义组件名称
3. Props 使用 `defineProps<IProps>()` 定义类型
4. Emits 使用 `defineEmits<IEmits>()` 定义类型
5. 配置数据抽离到 useConfig.ts

#### UI 组件选择优先级

- **⭐ 重要：严格遵循以下优先级顺序**
- **⭐ 重要：除了自定义组件外，其他组件库中的组件已全局注册，无需手动引入**
- **⭐ 重要：mdms-fe 组件库已经将 mdesign3 的功能封装入内，在使用 mdesign3 组件提供的能力时，可以直接通过 mdms-fe 进行导入**

> import { MdMessage, MdMessageBox } from 'mdms-fe';

```
优先级： mcsp 业务组件 > mdms-fe > mdesign3 > 自定义组件
```

#### 第一优先级：mcsp 业务组件

- **组件前缀**: `mcsp`（如 `mcsp-export`、`mcsp-import-dialog`）
- **说明**: 美云销系统业务组件库
- **文档**: 参考 **ui-mcsp** skill

#### 第二优先级：mdms-fe

- **组件前缀**: `mdms`（如 `mdms-selector`、`mdms-date-range-picker`、`mdms-dialog`等）
- **说明**: 公共 UI 组件库
- **文档**: 参考 **ui-mdms-fe** skill

#### 第三优先级：mdesign3

- **组件前缀**: `md-`（如 `md-button`、`md-input`、`md-dialog`）
- **说明**: 基于 element-plus 源码改造，用法与 element-plus 一致
- **文档**: 参考 element-plus 官方文档

#### 第四优先级：自定义组件

- **说明**: 仅在前几个组件库都无法满足需求时才自定义开发
- **要求**: 必须充分复用，放在 `src/components/` 目录

---

## 模块详细设计

### 自动决策说明

**根据 Requirements 文档中「模板类型识别」部分勾选的类型，AI 将自动整合以下对应的详设模板：**

#### 页面模板（Page Template）- 完整页面开发设计

- ✅ **列表页开发** → 引入 `list-page-template.md` 的完整页面设计
- ✅ **详情页开发** → 引入 `detail-page-template.md` 的完整页面设计

#### 功能模板（Feature Template）- 功能模块开发指导

- ✅ **导出功能** → 引入 `export-feature-template.md` 的功能开发指导
- ✅ **导入功能** → 引入 `import-dialog-feature-template.md` 的功能开发指导
- ✅ **数据源功能** → 引入 `selector-datasource-feature-template.md` 的功能开发指导
- ✅ **地址选择功能** → 引入 `address-feature-template.md` 的功能开发指导
- ✅ **地址级联选择功能** → 引入 `address-cascader-feature-template.md` 的功能开发指导
- ✅ **审批流功能** → 引入 `flow-feature-template.md` 的功能开发指导
- ✅ **脱敏文本功能** → 引入 `mask-text-feature-template.md` 的功能开发指导
- ✅ **表格上传功能** → 引入 `table-upload-feature-template.md` 的功能开发指导
- ✅ **上传功能** → 引入 `upload-feature-template.md` 的功能开发指导
- ✅ **富文本功能** → 引入 `rich-text-feature-template.md` 的功能开发指导

---

**重要：在读取模版进行设计的过程中，模版中如提供了最佳实践或者demo示例，可以直接按照提供的代码来设计和开发**

### 模块1: [根据需求自动插入对应模板的详细设计]

> **暂不实现标记**：如需求中已标记"暂不实现"的功能点，设计文档中对应部分也需标注 `【暂不实现】`，评审时将自动豁免

<!--
  AI Assistant 请在这里插入对应的模板内容：
  1. 分析 Requirements 文档中勾选的页面类型
  2. 读取对应的模板文件
  3. 将模板内容整合到这里
  4. 如果有多个类型勾选，按顺序依次插入
  5. 如需求中有"暂不实现"标记，设计时也需同步标注
-->

**提示给 AI Assistant**:

```
请执行以下步骤：
1. 读取 Requirements 文档，识别「模板类型识别」中勾选的类型
2. 根据勾选情况，依次读取对应的模板文件：

   页面模板（Page Template）- 完整页面开发：
   - 列表页开发 → list-page-template.md
   - 详情页开发 → detail-page-template.md

   功能模板（Feature Template）- 功能模块开发：
   - 导出功能 → export-feature-template.md
   - 导入功能 → import-dialog-feature-template.md
   - 数据源功能 → selector-datasource-feature-template.md
   - 地址选择功能 → address-feature-template.md
   - 地址级联选择功能 → address-cascader-feature-template.md
   - 审批流功能 → flow-feature-template.md
   - 脱敏文本功能 → mask-text-feature-template.md
   - 表格上传功能 → table-upload-feature-template.md
   - 上传功能 → upload-feature-template.md
   - 富文本功能 → rich-text-feature-template.md

3. 将模板内容按顺序整合到「模块详细设计」部分
4. 保持每个模板的完整结构，包括所有表格、代码示例等
5. 为每个模块添加明确的分隔和标题
```

---

### 表单控件类型映射

| 类型            | 组件                   | 描述           |
| --------------- | ---------------------- | -------------- |
| input           | md-input               | 输入框         |
| text            | mdms-plain-text        | 文本展示       |
| multiLineSearch | mdms-multi-line-search | 多行输入框     |
| selectInput     | mdms-select-input      | 左下拉右输入   |
| selectDate      | mdms-select-date       | 左下拉右时间   |
| select          | mdms-selector          | 下拉选择框     |
| numberInput     | md-input-number        | 数字输入框     |
| date            | md-date-picker         | 日期选择器     |
| dateRange       | mdms-date-range-picker | 日期范围选择器 |
| switch          | md-switch              | 开关           |
| checkboxGroup   | mdms-checkbox-group    | 多选框组       |
| radioGroup      | mdms-radio-group       | 单选框组       |
| slot            | 插槽                   | 自定义插槽     |

---

## 分层设计

> **暂不实现标记**：如需求中已标记"暂不实现"的功能点，对应的 API/Service/Types 设计需标注
> `// 暂不实现`，评审时将自动豁免

### API 层设计 & Service 层设计 & Types 层设计 & Config层

[根据`.agents\wiki\编码规范\API&Service&Type&config开发.md`规范进行设计后自动填充]

### 视图层调用规范

[根据`.agents\wiki\编码规范\视图层开发.md`规范进行设计后自动填充]

```typescript
import type { TableListParams, ApiQueryOption } from 'mdms-fe';
import { getListService } from '@/services/modules/[module]Service';

const getList = (restParams: TableListParams, pagination: ApiQueryOption) => {
    return getListService({ restParams, pagination });
};
```

**注意**：请求已全局统一处理错误，无需额外 try-catch，也无需判断 `code === '000000'`。

---

### 枚举定义

[根据`.agents\wiki\编码规范\枚举定义.md`规范进行设计后自动填充]

### 图标使用<可选，当需求中需要时>

[根据`.agents\wiki\系统解决方案\icon图标.md`进行设计后自动填充]

## 安全设计

### 按钮权限控制

所有操作按钮必须使用权限控制，`displayed` 和 `disabled` 同时配置：

```vue
<template>
    <md-button
        v-if="displayed.action"
        :disabled="disabled.action"
        @click="handleAction"
    >
        操作
    </md-button>
</template>

<script setup lang="ts">
    import { useButtonPermission } from 'snippets/composables/useButtonPermission';
    const { displayed, disabled } = useButtonPermission(['action']);
</script>
```

### 路由控制菜单权限

[根据`.agents\wiki\编码规范\路由声明.md`规范进行设计后自动填充]

## 性能优化

1. **代码分割**：路由懒加载（`() => import(...)`）
2. **列表优化**：大数据量使用虚拟滚动
3. **防抖节流**：搜索输入使用防抖
4. **接口并发**：多个独立接口使用 `Promise.all`
5. **计算属性缓存**：合理使用 `computed`

## 功能交互说明

**此部分在实际设计文档中要保留，提供对代码生成过程中的重要指引**

### 表单控件类型映射表

表单控件支持的类型（type）与对应组件的映射关系如下：

| 类型            | 组件                              | 描述                                   |
| --------------- | --------------------------------- | -------------------------------------- |
| input           | md-input                          | 输入框                                 |
| text            | mdms-plain-text                   | 文本，支持超出省略，tooltip 复制等功能 |
| multiLineSearch | mdms-multi-line-search            | 多行输入框，点击放大框支持多行输入     |
| selectInput     | mdms-select-input                 | 左边下拉右边输入框                     |
| selectDate      | mdms-select-date                  | 左边下拉右边时间选择器                 |
| select          | mdms-selector                     | 多功能下拉选择框                       |
| numberInput     | md-input-number                   | 数字输入框                             |
| time            | md-time-select                    | 时间选择器                             |
| date            | md-date-picker                    | 日期选择器                             |
| dateRange       | mdms-date-range-picker            | 分开时间范围选择器                     |
| switch          | md-switch                         | 滑块                                   |
| checkboxGroup   | mdms-checkbox-group               | 多选框                                 |
| radioGroup      | mdms-radio-group                  | 单选框                                 |
| component       | 取 bindComponent 属性中传入的组件 | 动态组件                               |
| slot            | 插槽                              | 用 slotName 指定的插槽渲染             |
| 默认值          | div                               |                                        |

特殊说明：textarea 文本域，使用

```ts
{
  type: 'input',
  prop: 'auditOpinion',
  label: '审核意见',
  attributes: {
    type: 'textarea',
    required: true,
    maxlength: 500,
    rows: 4,
    placeholder: '请输入',
  },
  span: 24,
}
```

### 表单搜索初始值赋值

```vue
<template>
    <mdms-query-bar
        ref="queryBarRef"
        v-model="queryParams"
        mode="drawer/grid-drawer/quick-search"
        :query-item-list="queryColumns"
        :drawer-config="grid - drawer - config"
        :config="queryBarModeConfig"
        @search="querySearch"
    >
    </mdms-query-bar>
</template>
<script setup>
    const queryBarModeConfig = computed(() => {
        return {
            initDrawerValue: {},//drawer/grid-drawer
            resetDrawerValue: {},//drawer/grid-drawer
            initGridValue:{}，//grid-drawer
            resetGridValue:{},//grid-drawer
            initValue:{},//quick-search
            resetValue:{},//quick-search
        };
    });
</script>
```

## 总结

本设计文档提供了智能化的模板决策机制，AI Assistant 会根据需求自动选择和组合合适的详设模板，确保：

1. ✅ **完整性**: 所有必要的设计细节都被覆盖
2. ✅ **一致性**: 遵循项目统一的设计规范和编码标准
3. ✅ **可维护性**: 清晰的结构便于后续维护和更新
4. ✅ **可追溯性**: 设计决策有明确的依据和参考

---
