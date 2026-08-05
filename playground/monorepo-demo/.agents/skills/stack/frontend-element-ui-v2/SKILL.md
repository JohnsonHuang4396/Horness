---
name: frontend-element-ui-v2
description: "在已经确认 Vue 2 和 element-ui 2.x 的项目中，完成 Element UI 的安装、按需引入、全局配置、主题、国际化、表单、表格、弹窗、上传、导航、反馈和兼容性改造。需要处理 element-ui、el-form、el-table、el-dialog、el-upload 或 Vue 2 组件库问题时使用；不得用于 Vue 3/Element Plus。"
---

# Element UI 2.x 完整工程能力

这是一个完整能力包。`SKILL.md` 负责路由和质量门禁，详细 API、组件示例、模板和版本资料位于同目录的 `api/`、`examples/`、`templates/`、`references/`、`checklists/` 和 `evals/`，必须按任务读取，不得只凭记忆猜 API。

## 触发边界

正向触发：

- 项目依赖明确包含 `element-ui`，或用户明确要求 Element UI 2.x。
- Vue 2 项目需要处理 `el-form`、`el-table`、`el-dialog`、`el-upload`、`el-select`、`el-pagination` 等组件。
- 需要处理 Element UI 的主题、locale、按需引入、组件事件或旧浏览器兼容。

负向触发：

- 只有 Vue 3、`element-plus` 或其他组件库证据，没有 Element UI 2.x 依赖。
- 仅有相似关键词但任务与前端组件无关。
- 需要升级组件库但没有版本、构建链和视觉回归证据；此时先走升级影响分析。

## 进入前检查

1. 读取项目根目录规则、`.agents/rules/`、当前任务和已有组件二次封装。
2. 从 `package.json`、锁文件、入口文件和构建配置确认 Vue 版本、`element-ui` 版本、全量/按需引入、locale、主题和 Babel 配置；不能把 Element Plus 的 API 当成 Element UI API。
3. 检查项目的 `components/`、`utils/`、主题变量、表单校验封装、请求封装和权限指令，优先复用项目已有边界。
4. 读取与任务对应的资料：安装/按需引入读 `examples/guide/installation.md` 和 `templates/installation.md`；表单读 `api/props-and-events.md`、`examples/components/form.md`；表格读 `examples/components/table.md`；弹窗读 `examples/components/dialog.md` 和 `drawer.md`；上传读 `examples/components/upload.md`；主题、locale 和全局配置读 `examples/guide/theme.md`、`i18n.md`、`global-config.md`。
5. 记录事实、推断、冲突和未知项；读取文档不等于验证通过。

## 版本和安装边界

- Element UI 2.x 面向 Vue 2 Options API，组件写法使用 `data`、`methods`、`computed` 和 Vue 2 的 `v-model` 语义。
- 修改前确认 Node/npm 只是业务项目的构建运行时；Harness 自身版本不应强制升级业务项目 Node。
- 全量引入和按需引入只能选择一种与项目现状一致的方案。按需引入需要核对 Babel、样式和组件注册；没有构建验证时不能声称包体优化完成。
- 不要在 Vue 2 项目引入 Element Plus，也不要把 `El*`、Vue 3 Composition API 或 Element Plus 事件名混入 Element UI 2.x。
- 主题、locale、二次封装和全局 `Vue.prototype` 修改必须记录影响范围，避免局部页面绕过统一入口。

## 任务路由

| 任务 | 先读资料 | 关键检查 |
| --- | --- | --- |
| 安装、入口、按需引入 | `examples/guide/installation.md`、`quick-start.md`、`templates/installation.md` | Vue/Element UI 版本、Babel、样式、注册方式 |
| 全局配置、主题、国际化 | `api/global-config.md`、`examples/guide/global-config.md`、`theme.md`、`i18n.md` | locale、变量覆盖、构建产物、全局副作用 |
| 表单和输入 | `api/props-and-events.md`、`examples/components/form.md`、`input.md` | rules、`validate`、异步校验、错误状态、提交防重复 |
| 表格、分页、树 | `api/component-api.md`、`examples/components/table.md`、`pagination.md`、`tree.md` | row-key、分页边界、空/加载/错误、事件参数、性能 |
| 弹窗、抽屉、反馈 | `examples/components/dialog.md`、`drawer.md`、`message.md`、`message-box.md`、`notification.md` | 焦点、关闭确认、异步提交、重复通知、销毁 |
| 上传 | `examples/components/upload.md`、`api/props-and-events.md` | 类型/大小、鉴权、服务端错误、重复提交、敏感信息 |
| 导航和选择 | `examples/components/menu.md`、`tabs.md`、`select.md`、`cascader.md`、`dropdown.md` | 路由同步、键盘、远程搜索、空结果、权限 |
| 视觉和兼容 | `references/compatibility.md`、`examples/guide/theme.md` | Vue 2、旧浏览器、样式覆盖和视觉回归 |

## 执行流程

1. 明确目标、允许修改范围、当前阶段、风险模式、恢复点和验收命令。
2. 建立组件调用链：页面/二次封装 → Element UI 组件 → 请求/权限/状态 → 测试和构建入口。
3. 只修改完成目标所需的文件；发现版本、API、权限或接口契约冲突时暂停并更新影响记录。
4. 对表单、表格、弹窗、上传和异步请求同时处理成功、加载、空数据、错误、禁用、取消、重复提交和网络慢等状态。
5. 按风险选择最窄验证：先静态检查和已有组件测试，再执行项目声明的 lint、构建、单元或浏览器验证；没有执行的命令标记为未观察。
6. 输出中文回执：已读取、已决定、实际修改、产出文件、验证证据、未知项、风险、回退路径和下一步。

## 质量门禁

- 每个 API 结论能回到本 Bundle 的 API/示例、项目源代码或真实命令输出。
- 表单包含校验触发、错误展示和提交防重复；表格包含 key、分页、空/加载/错误；弹窗包含焦点和关闭行为；上传包含类型、大小、鉴权和服务端错误处理。
- 不修改 Vue 版本、Element UI 大版本、主题入口或二次封装边界，除非任务明确要求并完成迁移评估。
- 不把示例中的 Mock 地址、token、内部域名或假数据复制到正式代码。
- 验证报告区分 observed、unobserved、blocked；不以“读取了文档”替代构建或运行证据。

## 失败与回退

- 版本或依赖不符：回退到项目发现/需求分析，保留原实现。
- API、样式或组件状态不符：回退到组件方案设计，先读取对应 API 和示例。
- 构建、lint 或测试失败：按失败类型回到实现或验证阶段，保留命令、退出码和完整输出路径。
- 用户已有二次封装或规则冲突：不覆盖，记录冲突并请求确认。

## 产出要求

至少产出受影响文件清单、组件/API 变更、状态和兼容性说明、验证命令与结果、未知项和回退路径。涉及安装、主题或升级时，同时更新项目自己的入口文档或迁移记录。

详细资料入口：

- API：`api/component-api.md`、`api/props-and-events.md`、`api/global-config.md`
- 指南：`examples/guide/installation.md`、`quick-start.md`、`global-config.md`、`i18n.md`、`theme.md`
- 组件：`examples/components/` 下的组件示例
- 模板：`templates/installation.md`、`project-setup.md`、`component-usage.md`
- 工程边界：`references/compatibility.md`、`references/project-boundaries.md`
- 验收：`checklists/acceptance.md`、`evals/positive-cases.json`、`evals/negative-cases.json`
