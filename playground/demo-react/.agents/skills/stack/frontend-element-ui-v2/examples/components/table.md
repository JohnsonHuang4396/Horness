# Table Component / 表格

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/table

## Instructions

This example demonstrates the Table component in Element UI 2.x.

### Key Concepts

- Basic table
- Table with selection
- Table sorting and filtering
- Fixed columns and header
- Custom column templates
- Table pagination
- Expandable rows

### Example: Basic Table

```vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }
      ]
    }
  }
}
</script>
```

### Example: Striped and Bordered Table

```vue
<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>
```

### Example: Table with Selection

```vue
<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="address" label="地址" />
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }
      ],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
```

### Example: Custom Column Template

```vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column label="状态" width="100">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
          {{ scope.row.status === 'active' ? '启用' : '禁用' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { date: '2016-05-02', name: '王小虎', status: 'active' },
        { date: '2016-05-04', name: '李小明', status: 'inactive' }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log('Edit:', index, row)
    },
    handleDelete(index, row) {
      this.$confirm(`确认删除 ${row.name}?`, '提示', { type: 'warning' })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message.success('删除成功')
        })
    }
  }
}
</script>
```

### Example: Sortable Table

```vue
<template>
  <el-table :data="tableData" @sort-change="handleSortChange">
    <el-table-column prop="date" label="日期" sortable="custom" width="180" />
    <el-table-column prop="name" label="姓名" sortable width="180" />
    <el-table-column prop="age" label="年龄" sortable width="100" />
  </el-table>
</template>
```

### Example: Fixed Header and Columns

```vue
<template>
  <!-- Fixed header with max-height -->
  <el-table :data="tableData" height="250" border style="width: 100%">
    <el-table-column prop="date" label="日期" width="150" fixed />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="province" label="省份" width="120" />
    <el-table-column prop="city" label="市区" width="120" />
    <el-table-column prop="address" label="地址" width="300" />
    <el-table-column prop="zip" label="邮编" width="120" />
    <el-table-column label="操作" fixed="right" width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
```

### Key Points

- Use `slot-scope="scope"` for custom column templates (Vue 2 syntax)
- `scope.row` - current row data
- `scope.$index` - current row index
- `stripe` adds alternating row colors
- `border` adds cell borders
- `height` or `max-height` enables fixed header
- `fixed` / `fixed="right"` for fixed columns
- `sortable` for client-side sorting, `sortable="custom"` for server-side
- Use `ref` + `this.$refs.table.clearSelection()` for programmatic control
