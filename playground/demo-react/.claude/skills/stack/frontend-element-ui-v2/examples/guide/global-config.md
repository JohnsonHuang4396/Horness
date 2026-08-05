# Global Configuration / 全局配置

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/quickstart

## Instructions

This example demonstrates global configuration options for Element UI 2.x.

### Key Concepts

- Global size configuration
- Global zIndex configuration
- Per-component size override
- Prototype method access

### Example: Global Size and zIndex

```javascript
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI, {
  size: 'small',   // Global default size: 'medium' | 'small' | 'mini'
  zIndex: 3000     // Global initial z-index for popups
})

new Vue({
  el: '#app',
  render: h => h(App)
})
```

### Example: Accessing Prototype Methods

After `Vue.use(ElementUI)`, the following methods are available on all Vue instances:

```javascript
// In any component's methods:
export default {
  methods: {
    showMessage() {
      // Message
      this.$message('This is a message')
      this.$message.success('Success!')
      this.$message.warning('Warning!')
      this.$message.error('Error!')

      // MessageBox
      this.$alert('Content', 'Title', { confirmButtonText: 'OK' })
      this.$confirm('Are you sure?', 'Confirm', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        // confirmed
      }).catch(() => {
        // cancelled
      })
      this.$prompt('Please input', 'Prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(({ value }) => {
        console.log('Input:', value)
      })

      // Notification
      this.$notify({
        title: 'Title',
        message: 'Notification message',
        type: 'success'  // 'success' | 'warning' | 'info' | 'error'
      })

      // Loading
      const loading = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => loading.close(), 2000)
    }
  }
}
```

### Example: Component-Level Size Override

```vue
<template>
  <!-- Override global size for specific components -->
  <el-button size="medium">Medium Button</el-button>
  <el-input size="mini" v-model="value" />
  <el-select size="small" v-model="selected">
    <el-option label="Option 1" value="1" />
  </el-select>
</template>
```

### Key Points

- `size` option: `'medium'` (default) | `'small'` | `'mini'`
- `zIndex` sets the starting z-index for all popups/dialogs
- `this.$message`, `this.$notify`, `this.$loading` are available globally
- `this.$confirm`, `this.$alert`, `this.$prompt` return Promises
- Individual components can override the global size
