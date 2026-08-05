# Tooltip Component / 文字提示

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/tooltip

## Instructions

This example demonstrates the Tooltip component in Element UI 2.x.

### Key Concepts

- Basic tooltip
- Tooltip placement
- Custom content
- Tooltip theme
- Controlled tooltip

### Example: Basic Tooltip

```vue
<template>
  <div>
    <el-tooltip content="Top center" placement="top">
      <el-button>上边</el-button>
    </el-tooltip>
    <el-tooltip content="Bottom center" placement="bottom">
      <el-button>下边</el-button>
    </el-tooltip>
    <el-tooltip content="Left center" placement="left">
      <el-button>左边</el-button>
    </el-tooltip>
    <el-tooltip content="Right center" placement="right">
      <el-button>右边</el-button>
    </el-tooltip>
  </div>
</template>
```

### Example: All Placement Options

```vue
<template>
  <div class="box">
    <!-- Top row -->
    <el-tooltip content="top-start" placement="top-start"><el-button>上左</el-button></el-tooltip>
    <el-tooltip content="top" placement="top"><el-button>上边</el-button></el-tooltip>
    <el-tooltip content="top-end" placement="top-end"><el-button>上右</el-button></el-tooltip>
    <!-- Bottom row -->
    <el-tooltip content="bottom-start" placement="bottom-start"><el-button>下左</el-button></el-tooltip>
    <el-tooltip content="bottom" placement="bottom"><el-button>下边</el-button></el-tooltip>
    <el-tooltip content="bottom-end" placement="bottom-end"><el-button>下右</el-button></el-tooltip>
  </div>
</template>
```

### Example: Dark and Light Theme

```vue
<template>
  <div>
    <!-- Dark theme (default) -->
    <el-tooltip content="这是一段内容" placement="top" effect="dark">
      <el-button>Dark</el-button>
    </el-tooltip>
    <!-- Light theme -->
    <el-tooltip content="这是一段内容" placement="top" effect="light">
      <el-button>Light</el-button>
    </el-tooltip>
  </div>
</template>
```

### Example: Custom HTML Content

```vue
<template>
  <el-tooltip placement="top">
    <div slot="content">
      多行信息<br/>第二行信息
    </div>
    <el-button>多行内容</el-button>
  </el-tooltip>
</template>
```

### Example: Controlled Tooltip

```vue
<template>
  <el-tooltip
    :content="tooltipContent"
    placement="top"
    :disabled="tooltipDisabled"
    :manual="true"
    v-model="showTooltip"
  >
    <el-button @mouseenter.native="showTooltip = true" @mouseleave.native="showTooltip = false">
      手动控制
    </el-button>
  </el-tooltip>
</template>

<script>
export default {
  data() {
    return {
      showTooltip: false,
      tooltipContent: '这是提示内容',
      tooltipDisabled: false
    }
  }
}
</script>
```

### Key Points

- Wrap the trigger element inside `el-tooltip`
- `content` for simple text; use `slot="content"` for HTML content
- `placement`: `top` | `top-start` | `top-end` | `bottom` | `bottom-start` | `bottom-end` | `left` | `left-start` | `left-end` | `right` | `right-start` | `right-end`
- `effect`: `dark` (default) | `light`
- `disabled` disables the tooltip
- `open-delay` sets delay before showing (ms)
- `enterable` controls whether mouse can enter the tooltip
