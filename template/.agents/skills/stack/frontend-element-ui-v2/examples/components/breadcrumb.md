# Breadcrumb Component / 面包屑

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/breadcrumb

## Instructions

This example demonstrates the Breadcrumb component in Element UI 2.x.

### Key Concepts

- Basic breadcrumb
- Custom separator
- Breadcrumb with router links
- Dynamic breadcrumb

### Example: Basic Breadcrumb

```vue
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>
```

### Example: Custom Separator Icon

```vue
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>
```

### Example: Dynamic Breadcrumb from Route

```vue
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :to="index < breadcrumbs.length - 1 ? { path: item.path } : null"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      // Build breadcrumbs from matched routes
      return this.$route.matched
        .filter(item => item.meta && item.meta.title)
        .map(item => ({
          title: item.meta.title,
          path: item.path
        }))
    }
  }
}
</script>
```

### Example: Breadcrumb in Layout

```vue
<template>
  <div class="app-breadcrumb">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in levelList"
          :key="item.path"
        >
          <span
            v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
            class="no-redirect"
          >
            {{ item.meta.title }}
          </span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return { levelList: [] }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>
```

### Key Points

- `separator` sets the separator character (default `/`)
- `separator-class` uses an icon class as separator
- `:to` on `el-breadcrumb-item` for router navigation (same as `router-link`)
- Last breadcrumb item is typically non-clickable (current page)
- Use `$route.matched` to build dynamic breadcrumbs from vue-router
- Add `meta.title` to route definitions for breadcrumb labels
