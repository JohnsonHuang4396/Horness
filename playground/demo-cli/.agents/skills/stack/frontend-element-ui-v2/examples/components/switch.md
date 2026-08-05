# Switch Component / 开关

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/switch

## Instructions

This example demonstrates the Switch component in Element UI 2.x.

### Key Concepts

- Basic switch
- Custom active/inactive values
- Custom colors
- Disabled state
- Switch with text labels

### Example: Basic Switch

```vue
<template>
  <el-switch v-model="value" />
</template>

<script>
export default {
  data() {
    return {
      value: true
    }
  }
}
</script>
```

### Example: Custom Values

```vue
<template>
  <div>
    <!-- Custom active/inactive values (not just true/false) -->
    <el-switch
      v-model="value1"
      active-value="1"
      inactive-value="0"
    />
    <!-- Number values -->
    <el-switch
      v-model="value2"
      :active-value="100"
      :inactive-value="0"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '1',
      value2: 100
    }
  }
}
</script>
```

### Example: Custom Colors and Text

```vue
<template>
  <div>
    <!-- Custom colors -->
    <el-switch
      v-model="value1"
      active-color="#13ce66"
      inactive-color="#ff4949"
    />
    <!-- With text labels -->
    <el-switch
      v-model="value2"
      active-text="按月付费"
      inactive-text="按年付费"
    />
    <!-- With icon -->
    <el-switch
      v-model="value3"
      active-icon-class="el-icon-check"
      inactive-icon-class="el-icon-close"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
      value3: true
    }
  }
}
</script>
```

### Example: Disabled Switch

```vue
<template>
  <div>
    <el-switch v-model="value1" disabled />
    <el-switch v-model="value2" disabled />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: false
    }
  }
}
</script>
```

### Example: Switch with Change Event

```vue
<template>
  <el-switch
    v-model="value"
    active-text="开启"
    inactive-text="关闭"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return { value: false }
  },
  methods: {
    handleChange(val) {
      console.log('Switch changed to:', val)
      this.$message.success(`已${val ? '开启' : '关闭'}`)
    }
  }
}
</script>
```

### Key Points

- `v-model` binds to a boolean by default
- `active-value` / `inactive-value` for custom bound values (string or number)
- `active-color` / `inactive-color` for custom track colors
- `active-text` / `inactive-text` for text labels beside the switch
- `@change` fires with the new value when toggled
- `disabled` prevents user interaction
- `width` sets the switch width in pixels
