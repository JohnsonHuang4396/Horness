# DatePicker Component / 日期选择器

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/date-picker

## Instructions

This example demonstrates the DatePicker component in Element UI 2.x.

### Key Concepts

- Date picker types
- Date range picker
- DateTime picker
- Date format
- Disabled dates

### Example: Basic Date Picker

```vue
<template>
  <div>
    <!-- Single date -->
    <el-date-picker v-model="date" type="date" placeholder="选择日期" />
    <!-- Week -->
    <el-date-picker v-model="week" type="week" format="yyyy 第 WW 周" placeholder="选择周" />
    <!-- Month -->
    <el-date-picker v-model="month" type="month" placeholder="选择月" />
    <!-- Year -->
    <el-date-picker v-model="year" type="year" placeholder="选择年" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      week: '',
      month: '',
      year: ''
    }
  }
}
</script>
```

### Example: Date Range Picker

```vue
<template>
  <div>
    <!-- Date range -->
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
    <!-- Month range -->
    <el-date-picker
      v-model="monthRange"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateRange: [],   // [startDate, endDate]
      monthRange: []
    }
  }
}
</script>
```

### Example: DateTime Picker

```vue
<template>
  <div>
    <!-- Single datetime -->
    <el-date-picker
      v-model="datetime"
      type="datetime"
      placeholder="选择日期时间"
    />
    <!-- Datetime range -->
    <el-date-picker
      v-model="datetimeRange"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </div>
</template>
```

### Example: Custom Format and Disabled Dates

```vue
<template>
  <el-date-picker
    v-model="date"
    type="date"
    placeholder="选择日期"
    format="yyyy/MM/dd"
    value-format="yyyy-MM-dd"
    :picker-options="pickerOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      date: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()  // Disable future dates
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  }
}
</script>
```

### Key Points

- `type` options: `date`, `week`, `month`, `year`, `datetime`, `daterange`, `monthrange`, `datetimerange`
- `format` controls display format (e.g., `yyyy-MM-dd`)
- `value-format` controls the bound value format (default is Date object)
- `picker-options.disabledDate` for disabling specific dates
- `picker-options.shortcuts` for quick selection shortcuts
- Date range returns an array `[startDate, endDate]`
- Use `range-separator`, `start-placeholder`, `end-placeholder` for range pickers
