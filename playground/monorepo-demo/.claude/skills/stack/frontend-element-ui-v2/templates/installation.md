# Installation Templates

## npm Installation

```bash
npm install element-ui
```

## yarn Installation

```bash
yarn add element-ui
```

## Full Import

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

## Full Import with Global Config

```javascript
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## On-Demand Import

Install babel plugin:

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

Import components:

```javascript
// main.js
import Vue from 'vue'
import {
  Button, Input, Select, Option, OptionGroup,
  Form, FormItem, Table, TableColumn,
  Pagination, Dialog, Drawer,
  DatePicker, TimePicker, TimeSelect,
  Checkbox, CheckboxGroup, CheckboxButton,
  Radio, RadioGroup, RadioButton,
  Switch, Slider, Rate, ColorPicker,
  Upload, Transfer, Cascader,
  Menu, MenuItem, Submenu, MenuItemGroup,
  Tabs, TabPane,
  Breadcrumb, BreadcrumbItem,
  Steps, Step,
  Tag, Badge, Avatar,
  Card, Collapse, CollapseItem,
  Tree, Tooltip, Popover, Dropdown, DropdownMenu, DropdownItem,
  Alert, Loading, Message, MessageBox, Notification
} from 'element-ui'

const components = [
  Button, Input, Select, Option, OptionGroup,
  Form, FormItem, Table, TableColumn,
  Pagination, Dialog, Drawer,
  DatePicker, TimePicker, TimeSelect,
  Checkbox, CheckboxGroup, CheckboxButton,
  Radio, RadioGroup, RadioButton,
  Switch, Upload, Transfer, Cascader,
  Menu, MenuItem, Submenu,
  Tabs, TabPane,
  Breadcrumb, BreadcrumbItem,
  Steps, Step,
  Tag, Badge, Card, Tree,
  Tooltip, Popover, Dropdown, DropdownMenu, DropdownItem,
  Alert
]

components.forEach(component => Vue.use(component))

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## CDN Import

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- Import Element UI CSS -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<body>
  <div id="app">
    <el-button @click="visible = true">点击打开 Dialog</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>欢迎使用 Element UI</p>
    </el-dialog>
  </div>
</body>
<!-- Import Vue 2 before Element UI -->
<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<!-- Import Element UI JS -->
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
