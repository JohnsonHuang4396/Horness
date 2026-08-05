# Tabs Component / 标签页

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/tabs

## Instructions

This example demonstrates the Tabs component in Element UI 2.x.

### Key Concepts

- Basic tabs
- Card-style tabs
- Closable tabs
- Dynamic tabs
- Tab events

### Example: Basic Tabs

```vue
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理内容</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理内容</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理内容</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿内容</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return { activeName: 'first' }
  },
  methods: {
    handleClick(tab, event) {
      console.log('Tab clicked:', tab.name)
    }
  }
}
</script>
```

### Example: Card-Style Tabs

```vue
<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
  </el-tabs>
</template>
```

### Example: Closable Tabs

```vue
<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [
        { title: 'Tab 1', name: '1', content: 'Tab 1 content' },
        { title: 'Tab 2', name: '2', content: 'Tab 2 content' }
      ],
      tabIndex: 2
    }
  },
  methods: {
    removeTab(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) activeName = nextTab.name
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>
```

### Key Points

- `v-model` binds to the active tab's `name`
- `type`: `''` (default line) | `'card'` | `'border-card'`
- `closable` adds close buttons to all tabs
- `@tab-click` fires when a tab is clicked
- `@tab-remove` fires when a tab is closed (with `closable`)
- `@tab-add` fires when add button is clicked (with `editable`)
- `tab-position`: `top` | `right` | `bottom` | `left`
- Each `el-tab-pane` needs a unique `name` prop
