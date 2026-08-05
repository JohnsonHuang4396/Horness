# Transfer Component / 穿梭框

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/transfer

## Instructions

This example demonstrates the Transfer component in Element UI 2.x.

### Key Concepts

- Basic transfer
- Filterable transfer
- Custom data keys
- Transfer with titles and buttons

### Example: Basic Transfer

```vue
<template>
  <el-transfer v-model="value" :data="data" />
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1, 4]  // Keys of items in the right panel
    }
  }
}
</script>
```

### Example: Filterable Transfer

```vue
<template>
  <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入城市拼音"
    v-model="value"
    :data="data"
  />
</template>

<script>
export default {
  data() {
    return {
      data: [
        { key: 1, label: '上海', pinyin: 'shanghai' },
        { key: 2, label: '北京', pinyin: 'beijing' },
        { key: 3, label: '广州', pinyin: 'guangzhou' },
        { key: 4, label: '深圳', pinyin: 'shenzhen' }
      ],
      value: []
    }
  },
  methods: {
    filterMethod(query, item) {
      return item.pinyin.indexOf(query) > -1
    }
  }
}
</script>
```

### Example: Custom Titles and Button Text

```vue
<template>
  <el-transfer
    v-model="value"
    :data="data"
    :titles="['源列表', '目标列表']"
    :button-texts="['到左边', '到右边']"
    :format="{ noChecked: '${total}', hasChecked: '${checked}/${total}' }"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return {
      data: Array.from({ length: 10 }, (_, i) => ({
        key: i + 1,
        label: `选项 ${i + 1}`
      })),
      value: []
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log('Value:', value)
      console.log('Direction:', direction)  // 'left' or 'right'
      console.log('Moved keys:', movedKeys)
    }
  }
}
</script>
```

### Example: Custom Data Keys

```vue
<template>
  <el-transfer
    v-model="value"
    :data="data"
    :props="{ key: 'id', label: 'name', disabled: 'isDisabled' }"
  />
</template>

<script>
export default {
  data() {
    return {
      data: [
        { id: 1, name: '张三', isDisabled: false },
        { id: 2, name: '李四', isDisabled: false },
        { id: 3, name: '王五', isDisabled: true }
      ],
      value: []
    }
  }
}
</script>
```

### Key Points

- `v-model` binds to an array of keys of items in the **right** panel
- `data` array must have `key`, `label`, `disabled` fields (configurable via `props`)
- `filterable` enables search in both panels
- `filter-method` for custom filter logic: `(query, item) => boolean`
- `titles` array sets panel titles: `['左标题', '右标题']`
- `button-texts` array sets button labels
- `@change` fires with `(value, direction, movedKeys)` when items move
- `props` remaps data field names: `{ key: 'id', label: 'name' }`
