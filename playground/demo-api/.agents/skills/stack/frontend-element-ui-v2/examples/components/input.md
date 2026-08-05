# Input Component / 输入框

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/input

## Instructions

This example demonstrates the Input component in Element UI 2.x.

### Key Concepts

- Basic input
- Input types
- Input sizes
- Clearable and password toggle
- Prefix/suffix icons
- Textarea
- Input with slots (prepend/append)
- Autocomplete

### Example: Basic Input

```vue
<template>
  <el-input v-model="value" placeholder="请输入内容" />
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  }
}
</script>
```

### Example: Input Sizes

```vue
<template>
  <div>
    <el-input v-model="val1" placeholder="大型输入框" size="medium" />
    <el-input v-model="val2" placeholder="小型输入框" size="small" />
    <el-input v-model="val3" placeholder="超小输入框" size="mini" />
  </div>
</template>
```

### Example: Disabled and Readonly

```vue
<template>
  <div>
    <el-input v-model="value" disabled placeholder="禁用状态" />
    <el-input v-model="value" readonly placeholder="只读状态" />
  </div>
</template>
```

### Example: Clearable and Password

```vue
<template>
  <div>
    <!-- Clearable -->
    <el-input v-model="value1" clearable placeholder="可清空" />
    <!-- Password toggle -->
    <el-input v-model="value2" show-password placeholder="请输入密码" />
  </div>
</template>
```

### Example: Prefix/Suffix Icons

```vue
<template>
  <div>
    <el-input v-model="value1" prefix-icon="el-icon-search" placeholder="搜索" />
    <el-input v-model="value2" suffix-icon="el-icon-date" placeholder="选择日期" />
  </div>
</template>
```

### Example: Textarea

```vue
<template>
  <div>
    <!-- Fixed rows -->
    <el-input
      v-model="textarea"
      type="textarea"
      :rows="4"
      placeholder="请输入内容"
    />
    <!-- Auto resize -->
    <el-input
      v-model="textarea2"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 6 }"
      placeholder="自适应高度"
    />
  </div>
</template>
```

### Example: Input with Prepend/Append Slots

```vue
<template>
  <div>
    <!-- Prepend -->
    <el-input v-model="url" placeholder="请输入内容">
      <template slot="prepend">Http://</template>
    </el-input>
    <!-- Append -->
    <el-input v-model="domain" placeholder="请输入内容">
      <template slot="append">.com</template>
    </el-input>
    <!-- Prepend with button -->
    <el-input v-model="search" placeholder="请输入搜索内容">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>
```

### Example: Input Events

```vue
<template>
  <el-input
    v-model="value"
    placeholder="请输入内容"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @clear="handleClear"
  />
</template>

<script>
export default {
  data() {
    return { value: '' }
  },
  methods: {
    handleInput(val) { console.log('input:', val) },
    handleChange(val) { console.log('change:', val) },
    handleFocus(event) { console.log('focus') },
    handleBlur(event) { console.log('blur') },
    handleClear() { console.log('cleared') }
  }
}
</script>
```

### Key Points

- Use `v-model` for two-way binding
- `type="textarea"` for multi-line input
- `clearable` adds a clear button
- `show-password` adds password visibility toggle
- Use `slot="prepend"` / `slot="append"` for prefix/suffix content (Vue 2 slot syntax)
- `@input` fires on every keystroke, `@change` fires on blur/enter
- `maxlength` + `show-word-limit` shows character count
