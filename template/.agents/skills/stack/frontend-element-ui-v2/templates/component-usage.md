# Component Usage Templates

## Button Usage

```vue
<template>
  <div>
    <el-button type="primary" @click="handleClick">主要按钮</el-button>
    <el-button type="primary" :loading="loading" @click="handleAsyncClick">异步按钮</el-button>
    <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return { loading: false }
  },
  methods: {
    handleClick() {
      this.$message.success('点击成功')
    },
    async handleAsyncClick() {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1500))
      this.loading = false
      this.$message.success('操作完成')
    },
    handleDelete() {
      this.$confirm('确认删除?', '提示', { type: 'warning' })
        .then(() => this.$message.success('已删除'))
        .catch(() => {})
    }
  }
}
</script>
```

## Form Usage

```vue
<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="form.role" placeholder="请选择角色">
        <el-option label="管理员" value="admin" />
        <el-option label="普通用户" value="user" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch v-model="form.status" active-text="启用" inactive-text="禁用" />
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
        password: '',
        role: '',
        status: true
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不少于6位', trigger: 'blur' }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$message.success('提交成功')
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

## Table with Pagination Usage

```vue
<template>
  <div>
    <!-- Search bar -->
    <el-form :inline="true" :model="searchForm" style="margin-bottom: 15px">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- Table -->
    <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status ? 'success' : 'danger'">
            {{ scope.row.status ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div style="margin-top: 15px; text-align: right">
      <el-pagination
        :current-page.sync="pagination.page"
        :page-size="pagination.size"
        :page-sizes="[10, 20, 50]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      searchForm: { name: '' },
      tableData: [],
      pagination: { page: 1, size: 10, total: 0 }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      try {
        // const res = await api.getList({ ...this.searchForm, ...this.pagination })
        // this.tableData = res.data.list
        // this.pagination.total = res.data.total
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.pagination.page = 1
      this.fetchData()
    },
    handleReset() {
      this.searchForm = { name: '' }
      this.pagination.page = 1
      this.fetchData()
    },
    handleEdit(row) {
      console.log('Edit:', row)
    },
    handleDelete(row) {
      this.$confirm(`确认删除 ${row.name}?`, '提示', { type: 'warning' })
        .then(() => {
          // await api.delete(row.id)
          this.$message.success('删除成功')
          this.fetchData()
        })
        .catch(() => {})
    },
    handleSizeChange(size) {
      this.pagination.size = size
      this.pagination.page = 1
      this.fetchData()
    },
    handlePageChange(page) {
      this.pagination.page = page
      this.fetchData()
    }
  }
}
</script>
```

## Dialog with Form Usage

```vue
<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增</el-button>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
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
      submitLoading: false,
      form: { name: '', email: '' },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email: [{ required: true, type: 'email', message: '请输入正确邮箱', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleAdd() {
      this.dialogTitle = '新增'
      this.form = { name: '', email: '' }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑'
      this.form = { ...row }
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async valid => {
        if (!valid) return
        this.submitLoading = true
        try {
          // await api.save(this.form)
          this.$message.success('保存成功')
          this.dialogVisible = false
          this.$emit('refresh')
        } finally {
          this.submitLoading = false
        }
      })
    },
    handleDialogClose() {
      this.$refs.dialogForm.resetFields()
    }
  }
}
</script>
```
