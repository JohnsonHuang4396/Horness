# Loading Component / 加载

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/loading

## Instructions

This example demonstrates the Loading component in Element UI 2.x.

### Key Concepts

- v-loading directive
- Full-screen loading
- Programmatic loading service
- Custom loading text and icon

### Example: v-loading Directive

```vue
<template>
  <div>
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>
    <el-button @click="fetchData">加载数据</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      try {
        // await api.getData()
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.tableData = [{ name: '张三', email: 'zhangsan@example.com' }]
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
```

### Example: Custom Loading Text

```vue
<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <p>内容区域</p>
  </div>
</template>
```

### Example: Full-Screen Loading (Service)

```javascript
export default {
  methods: {
    showFullScreenLoading() {
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      setTimeout(() => {
        loading.close()
      }, 3000)
    },

    // Full screen loading
    showFullScreen() {
      const loading = this.$loading({
        fullscreen: true,
        text: '正在处理...'
      })
      // Close when done
      loading.close()
    }
  }
}
```

### Example: Loading in Async Operations

```javascript
export default {
  methods: {
    async handleSubmit() {
      const loading = this.$loading({
        lock: true,
        text: '提交中...',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      try {
        await this.submitForm()
        this.$message.success('提交成功')
      } catch (error) {
        this.$message.error('提交失败')
      } finally {
        loading.close()
      }
    }
  }
}
```

### Key Points

- `v-loading="bool"` directive for element-level loading
- `this.$loading(options)` for programmatic/full-screen loading
- `loading.close()` to close programmatic loading
- `element-loading-text` for custom loading text
- `element-loading-spinner` for custom spinner icon
- `element-loading-background` for overlay background color
- `lock: true` prevents scrolling during full-screen loading
- Always close loading in `finally` block to prevent stuck loading state
