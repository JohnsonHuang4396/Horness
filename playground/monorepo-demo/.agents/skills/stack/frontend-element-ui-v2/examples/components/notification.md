# Notification Component / 通知

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/notification

## Instructions

This example demonstrates the Notification component in Element UI 2.x.

### Key Concepts

- Basic notification types
- Notification position
- Custom duration
- Notification with HTML

### Example: Basic Notification

```javascript
export default {
  methods: {
    showNotifications() {
      // Default notification
      this.$notify({
        title: '标题名称',
        message: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
      })

      // Success
      this.$notify({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      })

      // Warning
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning'
      })

      // Error
      this.$notify.error({
        title: '错误',
        message: '这是一条错误的提示消息'
      })

      // Info
      this.$notify.info({
        title: '消息',
        message: '这是一条消息的提示消息'
      })
    }
  }
}
```

### Example: Notification Position

```javascript
export default {
  methods: {
    showPositioned() {
      // Top right (default)
      this.$notify({ title: '右上角', message: '消息内容', position: 'top-right' })
      // Top left
      this.$notify({ title: '左上角', message: '消息内容', position: 'top-left' })
      // Bottom right
      this.$notify({ title: '右下角', message: '消息内容', position: 'bottom-right' })
      // Bottom left
      this.$notify({ title: '左下角', message: '消息内容', position: 'bottom-left' })
    }
  }
}
```

### Example: Custom Duration and Close

```javascript
export default {
  methods: {
    showCustom() {
      // Custom duration
      this.$notify({
        title: '提示',
        message: '这条通知5秒后关闭',
        duration: 5000
      })

      // Won't auto close
      this.$notify({
        title: '提示',
        message: '这条通知不会自动关闭',
        duration: 0
      })
    }
  }
}
```

### Key Points

- `this.$notify` is available globally after `Vue.use(ElementUI)`
- Four types: `success`, `warning`, `info`, `error`
- Default position is `top-right`
- Default duration is 4500ms
- Set `duration: 0` to prevent auto-close
- `this.$notify.success()`, `this.$notify.error()` are shorthand methods
- `dangerouslyUseHTMLString: true` for HTML content
- `showClose: false` to hide the close button
