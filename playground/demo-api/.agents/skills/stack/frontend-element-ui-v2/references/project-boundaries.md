# 项目边界与二次封装检查

开始改动前搜索：

- `src/components`、`components`、`packages` 中的 `el-` 二次封装。
- 全局 `Vue.use(ElementUI)`、按需组件注册、`babel-plugin-component` 和主题入口。
- 请求封装、权限指令、文件上传服务、统一表单校验和错误提示。
- 页面路由、权限菜单、状态管理和已有视觉回归测试。

修改优先级：

1. 遵守项目已有二次封装和设计 token。
2. 保持现有接口、权限、路由和用户可见行为。
3. 只在官方组件能力不足且有证据时新增封装。
4. 将新封装的 Props、Events、Slots、异常状态和示例写入项目资料或本 Skill 的候选更新。

如果项目同时存在 Element UI 2 和 Element Plus，必须先建立页面/模块边界和版本矩阵；不能仅凭目录名选择组件库。
