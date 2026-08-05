# MessageBox Component / 弹框

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/message-box

## Instructions

This example demonstrates the MessageBox component in Element UI 2.x.

### Key Concepts

- Alert dialog
- Confirm dialog
- Prompt dialog
- Custom MessageBox

### Example: Alert

```javascript
export default {
  methods: {
    openAlert() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    }
  }
}
```

### Example: Confirm

```javascript
export default {
  methods: {
    openConfirm() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
```

### Example: Prompt

```javascript
export default {
  methods: {
    openPrompt() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
```

### Example: Custom MessageBox

```javascript
export default {
  methods: {
    openCustom() {
      this.$msgbox({
        title: '消息',
        message: this.$createElement('p', null, [
          this.$createElement('span', null, '内容可以是 '),
          this.$createElement('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({ type: 'info', message: 'action: ' + action })
      })
    }
  }
}
```

### Key Points

- `this.$alert` - Simple alert with OK button only
- `this.$confirm` - Confirm with OK and Cancel buttons
- `this.$prompt` - Prompt with input field
- `this.$msgbox` - Fully customizable MessageBox
- All return Promises: `.then()` for confirm, `.catch()` for cancel
- `type` option: `'success'` | `'warning'` | `'info'` | `'error'`
- `inputPattern` in prompt for input validation
- `beforeClose` for async operations before closing
