# Component API Reference

## API Reference

Element UI 2.x component props, events, methods, and slots.

### Common Props

Most components support:
- `size` - Component size: `'medium'` | `'small'` | `'mini'`
- `disabled` - Disabled state: `Boolean`, default `false`
- `placeholder` - Placeholder text: `String`

### Common Events

Most form components emit:
- `@change` - Value change event (fires on blur/confirm)
- `@input` - Input event (fires on every keystroke, for input components)
- `@focus` - Focus event
- `@blur` - Blur event

---

### Button (`el-button`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | String | — | `primary` / `success` / `warning` / `danger` / `info` / `text` |
| `size` | String | — | `medium` / `small` / `mini` |
| `plain` | Boolean | false | Plain button style |
| `round` | Boolean | false | Round button |
| `circle` | Boolean | false | Circle button |
| `loading` | Boolean | false | Loading state |
| `disabled` | Boolean | false | Disabled state |
| `icon` | String | — | Icon class name (e.g. `el-icon-search`) |
| `native-type` | String | `button` | Native button type |

**Events:** `@click`

---

### Input (`el-input`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | String/Number | — | Bound value |
| `type` | String | `text` | `text` / `textarea` / `password` |
| `size` | String | — | `medium` / `small` / `mini` |
| `disabled` | Boolean | false | Disabled state |
| `readonly` | Boolean | false | Readonly state |
| `clearable` | Boolean | false | Show clear button |
| `show-password` | Boolean | false | Password toggle |
| `placeholder` | String | — | Placeholder text |
| `maxlength` | Number | — | Max character length |
| `show-word-limit` | Boolean | false | Show word count |
| `prefix-icon` | String | — | Prefix icon class |
| `suffix-icon` | String | — | Suffix icon class |
| `rows` | Number | 2 | Textarea rows |
| `autosize` | Boolean/Object | false | Textarea auto resize |

**Events:** `@input`, `@change`, `@focus`, `@blur`, `@clear`

**Slots:** `prefix`, `suffix`, `prepend`, `append`

**Methods:** `focus()`, `blur()`, `select()`

---

### Form (`el-form`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `model` | Object | — | Form data object |
| `rules` | Object | — | Validation rules |
| `label-width` | String | — | Label width (e.g. `'80px'`) |
| `label-position` | String | `right` | `left` / `right` / `top` |
| `inline` | Boolean | false | Inline form layout |
| `size` | String | — | Global size for form items |
| `disabled` | Boolean | false | Disable all form items |
| `hide-required-asterisk` | Boolean | false | Hide required asterisk |

**Methods:**
- `validate(callback)` - Validate all fields
- `validateField(props, callback)` - Validate specific fields
- `resetFields()` - Reset all fields to initial values
- `clearValidate(props)` - Clear validation messages

**Events:** `@validate(prop, isValid, message)`

---

### Form Item (`el-form-item`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | String | — | Label text |
| `prop` | String | — | Field name in model (required for validation) |
| `rules` | Object/Array | — | Item-level validation rules |
| `required` | Boolean | false | Mark as required |
| `label-width` | String | — | Override form label-width |
| `error` | String | — | Custom error message |

---

### Select (`el-select`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | String/Number/Array | — | Bound value |
| `multiple` | Boolean | false | Multiple selection |
| `disabled` | Boolean | false | Disabled state |
| `clearable` | Boolean | false | Show clear button |
| `filterable` | Boolean | false | Enable search |
| `remote` | Boolean | false | Remote search mode |
| `remote-method` | Function | — | Remote search function |
| `loading` | Boolean | false | Loading state |
| `placeholder` | String | `请选择` | Placeholder text |
| `collapse-tags` | Boolean | false | Collapse multiple tags |
| `multiple-limit` | Number | 0 | Max selections (0 = unlimited) |

**Events:** `@change`, `@visible-change`, `@remove-tag`, `@clear`, `@blur`, `@focus`

---

### Table (`el-table`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | — | Table data |
| `height` | String/Number | — | Fixed height (enables fixed header) |
| `max-height` | String/Number | — | Max height |
| `stripe` | Boolean | false | Striped rows |
| `border` | Boolean | false | Cell borders |
| `size` | String | — | `medium` / `small` / `mini` |
| `fit` | Boolean | true | Auto fit container width |
| `show-header` | Boolean | true | Show table header |
| `highlight-current-row` | Boolean | false | Highlight selected row |
| `row-key` | String/Function | — | Row unique key |
| `default-sort` | Object | — | Default sort: `{ prop, order }` |
| `empty-text` | String | `暂无数据` | Empty state text |

**Events:** `@selection-change`, `@row-click`, `@row-dblclick`, `@cell-click`, `@sort-change`, `@filter-change`, `@current-change`

**Methods:** `clearSelection()`, `toggleRowSelection(row, selected)`, `toggleAllSelection()`, `setCurrentRow(row)`, `clearSort()`, `clearFilter()`

---

### Table Column (`el-table-column`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | String | — | `selection` / `index` / `expand` |
| `prop` | String | — | Data field name |
| `label` | String | — | Column header |
| `width` | String/Number | — | Column width |
| `min-width` | String/Number | — | Min column width |
| `fixed` | String/Boolean | — | `true`/`left` / `right` |
| `sortable` | Boolean/String | false | `true` / `'custom'` |
| `filters` | Array | — | Filter options |
| `filter-method` | Function | — | Filter function |
| `formatter` | Function | — | Cell formatter |
| `align` | String | `left` | `left` / `center` / `right` |
| `show-overflow-tooltip` | Boolean | false | Show tooltip on overflow |

**Slots:** `default` (scoped: `{ row, column, $index }`), `header`

---

### Dialog (`el-dialog`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | Boolean | — | Visibility (use `.sync`) |
| `title` | String | — | Dialog title |
| `width` | String | `50%` | Dialog width |
| `fullscreen` | Boolean | false | Fullscreen mode |
| `top` | String | `15vh` | Top margin |
| `modal` | Boolean | true | Show backdrop |
| `append-to-body` | Boolean | false | Render in body |
| `close-on-click-modal` | Boolean | true | Close on backdrop click |
| `close-on-press-escape` | Boolean | true | Close on ESC |
| `show-close` | Boolean | true | Show close button |
| `before-close` | Function | — | Hook before close |
| `destroy-on-close` | Boolean | false | Destroy content on close |

**Events:** `@open`, `@opened`, `@close`, `@closed`

**Slots:** `default` (content), `title`, `footer`

---

### Pagination (`el-pagination`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current-page` | Number | 1 | Current page (use `.sync`) |
| `page-size` | Number | 10 | Items per page |
| `total` | Number | — | Total item count |
| `page-sizes` | Array | `[10,20,30,40,50,100]` | Page size options |
| `layout` | String | `prev,pager,next,jumper,...` | Layout elements |
| `small` | Boolean | false | Small pagination |
| `background` | Boolean | false | Pager background |
| `disabled` | Boolean | false | Disabled state |
| `hide-on-single-page` | Boolean | false | Hide when only one page |

**Events:** `@size-change(pageSize)`, `@current-change(currentPage)`, `@prev-click`, `@next-click`

---

### DatePicker (`el-date-picker`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `v-model` | Date/String/Array | — | Bound value |
| `type` | String | `date` | `date`/`week`/`month`/`year`/`datetime`/`daterange`/`datetimerange` |
| `format` | String | — | Display format (e.g. `yyyy-MM-dd`) |
| `value-format` | String | — | Bound value format |
| `placeholder` | String | — | Placeholder |
| `start-placeholder` | String | — | Range start placeholder |
| `end-placeholder` | String | — | Range end placeholder |
| `range-separator` | String | `-` | Range separator |
| `picker-options` | Object | — | Picker options (shortcuts, disabledDate) |
| `clearable` | Boolean | true | Show clear button |
| `disabled` | Boolean | false | Disabled state |
| `readonly` | Boolean | false | Readonly state |

**Events:** `@change`, `@blur`, `@focus`

---

### Upload (`el-upload`)

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | String | — | Upload URL |
| `headers` | Object | — | Request headers |
| `multiple` | Boolean | false | Multiple file upload |
| `data` | Object | — | Extra request data |
| `name` | String | `file` | File field name |
| `with-credentials` | Boolean | false | Send cookies |
| `show-file-list` | Boolean | true | Show file list |
| `accept` | String | — | Accepted file types |
| `list-type` | String | `text` | `text`/`picture`/`picture-card` |
| `limit` | Number | — | Max file count |
| `http-request` | Function | — | Custom upload function |
| `before-upload` | Function | — | Hook before upload |
| `before-remove` | Function | — | Hook before remove |
| `on-success` | Function | — | Success callback |
| `on-error` | Function | — | Error callback |
| `on-progress` | Function | — | Progress callback |
| `on-change` | Function | — | File change callback |
| `on-exceed` | Function | — | Exceed limit callback |
| `on-remove` | Function | — | Remove callback |
| `file-list` | Array | `[]` | Initial file list |

**Methods:** `clearFiles()`, `abort(file)`, `submit()`

**See also:** `examples/components/` for detailed component examples
