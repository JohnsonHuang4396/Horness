# Components Overview / 组件概览

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/overview

## Instructions

Element UI 2.x provides 60+ components organized into the following categories.

### Basic Components / 基础组件
- **Layout** - 布局 (`el-row`, `el-col`)
- **Container** - 布局容器 (`el-container`, `el-header`, `el-aside`, `el-main`, `el-footer`)
- **Color** - 色彩
- **Typography** - 字体
- **Border** - 边框
- **Icon** - 图标 (`el-icon-*`)
- **Button** - 按钮 (`el-button`, `el-button-group`)
- **Link** - 文字链接 (`el-link`)

### Form Components / 表单组件
- **Radio** - 单选框 (`el-radio`, `el-radio-group`, `el-radio-button`)
- **Checkbox** - 多选框 (`el-checkbox`, `el-checkbox-group`, `el-checkbox-button`)
- **Input** - 输入框 (`el-input`, `el-input-number`)
- **Select** - 选择器 (`el-select`, `el-option`, `el-option-group`)
- **Cascader** - 级联选择器 (`el-cascader`)
- **Switch** - 开关 (`el-switch`)
- **Slider** - 滑块 (`el-slider`)
- **TimePicker** - 时间选择器 (`el-time-picker`, `el-time-select`)
- **DatePicker** - 日期选择器 (`el-date-picker`)
- **DateTimePicker** - 日期时间选择器 (`el-date-picker` with type="datetime")
- **Upload** - 上传 (`el-upload`)
- **Rate** - 评分 (`el-rate`)
- **ColorPicker** - 颜色选择器 (`el-color-picker`)
- **Transfer** - 穿梭框 (`el-transfer`)
- **Form** - 表单 (`el-form`, `el-form-item`)

### Data Display / 数据展示
- **Table** - 表格 (`el-table`, `el-table-column`)
- **Tag** - 标签 (`el-tag`)
- **Progress** - 进度条 (`el-progress`)
- **Tree** - 树形控件 (`el-tree`)
- **Pagination** - 分页 (`el-pagination`)
- **Badge** - 标记 (`el-badge`)
- **Avatar** - 头像 (`el-avatar`)
- **Skeleton** - 骨架屏 (`el-skeleton`)
- **Empty** - 空状态 (`el-empty`)
- **Descriptions** - 描述列表 (`el-descriptions`, `el-descriptions-item`)
- **Result** - 结果 (`el-result`)
- **Statistic** - 统计数值 (`el-statistic`)
- **Card** - 卡片 (`el-card`)
- **Carousel** - 走马灯 (`el-carousel`, `el-carousel-item`)
- **Collapse** - 折叠面板 (`el-collapse`, `el-collapse-item`)
- **Timeline** - 时间线 (`el-timeline`, `el-timeline-item`)
- **Divider** - 分割线 (`el-divider`)
- **Calendar** - 日历 (`el-calendar`)
- **Image** - 图片 (`el-image`)

### Navigation / 导航
- **NavMenu** - 导航菜单 (`el-menu`, `el-menu-item`, `el-submenu`)
- **Tabs** - 标签页 (`el-tabs`, `el-tab-pane`)
- **Breadcrumb** - 面包屑 (`el-breadcrumb`, `el-breadcrumb-item`)
- **PageHeader** - 页头 (`el-page-header`)
- **Dropdown** - 下拉菜单 (`el-dropdown`, `el-dropdown-menu`, `el-dropdown-item`)
- **Steps** - 步骤条 (`el-steps`, `el-step`)

### Feedback / 反馈组件
- **Alert** - 警告 (`el-alert`)
- **Loading** - 加载 (`v-loading`, `this.$loading()`)
- **Message** - 消息提示 (`this.$message()`)
- **MessageBox** - 弹框 (`this.$alert()`, `this.$confirm()`, `this.$prompt()`)
- **Notification** - 通知 (`this.$notify()`)
- **Dialog** - 对话框 (`el-dialog`)
- **Tooltip** - 文字提示 (`el-tooltip`)
- **Popover** - 弹出框 (`el-popover`)
- **Popconfirm** - 气泡确认框 (`el-popconfirm`)
- **Drawer** - 抽屉 (`el-drawer`)

### Key Points

- All components use `el-` prefix
- Vue 2 Options API is the primary pattern
- Use `slot-scope` for scoped slots (not `v-slot`)
- Use `:visible.sync` for dialog/drawer visibility
- Programmatic components (`$message`, `$notify`, etc.) are on Vue prototype
