# Cascader Component / 级联选择器

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/cascader

## Instructions

This example demonstrates the Cascader component in Element UI 2.x.

### Key Concepts

- Basic cascader
- Multiple selection
- Dynamic loading
- Search/filter
- Custom display

### Example: Basic Cascader

```vue
<template>
  <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                { value: 'yizhi', label: '一致' },
                { value: 'fankui', label: '反馈' }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: '基础组件',
              children: [
                { value: 'layout', label: 'Layout 布局' },
                { value: 'color', label: 'Color 色彩' }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleChange(value) {
      console.log('Selected:', value)
    }
  }
}
</script>
```

### Example: Clearable and Placeholder

```vue
<template>
  <el-cascader
    v-model="value"
    :options="options"
    clearable
    placeholder="请选择"
  />
</template>
```

### Example: Multiple Selection

```vue
<template>
  <el-cascader
    v-model="value"
    :options="options"
    :props="{ multiple: true }"
    collapse-tags
    clearable
  />
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: [/* ... */]
    }
  }
}
</script>
```

### Example: Filterable Cascader

```vue
<template>
  <el-cascader
    v-model="value"
    :options="options"
    filterable
    placeholder="试试搜索：指南"
  />
</template>
```

### Example: Dynamic Loading

```vue
<template>
  <el-cascader
    v-model="value"
    :props="props"
  />
</template>

<script>
let id = 0
export default {
  data() {
    return {
      value: [],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map(() => ({
              value: ++id,
              label: `选项${id}`,
              leaf: level >= 2  // leaf = no children
            }))
            resolve(nodes)
          }, 1000)
        }
      }
    }
  }
}
</script>
```

### Example: Show All Levels / Last Level Only

```vue
<template>
  <div>
    <!-- Show full path (default) -->
    <el-cascader v-model="value1" :options="options" />
    <!-- Show only last level -->
    <el-cascader v-model="value2" :options="options" :show-all-levels="false" />
  </div>
</template>
```

### Key Points

- `v-model` binds to an array of values from root to leaf (e.g., `['a', 'b', 'c']`)
- `options` must have `value`, `label`, `children` fields (configurable via `props`)
- `clearable` adds a clear button
- `filterable` enables search
- `props.multiple` for multi-selection (v-model becomes array of arrays)
- `props.lazy` + `props.lazyLoad` for dynamic loading
- `show-all-levels` controls whether full path is shown in input
- `collapse-tags` collapses multiple selections in multiple mode
