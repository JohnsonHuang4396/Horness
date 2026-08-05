# Radio Component / 单选框

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/radio

## Instructions

This example demonstrates the Radio component in Element UI 2.x.

### Key Concepts

- Basic radio
- Radio group
- Radio button style
- Disabled state
- Border style

### Example: Basic Radio

```vue
<template>
  <div>
    <el-radio v-model="radio" label="1">备选项1</el-radio>
    <el-radio v-model="radio" label="2">备选项2</el-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1'
    }
  }
}
</script>
```

### Example: Radio Group

```vue
<template>
  <el-radio-group v-model="radio">
    <el-radio :label="3">备选项3</el-radio>
    <el-radio :label="6">备选项6</el-radio>
    <el-radio :label="9">备选项9</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return { radio: 3 }
  }
}
</script>
```

### Example: Radio Button Style

```vue
<template>
  <div>
    <el-radio-group v-model="radio1">
      <el-radio-button label="上海" />
      <el-radio-button label="北京" />
      <el-radio-button label="广州" />
      <el-radio-button label="深圳" />
    </el-radio-group>
    <!-- With size -->
    <el-radio-group v-model="radio2" size="medium">
      <el-radio-button label="上海" />
      <el-radio-button label="北京" />
      <el-radio-button label="广州" disabled />
      <el-radio-button label="深圳" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: '上海',
      radio2: '北京'
    }
  }
}
</script>
```

### Example: Border Style

```vue
<template>
  <div>
    <el-radio v-model="radio1" label="1" border>备选项1</el-radio>
    <el-radio v-model="radio1" label="2" border>备选项2</el-radio>
    <!-- With size -->
    <el-radio v-model="radio2" label="1" border size="medium">备选项1</el-radio>
    <el-radio v-model="radio2" label="2" border size="medium">备选项2</el-radio>
  </div>
</template>
```

### Example: Radio with Change Event

```vue
<template>
  <el-radio-group v-model="city" @change="handleChange">
    <el-radio label="shanghai">上海</el-radio>
    <el-radio label="beijing">北京</el-radio>
    <el-radio label="guangzhou">广州</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  data() {
    return { city: 'shanghai' }
  },
  methods: {
    handleChange(val) {
      console.log('Selected city:', val)
    }
  }
}
</script>
```

### Key Points

- `v-model` on `el-radio` or `el-radio-group` binds to the selected `label` value
- `label` is the value that gets bound when this radio is selected
- `el-radio-group` is recommended for grouping radios
- `el-radio-button` for button-style radios
- `border` prop adds a border around the radio
- `disabled` on individual radio or the whole group
- `@change` fires with the newly selected value
- `size`: `medium` | `small` | `mini` (for button/border style)
