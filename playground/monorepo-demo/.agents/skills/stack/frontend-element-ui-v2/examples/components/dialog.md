# Dialog Component / 对话框

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/dialog

## Instructions

This example demonstrates the Dialog component in Element UI 2.x.

### Key Concepts

- Basic dialog
- Dialog visibility control with .sync
- Dialog with form
- Nested dialogs
- Dialog events

### Example: Basic Dialog

```vue
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
```

### Example: Dialog with Form

```vue
<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增</el-button>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" @close="handleClose">
      <el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="form.age" :min="1" :max="120" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      form: {
        name: '',
        age: 18,
        email: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAdd() {
      this.dialogTitle = '新增'
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          // Submit logic
          this.$message.success('保存成功')
          this.dialogVisible = false
        }
      })
    },
    handleClose() {
      this.$refs.dialogForm.resetFields()
    }
  }
}
</script>
```

### Example: Dialog Events

```vue
<template>
  <el-dialog
    title="对话框"
    :visible.sync="dialogVisible"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <p>内容</p>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return { dialogVisible: false }
  },
  methods: {
    handleOpen() { console.log('Dialog opening') },
    handleOpened() { console.log('Dialog opened (animation done)') },
    handleClose() { console.log('Dialog closing') },
    handleClosed() { console.log('Dialog closed (animation done)') }
  }
}
</script>
```

### Key Points

- Use `:visible.sync="dialogVisible"` for two-way visibility binding (Vue 2)
- `slot="footer"` for dialog footer buttons
- `width` sets dialog width (px or %)
- `@close` fires when dialog starts closing (use to reset form)
- `@closed` fires after close animation completes
- `before-close` prop for custom close logic: `:before-close="handleBeforeClose"`
- `append-to-body` renders dialog in body (useful for nested dialogs)
- `destroy-on-close` destroys content when closed (resets form state)
- Always reset form in `@close` handler to avoid stale data
