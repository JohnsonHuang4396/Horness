# 编码规范检查清单

逐项检查，不得跳过。每项包含：触发条件、依据、禁止行为、问题等级。

---

## S01 — 页面文件目录

- **触发条件**：变更文件包含 `.vue` 页面文件
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则
- **检查**：页面入口文件必须位于 `src/pages/[模块]/[功能]/index.vue`，入口文件名必须为 `index.vue`
- **禁止**：禁止将页面文件放在 `src/pages/` 以外的目录；禁止入口文件使用 `index.vue` 以外的命名
- **等级**：P0

---

## S02 — API 文件目录

- **触发条件**：变更文件包含 API 层文件
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则
- **检查**：API 文件必须位于 `src/api/modules/[module].ts`，文件名 camelCase，且必须在 `src/api/modules/index.ts` 中导出
- **禁止**：禁止将 API 文件散落在 `src/pages/` 或其他目录下
- **等级**：P0

---

## S03 — Service 文件目录

- **触发条件**：变更文件包含 Service 层文件
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则
- **检查**：Service 文件必须位于 `src/services/modules/[module].ts`，文件名与对应 `api/modules/` 文件名一一对应
- **禁止**：禁止将 Service 文件散落在 `src/pages/` 或其他目录下
- **等级**：P0

---

## S04 — 类型文件目录

- **触发条件**：变更文件包含类型定义文件
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则
- **检查**：类型文件必须位于 `src/types/modules/[module].ts`
- **禁止**：禁止将类型定义内联在页面文件或 API 文件中（公共类型必须抽离）
- **等级**：P0

---

## S05 — 枚举文件目录

- **触发条件**：变更文件包含枚举定义文件
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则
- **检查**：枚举文件必须位于 `src/enum/modules/[module].ts`，文件名 camelCase
- **禁止**：禁止将枚举定义散落在页面文件或类型文件中
- **等级**：P0

---

## S06 — 页面私有组件目录

- **触发条件**：变更文件包含页面私有子组件（仅在当前页面使用的组件）
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则
- **检查**：页面私有组件必须位于 `src/pages/[模块]/[功能]/components/` 下，私有组件不得被其他模块引用
- **禁止**：禁止将私有组件直接放在 `src/pages/[模块]/[功能]/` 根目录下；禁止跨模块引用私有组件
- **等级**：P0

---

## S07 — useConfig.ts 目录与命名

- **触发条件**：变更文件包含配置文件（表单/表格列定义等）
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则；`.agents/rules/编码规范.md` — 配置与逻辑分离
- **检查**：配置文件必须位于 `src/pages/[模块]/[功能]/useConfig.ts`，文件名固定为 `useConfig.ts`
- **禁止**：禁止使用其他命名（如 `config.ts`、`tableConfig.ts`）；禁止将表单/表格列配置直接写在 `index.vue` 的
  `<script setup>` 中
- **等级**：P0

---

## S08 — 路由配置文件目录

- **触发条件**：变更文件包含路由配置文件
- **依据**：`.agents/rules/工程结构.md` — 强制目录规则
- **检查**：路由文件必须位于 `src/router/modules/[module].ts`，路由自动导入，无需手动注册
- **禁止**：禁止将路由配置写在页面文件或其他非路由目录中
- **等级**：P0

---

## S09 — 文件命名（camelCase）

- **触发条件**：所有新增文件
- **依据**：`.agents/rules/编码规范.md` — 命名规范
- **检查**：所有文件名（`.ts`、`.vue`、目录名）必须使用 camelCase（小驼峰）
- **禁止**：禁止使用 PascalCase（`OrderList.vue`）或 kebab-case（`order-list.vue`）命名文件
- **等级**：P0

---

## S10 — Vue 组件声明组件名

- **触发条件**：变更文件包含 `.vue` 文件
- **依据**：`.agents/rules/编码规范.md` — 命名规范
- **检查**：每个 `.vue` 文件必须在 `<script setup>` 中通过 `defineOptions({ name: 'XxxYyy' })`
  显式声明组件名，组件名使用 PascalCase
- **禁止**：禁止省略 `defineOptions` 或 `name` 字段
- **等级**：P0

---

## S11 — 接口命名使用 I 前缀

- **触发条件**：变更文件包含 TypeScript interface 定义
- **依据**：`.agents/rules/编码规范.md` — 命名规范
- **检查**：TypeScript interface 名称必须使用 PascalCase + `I` 前缀（如 `IOrderInfo`）
- **禁止**：禁止接口名不加 `I` 前缀（如直接命名为 `OrderInfo`）
- **等级**：P1

---

## S12 — 类型别名命名使用 T 前缀

- **触发条件**：变更文件包含 TypeScript type 别名定义
- **依据**：`.agents/rules/编码规范.md` — 命名规范
- **检查**：TypeScript type 别名必须使用 PascalCase + `T` 前缀（如 `TOrderStatus`）
- **禁止**：禁止类型别名不加 `T` 前缀
- **等级**：P1

---

## S13 — 函数命名动词开头

- **触发条件**：变更文件包含函数定义
- **依据**：`.agents/rules/编码规范.md` — 命名规范
- **检查**：函数名必须使用 camelCase 且动词开头；事件处理函数用 `handle` 前缀（`handleClick`）；数据获取函数用
  `fetch/get` 前缀（`fetchOrderList`）；提交函数用 `submit` 前缀（`submitForm`）
- **禁止**：禁止使用名词或无动词前缀的函数名（如 `orderList()`、`userData()`）
- **等级**：P2

---

## S14 — 布尔变量命名前缀

- **触发条件**：变更文件包含布尔类型变量定义
- **依据**：`.agents/rules/编码规范.md` — 命名规范
- **检查**：布尔类型变量必须使用 `is/has/can` 前缀（`isVisible`、`hasPermission`、`canSubmit`）
- **禁止**：禁止布尔变量不加语义前缀（如 `loading`、`visible`、`show`）
- **等级**：P2

---

## S15 — 常量命名大写蛇形

- **触发条件**：变更文件包含常量定义（`const` 声明的非响应式固定值）
- **依据**：`.agents/rules/编码规范.md` — 命名规范
- **检查**：常量必须使用 UPPER_SNAKE_CASE（`MAX_PAGE_SIZE`、`DEFAULT_TIMEOUT`）
- **禁止**：禁止常量使用 camelCase 或 PascalCase
- **等级**：P1

---

## S16 — CSS 类名 BEM 规范

- **触发条件**：变更文件包含 `<style>` 块或 `.scss` 文件
- **依据**：`.agents/rules/编码规范.md` — 命名规范；`.agents/wiki/编码规范/视图层开发.md` — CSS/SCSS 规范
- **检查**：CSS 类名必须使用 BEM 规范：Block 用连字符（`.order-list`），Element 用双下划线（`.order-list__header`），Modifier 用双连字符（`.order-list--active`）
- **禁止**：禁止使用驼峰命名 CSS 类（`.orderList`、`.orderListHeader`）
- **等级**：P0

---

## S17 — SCSS 嵌套深度

- **触发条件**：变更文件包含 `.scss` 文件或 `<style lang="scss">` 块
- **依据**：`.agents/wiki/编码规范/视图层开发.md` — 代码质量约束
- **检查**：SCSS 嵌套深度不超过 5 层
- **禁止**：禁止超过 5 层嵌套（可维护性差，难以定位样式来源）
- **等级**：P1

---

## S18 — 导入顺序

- **触发条件**：变更文件包含 `import` 语句
- **依据**：`.agents/rules/编码规范.md` — 导入规范
- **检查**：导入顺序必须为：外部依赖（第三方库）→ snippets 共享模块 → `@/api` → `@/services` → `@/types` → `@/utils` →
  `@/components` → 当前目录（相对路径）→ 样式导入
- **禁止**：禁止打乱导入顺序（如样式导入放在第三方库前面）
- **等级**：P2

---

## S19 — 禁止重复导入已自动导入的 API

- **触发条件**：变更文件包含 `import` 语句
- **依据**：`.agents/rules/编码规范.md` — 导入规范；`src/auto-imports.d.ts`
- **检查**：查阅 `src/auto-imports.d.ts`，已自动全局注入的 API（`ref`、`computed`、`reactive`、`watch`、`onMounted`
  等）不得重复手动 import
- **禁止**：禁止出现 `import { ref, computed } from 'vue'` 等重复导入已自动注入 API 的语句
- **等级**：P0

---

## S20 — 类型导入使用 import type

- **触发条件**：变更文件包含类型的 import 语句
- **依据**：`.agents/rules/编码规范.md` — 导入规范
- **检查**：导入纯类型时必须使用 `import type` 语法（`import type { IOrderInfo } from '@/types/modules/order'`）
- **禁止**：禁止使用普通 `import` 导入仅用于类型标注的接口/类型别名
- **等级**：P1

---

## S21 — 禁止使用 any 类型

- **触发条件**：所有变更文件
- **依据**：`.agents/rules/编码规范.md` — TypeScript 约束；`.agents/rules/工程结构.md` — 红线
- **检查**：所有变量、函数参数、返回值必须有明确的 TypeScript 类型，不得出现 `any`
- **禁止**：禁止使用 `any` 类型显式声明，不包括隐式推断的情况
- **等级**：P0

---

## S22 — 禁止非空断言 !

- **触发条件**：所有变更文件
- **依据**：`.agents/rules/编码规范.md` — TypeScript 约束；`.agents/wiki/编码规范/API&Service&Type&config开发.md` —
  Type 层约束
- **检查**：访问可能为 null/undefined 的值时，必须使用可选链 `?.` 或空值合并 `??`，不得使用非空断言 `!`
- **禁止**：禁止使用非空断言操作符 `!`（如 `ref.value!.name`）
- **等级**：P0

---

## S23 — 类型断言使用 as 语法

- **触发条件**：变更文件包含类型断言
- **依据**：`.agents/rules/编码规范.md` — TypeScript 约束
- **检查**：类型断言必须使用 `as` 语法
- **禁止**：禁止使用尖括号语法进行类型断言（`<IOrderInfo>data`）
- **等级**：P2

---

## S24 — JSON.parse 必须包裹 try-catch

- **触发条件**：变更文件包含 `JSON.parse()` 调用
- **依据**：`.agents/rules/编码规范.md` — TypeScript 约束
- **检查**：所有 `JSON.parse()` 调用必须包裹
  `try-catch`，并提供兜底默认值（适用于从 localStorage、sessionStorage、URL 参数、接口响应中读取后解析的场景）
- **禁止**：禁止裸调用 `JSON.parse()`，不得省略异常捕获和兜底值
- **等级**：P0

---

## S25 — 路由参数禁止使用 params

- **触发条件**：变更文件包含路由跳转代码（`router.push`、`router.replace`）
- **依据**：`.agents/wiki/编码规范/路由声明.md` — 约束要点；`.agents/rules/工程结构.md` — 红线
- **检查**：路由跳转传参必须使用 `query`（`router.push({ path: '/order/detail', query: { id } })`）
- **禁止**：禁止使用 `params` 传递路由参数（刷新后参数丢失）
- **等级**：P0

---

## S26 — 路由组件使用动态导入

- **触发条件**：变更文件包含路由配置文件（`src/router/modules/`）
- **依据**：`.agents/wiki/编码规范/路由声明.md` — 约束要点
- **检查**：路由 `component` 字段必须使用动态导入（`() => import('@/pages/...')`）
- **禁止**：禁止使用同步静态 `import` 导入路由组件
- **等级**：P1

---

## S27 — 路由 meta.zhCNTitle 必填

- **触发条件**：变更文件包含路由配置文件（`src/router/modules/`）
- **依据**：`.agents/wiki/编码规范/路由声明.md` — 约束要点
- **检查**：每条路由的 `meta` 对象必须包含 `zhCNTitle` 字段，用于面包屑/标签页显示
- **禁止**：禁止省略 `meta.zhCNTitle`
- **等级**：P0

---

## S28 — 页面层禁止直接调用 API 层

- **触发条件**：变更文件包含页面文件（`src/pages/`）中的 `import` 语句
- **依据**：`.agents/rules/工程结构.md` — 分层架构约束；`.agents/rules/编码规范.md` — 分层调用
- **检查**：页面层（`src/pages/`）只能导入和调用 Service 层（`src/services/`），不得直接导入 API 层（`src/api/`）
- **禁止**：禁止在 `src/pages/` 中出现 `import ... from '@/api/...'` 的语句
- **等级**：P0

---

## S29 — 禁止判断 code === '000000'

- **触发条件**：变更文件包含接口调用代码
- **依据**：`.agents/rules/编码规范.md` — 错误处理；`.agents/wiki/编码规范/API&Service&Type&config开发.md` — API 层约束
- **检查**：接口调用后直接使用返回数据，不得对业务状态码进行额外判断
- **禁止**：禁止出现 `if (res.code === '000000')` 或类似的业务状态码判断（系统全局已统一处理）
- **等级**：P0

---

## S30 — 禁止额外编写接口 loading 逻辑

- **触发条件**：变更文件包含接口调用代码
- **依据**：`.agents/rules/编码规范.md` — 错误处理；`.agents/wiki/编码规范/API&Service&Type&config开发.md` — API 层约束
- **检查**：接口请求的 loading 效果由系统全局统一控制，不得额外声明 loading 状态变量或手动控制 loading 显示/隐藏
- **禁止**：禁止出现因接口请求而新增的 `isLoading`、`loading` 等变量及其控制逻辑
- **等级**：P0

---

## S31 — API 路径前缀使用配置常量

- **触发条件**：变更文件包含 HTTP 请求代码（`src/api/modules/`）
- **依据**：`.agents/rules/工程结构.md` — 红线；`.agents/wiki/编码规范/API&Service&Type&config开发.md` — API 层约束
- **检查**：API 请求的路径前缀必须取自 `CONF`（如 `CONF.orcApiPrefix`）等配置常量
- **禁止**：禁止在 API 路径中硬编码任何前缀字符串（如 `/orc-api/`、`/api/`）
- **等级**：P0

---

## S32 — .vue 文件块顺序

- **触发条件**：变更文件包含 `.vue` 文件
- **依据**：`.agents/wiki/编码规范/视图层开发.md` — .vue 文件块顺序
- **检查**：`.vue` 文件必须按 `<template>` → `<script setup lang="ts">` → `<style lang="scss" scoped>` 顺序组织
- **禁止**：禁止将 `<script>` 放置于 `<template>` 之前
- **等级**：P1

---

## S33 — script setup 内部声明顺序

- **触发条件**：变更文件包含 `.vue` 文件的 `<script setup>` 块
- **依据**：`.agents/wiki/编码规范/视图层开发.md` — script setup 内部顺序
- **检查**：`<script setup>` 内部顺序必须为：① 导入依赖 → ② `defineOptions` → ③ Props/Emits → ④ 响应式数据 →
  ⑤ 计算属性 → ⑥ 方法定义 → ⑦ 生命周期钩子 → ⑧ watch 监听
- **禁止**：禁止 `defineOptions` 不在最前（导入之后）；禁止将生命周期钩子混插在方法定义中间
- **等级**：P1

---

## S34 — 禁止保留废弃注释代码

- **触发条件**：所有变更文件
- **依据**：`.agents/rules/编码规范.md` — 注释规范
- **检查**：代码中不得出现注释掉的废弃代码块；不得出现无意义注释（如 `// 处理数据`、`// TODO` 遗留）
- **禁止**：禁止提交包含注释掉的旧代码；禁止无意义的占位注释
- **等级**：P1

---

## S35 — 枚举值命名规范

- **触发条件**：变更文件包含枚举定义
- **依据**：`.agents/wiki/编码规范/枚举定义.md`
- **检查**：枚举名称使用 PascalCase + `Enum`
  后缀（`OrderStatusEnum`）；枚举成员使用全大写字符串或有语义的数字，禁止使用无意义纯数字
- **禁止**：禁止枚举成员使用无意义纯数字（如 `STATUS_A = 1`）；禁止枚举名不加 `Enum` 后缀
- **等级**：P1
