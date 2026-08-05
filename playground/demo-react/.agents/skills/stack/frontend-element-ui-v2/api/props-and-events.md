# Props and Events Reference

## Common Props and Events in Element UI 2.x

### Common Props

#### size
**Type:** `'medium' | 'small' | 'mini'`

Component size. Can be set globally via `Vue.use(ElementUI, { size: 'small' })`.

#### disabled
**Type:** `Boolean`  
**Default:** `false`

Whether the component is disabled.

#### placeholder
**Type:** `String`

Placeholder text shown when no value is selected/entered.

#### clearable
**Type:** `Boolean`  
**Default:** `false`

Whether to show a clear button. Supported by: Input, Select, DatePicker, TimePicker, Cascader.

---

### Common Events

#### @change
**Payload:** new value

Fires when the value changes (on blur or confirm, not on every keystroke).

```vue
<el-input v-model="value" @change="handleChange" />
<el-select v-model="value" @change="handleChange" />
```

#### @input
**Payload:** current value (string)

Fires on every keystroke. Only available on `el-input`.

```vue
<el-input v-model="value" @input="handleInput" />
```

#### @focus
**Payload:** Event object

Fires when the component gains focus.

#### @blur
**Payload:** Event object

Fires when the component loses focus.

#### @clear
Fires when the clear button is clicked (requires `clearable`).

---

### Vue 2 Specific Patterns

#### v-model
Two-way data binding. In Vue 2, `v-model` is shorthand for `:value` + `@input`.

```vue
<!-- These are equivalent -->
<el-input v-model="value" />
<el-input :value="value" @input="value = $event" />
```

#### .sync Modifier
Used for two-way binding on non-value props (e.g., dialog visibility).

```vue
<!-- These are equivalent -->
<el-dialog :visible.sync="dialogVisible" />
<el-dialog :visible="dialogVisible" @update:visible="dialogVisible = $event" />
```

#### slot-scope (Scoped Slots)
Vue 2 syntax for scoped slots (use `slot-scope`, NOT `v-slot`).

```vue
<!-- Vue 2 syntax (Element UI 2.x) -->
<el-table-column>
  <template slot-scope="scope">
    {{ scope.row.name }}
  </template>
</el-table-column>

<!-- Vue 3 syntax (Element Plus) - DO NOT use with Element UI 2.x -->
<el-table-column>
  <template #default="scope">
    {{ scope.row.name }}
  </template>
</el-table-column>
```

#### Named Slots
Vue 2 syntax for named slots.

```vue
<!-- Vue 2 syntax -->
<el-dialog>
  <span slot="footer">
    <el-button>Cancel</el-button>
  </span>
</el-dialog>
```

---

### Form Validation Rules

Validation rules follow `async-validator` library format:

```javascript
rules: {
  // Required field
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  // Length constraint
  username: [
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  // Type validation
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  // Number range
  age: [
    { type: 'number', min: 1, max: 120, message: '年龄在1到120之间', trigger: 'change' }
  ],
  // Array (for checkbox-group)
  tags: [
    { type: 'array', required: true, message: '请至少选择一项', trigger: 'change' }
  ],
  // Regex pattern
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  // Custom validator
  password: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else if (value.length < 6) {
          callback(new Error('密码长度不少于6位'))
        } else {
          callback()  // Pass validation
        }
      },
      trigger: 'blur'
    }
  ]
}
```

**Trigger options:**
- `'blur'` - Validate when field loses focus
- `'change'` - Validate when value changes
- `['blur', 'change']` - Validate on both

---

### Programmatic Component APIs

After `Vue.use(ElementUI)`, these are available on all Vue instances:

#### this.$message(options)
```javascript
this.$message('消息内容')
this.$message({ message: '消息', type: 'success', duration: 3000, showClose: true })
this.$message.success('成功')
this.$message.warning('警告')
this.$message.error('错误')
this.$message.info('信息')
this.$message.closeAll()
```

#### this.$notify(options)
```javascript
this.$notify({ title: '标题', message: '内容', type: 'success', duration: 4500 })
this.$notify.success({ title: '成功', message: '内容' })
this.$notify.error({ title: '错误', message: '内容' })
```

#### this.$confirm / $alert / $prompt
```javascript
// Returns Promise
this.$confirm('确认删除?', '提示', { type: 'warning' })
  .then(() => { /* confirmed */ })
  .catch(() => { /* cancelled */ })

this.$alert('内容', '标题', { confirmButtonText: '确定' })

this.$prompt('请输入', '提示', { inputPattern: /\d+/, inputErrorMessage: '请输入数字' })
  .then(({ value }) => { console.log(value) })
```

#### this.$loading(options)
```javascript
const loading = this.$loading({
  lock: true,
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
})
loading.close()
```

**See also:** `examples/components/` for component-specific examples
