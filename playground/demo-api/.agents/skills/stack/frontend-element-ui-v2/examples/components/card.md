# Card Component / 卡片

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/card

## Instructions

This example demonstrates the Card component in Element UI 2.x.

### Key Concepts

- Basic card
- Card with header
- Card shadow
- Card with image

### Example: Basic Card

```vue
<template>
  <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</template>

<style>
.text { font-size: 14px; }
.item { margin-bottom: 18px; }
.box-card { width: 480px; }
</style>
```

### Example: Card with Header

```vue
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</template>
```

### Example: Card Shadow

```vue
<template>
  <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="always">总是显示</el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">鼠标悬浮时显示</el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="never">从不显示</el-card>
    </el-col>
  </el-row>
</template>
```

### Example: Card with Image (Article Card)

```vue
<template>
  <el-row>
    <el-col
      v-for="(article, index) in articles"
      :key="index"
      :span="8"
      style="padding: 10px"
    >
      <el-card :body-style="{ padding: '0px' }">
        <img :src="article.image" class="image">
        <div style="padding: 14px;">
          <span>{{ article.title }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ article.date }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        { title: '好吃的汉堡', date: '2016-09-06', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' },
        { title: '好吃的汉堡', date: '2016-09-06', image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png' }
      ]
    }
  }
}
</script>

<style>
.time { font-size: 13px; color: #999; }
.bottom { margin-top: 13px; line-height: 12px; }
.button { padding: 0; float: right; }
.image { width: 100%; display: block; }
.clearfix:before, .clearfix:after { display: table; content: ""; }
.clearfix:after { clear: both; }
</style>
```

### Key Points

- `slot="header"` for card header content
- `shadow`: `always` (default) | `hover` | `never`
- `:body-style` for custom body padding/style
- Card is a simple container with optional header and shadow
- Use `el-row` + `el-col` for card grid layouts
