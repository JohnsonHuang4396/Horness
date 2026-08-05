# Tag Component / 标签

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/tag

## Instructions

This example demonstrates the Tag component in Element UI 2.x.

### Key Concepts

- Basic tag types
- Closable tags
- Dynamic tag editing
- Tag sizes and effects

### Example: Basic Tags

```vue
<template>
  <div>
    <el-tag>标签一</el-tag>
    <el-tag type="success">标签二</el-tag>
    <el-tag type="info">标签三</el-tag>
    <el-tag type="warning">标签四</el-tag>
    <el-tag type="danger">标签五</el-tag>
  </div>
</template>
```

### Example: Closable Tags

```vue
<template>
  <div>
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :type="tag.type"
      closable
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' },
        { name: '标签三', type: 'info' },
        { name: '标签四', type: 'warning' },
        { name: '标签五', type: 'danger' }
      ]
    }
  },
  methods: {
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>
```

### Example: Dynamic Tag Editing

```vue
<template>
  <div>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <el-input
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      style="width: 90px"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else size="mini" @click="showInput">+ 新标签</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue && !this.dynamicTags.includes(inputValue)) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
```

### Example: Tag Sizes and Effects

```vue
<template>
  <div>
    <!-- Sizes -->
    <el-tag size="medium">中等标签</el-tag>
    <el-tag size="small">小型标签</el-tag>
    <el-tag size="mini">超小标签</el-tag>

    <!-- Effects -->
    <el-tag effect="dark">Dark</el-tag>
    <el-tag effect="plain">Plain</el-tag>
    <el-tag effect="light">Light (default)</el-tag>
  </div>
</template>
```

### Key Points

- Types: `''` (default blue) | `success` | `info` | `warning` | `danger`
- `closable` adds a close button; `@close` fires when clicked
- `disable-transitions` disables the fade animation
- `effect`: `light` (default) | `dark` | `plain`
- Sizes: `medium` | `small` | `mini`
- Use `$nextTick` when focusing dynamically shown inputs
