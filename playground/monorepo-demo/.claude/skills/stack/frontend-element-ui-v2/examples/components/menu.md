# Menu Component / 导航菜单

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/menu

## Instructions

This example demonstrates the Menu component in Element UI 2.x.

### Key Concepts

- Horizontal menu
- Vertical menu (sidebar)
- Submenu
- Router integration
- Collapsed sidebar

### Example: Horizontal Top Menu

```vue
<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4">
      <a href="https://www.ele.me" target="_blank">订单管理</a>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return { activeIndex: '1' }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('Selected:', key, keyPath)
    }
  }
}
</script>
```

### Example: Vertical Sidebar Menu

```vue
<template>
  <el-menu
    :default-active="$route.path"
    :collapse="isCollapse"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    router
  >
    <el-menu-item index="/dashboard">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="/user">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/user/list">用户列表</el-menu-item>
      <el-menu-item index="/user/role">角色管理</el-menu-item>
    </el-submenu>

    <el-submenu index="/system">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/system/config">基础配置</el-menu-item>
      <el-menu-item index="/system/log">操作日志</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return { isCollapse: false }
  }
}
</script>
```

### Key Points

- `mode`: `horizontal` | `vertical` (default)
- `default-active` sets the initially active menu item
- `router` enables vue-router integration (index = route path)
- `collapse` collapses the sidebar (vertical mode only)
- `background-color`, `text-color`, `active-text-color` for custom colors
- `el-submenu` for nested menus, use `slot="title"` for submenu title
- `@select` event fires with `(key, keyPath)` when item is selected
- `unique-opened` ensures only one submenu is open at a time
