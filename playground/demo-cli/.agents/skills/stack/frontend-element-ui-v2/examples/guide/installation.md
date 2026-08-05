# Installation / 安装

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/installation

## Instructions

This example demonstrates how to install Element UI 2.x in a Vue 2 project.

### Key Concepts

- npm / yarn package installation
- Full import
- On-demand import with babel-plugin-component
- CDN import
- Compatibility requirements

### Example: Package Installation

```bash
# Using npm
npm install element-ui

# Using yarn
yarn add element-ui
```

### Example: Full Import

```javascript
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

### Example: On-Demand Import

First install `babel-plugin-component`:

```bash
npm install babel-plugin-component -D
```

Configure `.babelrc`:

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

Then import only the components you need:

```javascript
// main.js
import Vue from 'vue'
import { Button, Select, Table, TableColumn, Form, FormItem, Input } from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
```

### Example: CDN Import

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<body>
  <div id="app">
    <el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </div>
</body>
<!-- Import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- Import Element UI -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
  new Vue({
    el: '#app',
    data: function() {
      return { visible: false }
    }
  })
</script>
</html>
```

### Key Points

- Install `element-ui` package (NOT `element-plus` which is for Vue 3)
- Import CSS: `element-ui/lib/theme-chalk/index.css`
- Use `Vue.use(ElementUI)` for full import
- Use `babel-plugin-component` for on-demand import to reduce bundle size
- Element UI 2.x requires Vue 2.x
- Compatible with modern browsers and IE 10+
