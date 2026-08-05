# TimePicker Component / 时间选择器

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/time-picker

## Instructions

This example demonstrates the TimePicker component in Element UI 2.x.

### Key Concepts

- Fixed time options (el-time-select)
- Arbitrary time picker (el-time-picker)
- Time range picker
- Disabled times

### Example: Fixed Time Options (el-time-select)

```vue
<template>
  <el-time-select
    v-model="value"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
    placeholder="选择时间"
  />
</template>

<script>
export default {
  data() {
    return { value: '' }
  }
}
</script>
```

### Example: Fixed Time Range (el-time-select)

```vue
<template>
  <div>
    <el-time-select
      placeholder="起始时间"
      v-model="startTime"
      :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }"
    />
    <el-time-select
      placeholder="结束时间"
      v-model="endTime"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
        minTime: startTime
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: '',
      endTime: ''
    }
  }
}
</script>
```

### Example: Arbitrary Time Picker (el-time-picker)

```vue
<template>
  <div>
    <!-- Single time -->
    <el-time-picker
      v-model="value1"
      placeholder="任意时间点"
    />
    <!-- With format -->
    <el-time-picker
      v-model="value2"
      :picker-options="{ selectableRange: '18:30:00 - 20:30:00' }"
      placeholder="限制时间范围"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: new Date(2016, 9, 10, 18, 40),
      value2: new Date(2016, 9, 10, 18, 40)
    }
  }
}
</script>
```

### Example: Time Range Picker

```vue
<template>
  <el-time-picker
    is-range
    v-model="timeRange"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围"
  />
</template>

<script>
export default {
  data() {
    return {
      timeRange: [
        new Date(2016, 9, 10, 8, 40),
        new Date(2016, 9, 10, 9, 40)
      ]
    }
  }
}
</script>
```

### Key Points

- `el-time-select` for fixed step options (simpler, string values)
- `el-time-picker` for arbitrary time selection (Date object values)
- `el-time-select` uses `picker-options` with `start`, `step`, `end`
- `el-time-picker` uses `picker-options.selectableRange` to restrict times
- `is-range` on `el-time-picker` for time range selection
- `value-format` on `el-time-picker` to get string instead of Date object
- `format` controls display format (e.g., `HH:mm:ss`)
