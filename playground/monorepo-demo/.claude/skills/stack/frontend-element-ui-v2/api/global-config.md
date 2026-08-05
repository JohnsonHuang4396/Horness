# Global Configuration API

## Global Configuration in Element UI 2.x

### Vue.use() Options

When registering Element UI, you can pass global options:

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
  size: 'small',    // Global default component size
  zIndex: 3000      // Global initial z-index for popups/dialogs
})
```

#### size
**Type:** `'medium' | 'small' | 'mini'`  
**Default:** `'medium'`

Sets the default size for all form components (Button, Input, Select, etc.).

#### zIndex
**Type:** `Number`  
**Default:** `2000`

Sets the initial z-index for popups, dialogs, and overlays.

---

### On-Demand Import Configuration

When using `babel-plugin-component` for on-demand import:

```json
// .babelrc
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

```javascript
// main.js - Import only what you need
import Vue from 'vue'
import {
  Button,
  Input,
  Select,
  Option,
  Form,
  FormItem,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Message,
  MessageBox,
  Notification,
  Loading
} from 'element-ui'

// Register components
const components = [
  Button, Input, Select, Option,
  Form, FormItem, Table, TableColumn,
  Pagination, Dialog
]
components.forEach(component => Vue.use(component))

// Register services
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
```

---

### Theme Configuration

#### Method 1: SCSS Variable Override

```scss
/* src/element-variables.scss */
$--color-primary: #409EFF;
$--font-path: '~element-ui/lib/theme-chalk/fonts';
@import "~element-ui/packages/theme-chalk/src/index";
```

```javascript
// main.js - Import custom theme instead of default CSS
import './element-variables.scss'
```

#### Method 2: element-theme CLI

```bash
npm install element-theme -g
npm install element-theme-chalk -D
et -i          # Initialize element-variables.scss
# Edit element-variables.scss
et             # Build custom theme to ./theme/
```

```javascript
// main.js
import './theme/index.css'
```

#### Common SCSS Variables

```scss
// Primary colors
$--color-primary: #409EFF;
$--color-success: #67C23A;
$--color-warning: #E6A23C;
$--color-danger: #F56C6C;
$--color-info: #909399;

// Text colors
$--color-text-primary: #303133;
$--color-text-regular: #606266;
$--color-text-secondary: #909399;
$--color-text-placeholder: #C0C4CC;

// Border
$--border-color-base: #DCDFE6;
$--border-color-light: #E4E7ED;
$--border-radius-base: 4px;
$--border-radius-small: 2px;

// Font
$--font-size-base: 14px;
$--font-size-small: 13px;
$--font-size-extra-small: 12px;
$--font-path: '~element-ui/lib/theme-chalk/fonts';

// Component sizes
$--input-height: 40px;
$--input-medium-height: 36px;
$--input-small-height: 32px;
$--input-mini-height: 28px;
```

---

### Locale Configuration

```javascript
// Chinese (default)
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })

// English
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })

// Dynamic switching
import ElementLocale from 'element-ui/lib/locale'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'

ElementLocale.use(zhLocale)  // Switch to Chinese
ElementLocale.use(enLocale)  // Switch to English
```

**Available locales:** `zh-CN`, `zh-TW`, `en`, `ja`, `ko`, `fr`, `de`, `es`, `ru`, and 40+ more in `element-ui/lib/locale/lang/`

---

### Vue.prototype Methods

After `Vue.use(ElementUI)`, the following are added to `Vue.prototype`:

| Method | Description |
|--------|-------------|
| `this.$message` | Toast message service |
| `this.$notify` | Notification service |
| `this.$msgbox` | MessageBox service |
| `this.$alert` | Alert dialog |
| `this.$confirm` | Confirm dialog |
| `this.$prompt` | Prompt dialog |
| `this.$loading` | Loading service |

**See also:** `api/props-and-events.md` for usage examples
