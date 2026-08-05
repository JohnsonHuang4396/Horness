# Dropdown Component / 下拉菜单

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/dropdown

## Instructions

This example demonstrates the Dropdown component in Element UI 2.x.

### Key Concepts

- Basic dropdown
- Trigger modes
- Dropdown with command
- Split button dropdown
- Disabled items

### Example: Basic Dropdown

```vue
<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">黄金糕</el-dropdown-item>
      <el-dropdown-item command="b">狮子头</el-dropdown-item>
      <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
      <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
      <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      this.$message(`click on item ${command}`)
    }
  }
}
</script>
```

### Example: Trigger Modes

```vue
<template>
  <div>
    <!-- Hover trigger (default) -->
    <el-dropdown trigger="hover">
      <el-button type="primary">
        hover 触发<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>选项一</el-dropdown-item>
        <el-dropdown-item>选项二</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- Click trigger -->
    <el-dropdown trigger="click">
      <el-button type="primary">
        click 触发<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>选项一</el-dropdown-item>
        <el-dropdown-item>选项二</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
```

### Example: Split Button Dropdown

```vue
<template>
  <el-dropdown split-button type="primary" @click="handleClick" @command="handleCommand">
    更多菜单
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">黄金糕</el-dropdown-item>
      <el-dropdown-item command="b">狮子头</el-dropdown-item>
      <el-dropdown-item command="c" divided>螺蛳粉</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$message('button click')
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
    }
  }
}
</script>
```

### Example: Dropdown in Table Actions

```vue
<template>
  <el-table :data="tableData">
    <el-table-column prop="name" label="姓名" />
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-dropdown size="mini" @command="(cmd) => handleCommand(cmd, scope.row)">
          <el-button size="mini">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="view">查看</el-dropdown-item>
            <el-dropdown-item command="copy">复制</el-dropdown-item>
            <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>
```

### Key Points

- Use `slot="dropdown"` on `el-dropdown-menu` for the menu content
- `@command` fires with the `command` value of the clicked item
- `trigger`: `hover` (default) | `click` | `focus` | `contextmenu`
- `split-button` creates a split button (left = action, right = dropdown)
- `divided` on `el-dropdown-item` adds a divider above it
- `disabled` on `el-dropdown-item` disables that item
- `placement` controls menu position (same as Tooltip)
