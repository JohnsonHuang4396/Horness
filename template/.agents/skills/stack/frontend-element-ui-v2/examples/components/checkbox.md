# Checkbox Component / 多选框

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/checkbox

## Instructions

This example demonstrates the Checkbox component in Element UI 2.x.

### Key Concepts

- Basic checkbox
- Checkbox group
- Indeterminate state (全选/半选)
- Checkbox button style
- Disabled state

### Example: Basic Checkbox

```vue
<template>
  <div>
    <el-checkbox v-model="checked">备选项</el-checkbox>
    <el-checkbox v-model="checked2" disabled>禁用</el-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      checked2: false
    }
  }
}
</script>
```

### Example: Checkbox Group

```vue
<template>
  <el-checkbox-group v-model="checkedCities">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳']
    }
  }
}
</script>
```

### Example: Select All with Indeterminate State

```vue
<template>
  <div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>
```

### Example: Checkbox Button Style

```vue
<template>
  <div>
    <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
    </el-checkbox-group>
    <!-- With size -->
    <el-checkbox-group v-model="checkboxGroup2" size="medium">
      <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxGroup1: ['上海'],
      checkboxGroup2: ['北京'],
      cities: ['上海', '北京', '广州', '深圳']
    }
  }
}
</script>
```

### Example: Min/Max Selection

```vue
<template>
  <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
  </el-checkbox-group>
</template>
```

### Key Points

- `v-model` on `el-checkbox` binds to a boolean
- `v-model` on `el-checkbox-group` binds to an array
- `label` on `el-checkbox` is the value pushed into the group array
- `:indeterminate` for the half-selected state (全选/半选)
- `el-checkbox-button` for button-style checkboxes
- `:min` / `:max` on group to limit selection count
- `@change` fires with the new value/array
