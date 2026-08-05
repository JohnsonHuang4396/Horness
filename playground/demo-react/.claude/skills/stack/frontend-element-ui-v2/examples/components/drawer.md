# Drawer Component / 抽屉

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/drawer

## Instructions

This example demonstrates the Drawer component in Element UI 2.x.

### Key Concepts

- Basic drawer
- Drawer direction
- Drawer with form
- Nested drawers

### Example: Basic Drawer

```vue
<template>
  <div>
    <el-button @click="drawer = true" type="primary">点我打开</el-button>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="rtl"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return { drawer: false }
  }
}
</script>
```

### Example: Drawer Directions

```vue
<template>
  <div>
    <el-button @click="openDrawer('ltr')">从左往右开</el-button>
    <el-button @click="openDrawer('rtl')">从右往左开</el-button>
    <el-button @click="openDrawer('ttb')">从上往下开</el-button>
    <el-button @click="openDrawer('btt')">从下往上开</el-button>

    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      :direction="direction"
    >
      <p>内容区域</p>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      drawerTitle: '抽屉标题'
    }
  },
  methods: {
    openDrawer(dir) {
      this.direction = dir
      this.drawer = true
    }
  }
}
</script>
```

### Example: Drawer with Form

```vue
<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增用户</el-button>

    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerVisible"
      size="40%"
      @close="handleClose"
    >
      <div style="padding: 20px">
        <el-form :model="form" :rules="rules" ref="drawerForm" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="form.role" placeholder="请选择">
              <el-option label="管理员" value="admin" />
              <el-option label="普通用户" value="user" />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align: right; margin-top: 20px">
          <el-button @click="drawerVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerVisible: false,
      drawerTitle: '新增用户',
      form: { name: '', email: '', role: '' },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入正确邮箱', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleAdd() {
      this.drawerTitle = '新增用户'
      this.drawerVisible = true
    },
    handleSubmit() {
      this.$refs.drawerForm.validate(valid => {
        if (valid) {
          this.$message.success('保存成功')
          this.drawerVisible = false
        }
      })
    },
    handleClose() {
      this.$refs.drawerForm.resetFields()
    }
  }
}
</script>
```

### Key Points

- Use `:visible.sync="drawerVisible"` for two-way visibility binding
- `direction`: `rtl` (default, right-to-left) | `ltr` | `ttb` | `btt`
- `size` sets drawer width/height (px or %, default `30%`)
- `@close` fires when drawer starts closing (use to reset form)
- `@closed` fires after close animation completes
- `before-close` for custom close logic
- `append-to-body` renders drawer in body element
- `show-close` controls close button visibility (default `true`)
- `modal` controls whether backdrop is shown (default `true`)
