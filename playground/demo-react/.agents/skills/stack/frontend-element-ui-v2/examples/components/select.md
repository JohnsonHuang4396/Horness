# Select Component / 选择器

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/select

## Instructions

This example demonstrates the Select component in Element UI 2.x.

### Key Concepts

- Basic select
- Multiple select
- Searchable select
- Remote search
- Grouped options
- Clearable select

### Example: Basic Select

```vue
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ]
    }
  }
}
</script>
```

### Example: Disabled and Clearable

```vue
<template>
  <div>
    <el-select v-model="value1" disabled placeholder="禁用">
      <el-option label="选项1" value="1" />
    </el-select>
    <el-select v-model="value2" clearable placeholder="可清空">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>
```

### Example: Multiple Select

```vue
<template>
  <el-select v-model="value" multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: [],  // Array for multiple select
      options: [
        { value: '1', label: '选项一' },
        { value: '2', label: '选项二' },
        { value: '3', label: '选项三' }
      ]
    }
  }
}
</script>
```

### Example: Searchable Select

```vue
<template>
  <el-select v-model="value" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
```

### Example: Grouped Options

```vue
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [
        {
          label: '热门城市',
          options: [
            { value: 'Shanghai', label: '上海' },
            { value: 'Beijing', label: '北京' }
          ]
        },
        {
          label: '城市名',
          options: [
            { value: 'Chengdu', label: '成都' },
            { value: 'Shenzhen', label: '深圳' }
          ]
        }
      ]
    }
  }
}
</script>
```

### Example: Remote Search

```vue
<template>
  <el-select
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      options: [],
      loading: false
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        // Simulate API call
        setTimeout(() => {
          this.loading = false
          this.options = [
            { value: '1', label: query + ' 结果1' },
            { value: '2', label: query + ' 结果2' }
          ]
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>
```

### Key Points

- `v-model` binds to a string for single select, array for multiple
- `clearable` adds a clear button
- `filterable` enables client-side search
- `remote` + `remote-method` for server-side search
- `multiple` allows selecting multiple options
- `collapse-tags` collapses multiple selected tags
- `el-option-group` for grouped options
- `disabled` on `el-option` disables individual options
