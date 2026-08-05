# Message Component / 消息提示

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/message

## Instructions

This example demonstrates the Message component in Element UI 2.x.

### Key Concepts

- Basic message types
- Message with HTML
- Closable message
- Programmatic usage via this.$message

### Example: Basic Message Types

```javascript
// In component methods:
export default {
  methods: {
    showMessages() {
      // Default message
      this.$message('这是一条消息提示')

      // Success
      this.$message.success('恭喜你，这是一条成功消息')

      // Warning
      this.$message.warning('警告哦，这是一条警告消息')

      // Error
      this.$message.error('错了哦，这是一条错误消息')

      // Info
      this.$message({
        message: '这是一条消息提示',
        type: 'info'
      })
    }
  }
}
```

### Example: Message with Options

```javascript
export default {
  methods: {
    showCustomMessage() {
      // Custom duration (ms), default is 3000
      this.$message({
        message: '这条消息将在5秒后关闭',
        type: 'success',
        duration: 5000
      })

      // Closable message
      this.$message({
        message: '这条消息可以手动关闭',
        type: 'warning',
        showClose: true,
        duration: 0  // 0 means won't auto close
      })

      // Message with HTML
      this.$message({
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>'
      })
    }
  }
}
```

### Example: Close All Messages

```javascript
// Close all messages programmatically
this.$message.closeAll()
```

### Example: Message in Template

```vue
<template>
  <div>
    <el-button @click="open1">消息</el-button>
    <el-button @click="open2">成功</el-button>
    <el-button @click="open3">警告</el-button>
    <el-button @click="open4">错误</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    open1() { this.$message('这是一条消息提示') },
    open2() { this.$message.success('恭喜你，这是一条成功消息') },
    open3() { this.$message.warning('警告哦，这是一条警告消息') },
    open4() { this.$message.error('错了哦，这是一条错误消息') }
  }
}
</script>
```

### Key Points

- `this.$message` is available on all Vue instances after `Vue.use(ElementUI)`
- Four types: default (info), `success`, `warning`, `error`
- Default duration is 3000ms
- Set `duration: 0` to prevent auto-close
- `showClose: true` adds a close button
- `dangerouslyUseHTMLString: true` renders HTML (use with caution)
- `this.$message.closeAll()` closes all active messages
- Messages stack vertically and don't overlap
