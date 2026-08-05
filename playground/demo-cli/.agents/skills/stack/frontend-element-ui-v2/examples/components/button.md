# Button Component / 按钮

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/button

## Instructions

This example demonstrates the Button component in Element UI 2.x.

### Key Concepts

- Button types
- Button sizes
- Button states
- Button groups
- Button with icons

### Example: Basic Button Types

```vue
<template>
  <div>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>
```

### Example: Plain / Round / Circle Buttons

```vue
<template>
  <div>
    <!-- Plain buttons -->
    <el-button plain>朴素按钮</el-button>
    <el-button type="primary" plain>主要按钮</el-button>

    <!-- Round buttons -->
    <el-button round>圆角按钮</el-button>
    <el-button type="primary" round>主要按钮</el-button>

    <!-- Circle buttons (icon only) -->
    <el-button type="primary" icon="el-icon-search" circle></el-button>
    <el-button type="success" icon="el-icon-check" circle></el-button>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
  </div>
</template>
```

### Example: Button Sizes

```vue
<template>
  <div>
    <el-button>默认按钮</el-button>
    <el-button size="medium">中等按钮</el-button>
    <el-button size="small">小型按钮</el-button>
    <el-button size="mini">超小按钮</el-button>
  </div>
</template>
```

### Example: Disabled State

```vue
<template>
  <div>
    <el-button disabled>默认按钮</el-button>
    <el-button type="primary" disabled>主要按钮</el-button>
    <el-button type="primary" :disabled="isDisabled">动态禁用</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: true
    }
  }
}
</script>
```

### Example: Loading State

```vue
<template>
  <el-button type="primary" :loading="isLoading" @click="handleClick">
    {{ isLoading ? '加载中...' : '点击加载' }}
  </el-button>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    handleClick() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }
}
</script>
```

### Example: Button with Icon

```vue
<template>
  <div>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-button type="primary" icon="el-icon-edit">编辑</el-button>
    <el-button type="success" icon="el-icon-check">确认</el-button>
    <el-button type="danger" icon="el-icon-delete">删除</el-button>
    <!-- Icon on the right -->
    <el-button type="primary">
      上传 <i class="el-icon-upload el-icon--right"></i>
    </el-button>
  </div>
</template>
```

### Example: Button Group

```vue
<template>
  <el-button-group>
    <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
    <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</template>
```

### Key Points

- Types: `primary`, `success`, `info`, `warning`, `danger`
- Sizes: `medium`, `small`, `mini` (default is medium)
- States: `disabled`, `loading`, `plain`, `round`, `circle`
- Use `icon="el-icon-*"` for built-in icons
- `el-button-group` wraps multiple buttons into a group
- Use `:loading="bool"` for async operation feedback
