# Tree Component / 树形控件

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/tree

## Instructions

This example demonstrates the Tree component in Element UI 2.x.

### Key Concepts

- Basic tree
- Checkbox tree
- Lazy loading tree
- Custom node content
- Tree methods

### Example: Basic Tree

```vue
<template>
  <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [{ label: '三级 1-1-1' }]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            { label: '二级 2-1' },
            { label: '二级 2-2' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log('Clicked node:', data)
    }
  }
}
</script>
```

### Example: Checkbox Tree

```vue
<template>
  <div>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-checked-keys="[5]"
      :default-expanded-keys="[2, 3]"
    />
    <el-button @click="getChecked">获取选中节点</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [{ id: 9, label: '三级 1-1-1' }]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ]
        }
      ],
      defaultProps: { children: 'children', label: 'label' }
    }
  },
  methods: {
    getChecked() {
      const checkedNodes = this.$refs.tree.getCheckedNodes()
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      console.log('Checked nodes:', checkedNodes)
      console.log('Checked keys:', checkedKeys)
    }
  }
}
</script>
```

### Example: Custom Node Content

```vue
<template>
  <el-tree :data="treeData" :props="defaultProps" node-key="id">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button type="text" size="mini" @click="append(data)">添加</el-button>
        <el-button type="text" size="mini" @click="remove(node, data)">删除</el-button>
      </span>
    </span>
  </el-tree>
</template>

<script>
let id = 1000
export default {
  data() {
    return {
      treeData: [{ id: 1, label: '节点1', children: [] }],
      defaultProps: { children: 'children', label: 'label' }
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: '新节点', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>
```

### Key Points

- `data` prop accepts array of tree nodes
- `props` maps node fields: `{ children: 'children', label: 'label' }`
- `node-key` is required for checkbox tree and programmatic operations
- `show-checkbox` enables checkbox selection
- `default-expanded-keys` / `default-checked-keys` for initial state
- Use `slot-scope="{ node, data }"` for custom node rendering
- `this.$refs.tree.getCheckedNodes()` / `getCheckedKeys()` for getting selections
- `this.$refs.tree.setCheckedKeys([])` for programmatic selection
