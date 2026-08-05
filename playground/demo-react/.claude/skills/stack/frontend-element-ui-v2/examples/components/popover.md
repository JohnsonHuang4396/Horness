# Popover Component / 弹出框

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/popover

## Instructions

This example demonstrates the Popover component in Element UI 2.x.

### Key Concepts

- Basic popover
- Trigger modes (click, hover, focus, manual)
- Popover with rich content
- Nested operations

### Example: Basic Popover

```vue
<template>
  <div>
    <!-- Hover trigger -->
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容"
    >
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>

    <!-- Click trigger -->
    <el-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容"
    >
      <el-button slot="reference">click 激活</el-button>
    </el-popover>

    <!-- Focus trigger -->
    <el-popover
      placement="right"
      title="标题"
      width="200"
      trigger="focus"
      content="这是一段内容,这是一段内容,这是一段内容"
    >
      <el-input slot="reference" placeholder="focus 激活" />
    </el-popover>
  </div>
</template>
```

### Example: Popover with Rich Content

```vue
<template>
  <el-popover
    placement="right"
    width="400"
    trigger="click"
  >
    <!-- Custom content in default slot -->
    <el-table :data="gridData">
      <el-table-column width="150" property="date" label="date" />
      <el-table-column width="100" property="name" label="name" />
      <el-table-column width="300" property="address" label="address" />
    </el-table>
    <!-- Reference element -->
    <el-button slot="reference">click 激活</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      gridData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }
      ]
    }
  }
}
</script>
```

### Example: Popover with Confirm Action

```vue
<template>
  <el-popover
    v-model="visible"
    placement="top"
    width="160"
  >
    <p>这是一段内容确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确定</el-button>
    </div>
    <el-button slot="reference">删除</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return { visible: false }
  },
  methods: {
    handleConfirm() {
      this.visible = false
      this.$message.success('已删除')
    }
  }
}
</script>
```

### Key Points

- Use `slot="reference"` for the trigger element
- Default slot is the popover content
- `trigger`: `click` | `hover` | `focus` | `manual`
- `v-model` controls visibility when `trigger="manual"`
- `title` for popover header
- `width` sets popover width
- `placement`: same options as Tooltip
- Unlike Tooltip, Popover supports rich HTML content in default slot
- `el-popconfirm` is a simpler alternative for confirmation popovers
