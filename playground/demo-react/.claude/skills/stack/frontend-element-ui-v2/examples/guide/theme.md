# Theme Customization / 自定义主题

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/custom-theme

## Instructions

This example demonstrates how to customize the Element UI 2.x theme.

### Key Concepts

- Online theme editor
- SCSS variable override
- Custom theme via element-theme tool
- CSS variable override (limited)

### Example: Override SCSS Variables

Create a custom SCSS file to override Element UI theme variables:

```scss
/* element-variables.scss */

/* Override primary color */
$--color-primary: #409EFF;

/* Override font path */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

/* Import Element UI styles */
@import "~element-ui/packages/theme-chalk/src/index";
```

Then import in `main.js`:

```javascript
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
// Import custom theme instead of default
import './element-variables.scss'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

### Example: Common SCSS Variables

```scss
/* Color variables */
$--color-primary: #409EFF;        /* Primary color */
$--color-success: #67C23A;        /* Success color */
$--color-warning: #E6A23C;        /* Warning color */
$--color-danger: #F56C6C;         /* Danger color */
$--color-info: #909399;           /* Info color */

/* Text colors */
$--color-text-primary: #303133;
$--color-text-regular: #606266;
$--color-text-secondary: #909399;
$--color-text-placeholder: #C0C4CC;

/* Border */
$--border-color-base: #DCDFE6;
$--border-radius-base: 4px;

/* Font */
$--font-size-base: 14px;
$--font-path: '~element-ui/lib/theme-chalk/fonts';

/* Import Element UI */
@import "~element-ui/packages/theme-chalk/src/index";
```

### Example: Using element-theme CLI Tool

```bash
# Install element-theme
npm install element-theme -g

# Install chalk theme
npm install element-theme-chalk -D

# Initialize theme config
et -i

# Edit element-variables.scss, then build
et

# Output: theme/ directory with custom CSS
```

### Example: Scoped Style Override

```vue
<template>
  <div class="custom-button-wrapper">
    <el-button type="primary">Custom Button</el-button>
  </div>
</template>

<style>
/* Override without scoped to affect child components */
.custom-button-wrapper .el-button--primary {
  background-color: #ff6600;
  border-color: #ff6600;
}

.custom-button-wrapper .el-button--primary:hover {
  background-color: #ff8833;
  border-color: #ff8833;
}
</style>
```

### Key Points

- Element UI 2.x uses SCSS for theming
- Override `$--color-primary` to change the primary color
- Must include `$--font-path` pointing to Element UI fonts
- Import `@import "~element-ui/packages/theme-chalk/src/index"` at the end
- Use `element-theme` CLI for full theme generation
- Avoid using `scoped` when overriding component styles
- Use specific class selectors to avoid global style pollution
