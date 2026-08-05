# Badge Component / 标记

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/badge

## Instructions

This example demonstrates the Badge component in Element UI 2.x.

### Key Concepts

- Basic badge with count
- Max count display
- Dot badge
- Custom badge content
- Hidden badge

### Example: Basic Badge

```vue
<template>
  <div>
    <el-badge :value="12" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="3" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge :value="1" class="item" type="primary">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="2" class="item" type="warning">
      <el-button size="small">回复</el-button>
    </el-badge>
  </div>
</template>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
```

### Example: Max Count

```vue
<template>
  <div>
    <!-- Shows "99+" when value > max -->
    <el-badge :value="200" :max="99" class="item">
      <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="100" :max="10" class="item">
      <el-button size="small">回复</el-button>
    </el-badge>
  </div>
</template>
```

### Example: Dot Badge

```vue
<template>
  <div>
    <!-- Just a dot, no number -->
    <el-badge is-dot class="item">数据查询</el-badge>
    <el-badge is-dot class="item">
      <el-button type="primary" icon="el-icon-bell" size="small">消息</el-button>
    </el-badge>
  </div>
</template>
```

### Example: Custom Content and Hidden

```vue
<template>
  <div>
    <!-- Custom string value -->
    <el-badge value="new" class="item">
      <el-button size="small">新功能</el-button>
    </el-badge>
    <el-badge value="hot" class="item">
      <el-button size="small">热门</el-button>
    </el-badge>
    <!-- Hidden badge -->
    <el-badge :value="count" :hidden="count === 0" class="item">
      <el-button size="small">消息 ({{ count }})</el-button>
    </el-badge>
    <el-button size="mini" @click="count++">增加消息</el-button>
    <el-button size="mini" @click="count = 0">清空</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

### Key Points

- Wrap the target element inside `el-badge`
- `value` can be a number or string
- `max` sets the maximum displayed number (shows `max+` when exceeded)
- `is-dot` shows a small dot instead of a number
- `hidden` hides the badge when `true`
- `type`: `primary` | `success` | `warning` | `danger` | `info`
- Badge is positioned at the top-right corner of the wrapped element
