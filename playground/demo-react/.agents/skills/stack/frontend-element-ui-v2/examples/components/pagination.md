# Pagination Component / 分页

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/pagination

## Instructions

This example demonstrates the Pagination component in Element UI 2.x.

### Key Concepts

- Basic pagination
- Pagination with size changer
- Pagination layout customization
- Pagination events

### Example: Basic Pagination

```vue
<template>
  <el-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 100
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.currentPage = page
      this.fetchData()
    },
    fetchData() {
      console.log('Fetch page:', this.currentPage)
    }
  }
}
</script>
```

### Example: Full-Featured Pagination

```vue
<template>
  <el-pagination
    :current-page.sync="currentPage"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 400
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.fetchData()
    },
    fetchData() {
      console.log(`Fetch page ${this.currentPage}, size ${this.pageSize}`)
    }
  }
}
</script>
```

### Example: Small Pagination

```vue
<template>
  <el-pagination
    small
    layout="prev, pager, next"
    :total="50"
  />
</template>
```

### Example: Pagination with Table

```vue
<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>

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
      tableData: [],
      pagination: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // API call with pagination
      const { page, size } = this.pagination
      // const res = await api.getList({ page, size })
      // this.tableData = res.data.list
      // this.pagination.total = res.data.total
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

### Key Points

- `layout` controls which elements to show: `total`, `sizes`, `prev`, `pager`, `next`, `jumper`
- `total` is required for pagination to work correctly
- `page-sizes` array defines available page size options
- Use `:current-page.sync` for automatic two-way binding
- `@size-change` fires when page size changes
- `@current-change` fires when page number changes
- Reset `currentPage` to 1 when changing page size
- `small` prop for compact pagination style
