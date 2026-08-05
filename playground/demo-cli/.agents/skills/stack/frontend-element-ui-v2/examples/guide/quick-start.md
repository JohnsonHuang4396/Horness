# Quick Start / 快速开始

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/quickstart

## Instructions

This example provides a quick start guide for Element UI 2.x with Vue 2.

### Key Concepts

- Basic setup with Vue 2
- First component usage
- Global configuration
- Options API usage pattern

### Example: Basic Component Usage

```vue
<template>
  <el-button type="primary" @click="handleClick">
    Click Me
  </el-button>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleClick() {
      this.$message.success('Button clicked!')
    }
  }
}
</script>
```

### Example: Global Size Configuration

```javascript
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI, {
  size: 'small',   // 'medium' | 'small' | 'mini'
  zIndex: 3000
})

new Vue({
  el: '#app',
  render: h => h(App)
})
```

### Example: Simple Form

```vue
<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$message.success('提交成功')
        } else {
          this.$message.error('请检查表单填写')
          return false
        }
      })
    },
    handleReset() {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>
```

### Example: Simple Table

```vue
<template>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="age" label="年龄" width="80" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { name: '张三', age: 25, email: 'zhangsan@example.com' },
        { name: '李四', age: 30, email: 'lisi@example.com' }
      ]
    }
  },
  methods: {
    handleEdit(row) {
      console.log('Edit:', row)
    },
    handleDelete(row) {
      this.$confirm(`确认删除 ${row.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>
```

### Key Points

- Use `el-` prefix for all Element UI components
- Vue 2 uses Options API: `data()`, `methods`, `computed`, `watch`
- Use `this.$message()` for toast messages (not imported separately)
- Use `this.$confirm()` for confirmation dialogs
- Use `slot-scope` (NOT `v-slot`) for scoped slots in Vue 2
- Use `:visible.sync` for dialog visibility binding
- Use `ref` + `this.$refs.formRef.validate()` for form validation
