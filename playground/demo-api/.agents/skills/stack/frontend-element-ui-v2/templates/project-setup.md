# Project Setup Templates

## Vue CLI Project Setup

```bash
# Create Vue 2 project with Vue CLI
vue create my-app
# Select: Vue 2, Babel, Router, Vuex (as needed)

# Install Element UI
cd my-app
npm install element-ui
```

```javascript
// src/main.js - Full import
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## Vue CLI + On-Demand Import Setup

```bash
# Install babel plugin for on-demand import
npm install babel-plugin-component -D
```

```javascript
// babel.config.js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
```

```javascript
// src/plugins/element.js
import Vue from 'vue'
import {
  Button, Input, Select, Option,
  Form, FormItem, Table, TableColumn,
  Pagination, Dialog, Drawer,
  DatePicker, Switch, Checkbox, CheckboxGroup,
  Radio, RadioGroup, Upload, Tag, Badge,
  Menu, MenuItem, Submenu,
  Tabs, TabPane, Steps, Step,
  Breadcrumb, BreadcrumbItem,
  Card, Tree, Tooltip, Popover,
  Dropdown, DropdownMenu, DropdownItem,
  Alert, Loading, Message, MessageBox, Notification
} from 'element-ui'

const components = [
  Button, Input, Select, Option,
  Form, FormItem, Table, TableColumn,
  Pagination, Dialog, Drawer,
  DatePicker, Switch, Checkbox, CheckboxGroup,
  Radio, RadioGroup, Upload, Tag, Badge,
  Menu, MenuItem, Submenu,
  Tabs, TabPane, Steps, Step,
  Breadcrumb, BreadcrumbItem,
  Card, Tree, Tooltip, Popover,
  Dropdown, DropdownMenu, DropdownItem,
  Alert
]

components.forEach(c => Vue.use(c))

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
```

```javascript
// src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## Custom Theme Setup

```bash
# Install sass-loader and sass (for SCSS support)
npm install sass-loader sass -D
```

```scss
/* src/styles/element-variables.scss */
$--color-primary: #1890ff;
$--font-path: '~element-ui/lib/theme-chalk/fonts';
@import "~element-ui/packages/theme-chalk/src/index";
```

```javascript
// src/main.js - Import custom theme instead of default CSS
import Vue from 'vue'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'  // Custom theme
import App from './App.vue'

Vue.use(ElementUI)
new Vue({ render: h => h(App) }).$mount('#app')
```

## Webpack Project Setup

```bash
# Install dependencies
npm install vue vue-router vuex element-ui
npm install webpack webpack-cli webpack-dev-server -D
npm install vue-loader vue-template-compiler css-loader style-loader -D
npm install babel-loader @babel/core @babel/preset-env -D
npm install babel-plugin-component -D
```

```javascript
// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(woff2?|eot|ttf|otf)$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
}
```

## Typical Admin Project Structure

```
src/
├── api/              # API request modules
│   ├── user.js
│   └── index.js
├── assets/           # Static assets
├── components/       # Shared components
│   ├── Table/
│   └── Form/
├── layout/           # Layout components
│   ├── index.vue
│   ├── Sidebar/
│   └── Header/
├── plugins/
│   └── element.js    # Element UI registration
├── router/
│   └── index.js
├── store/
│   └── index.js
├── styles/
│   ├── index.scss
│   └── element-variables.scss
├── utils/
│   └── request.js    # Axios instance
├── views/            # Page components
│   ├── Dashboard/
│   ├── User/
│   └── Login/
├── App.vue
└── main.js
```
