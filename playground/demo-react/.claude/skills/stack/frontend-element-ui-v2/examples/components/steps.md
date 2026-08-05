# Steps Component / 步骤条

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/steps

## Instructions

This example demonstrates the Steps component in Element UI 2.x.

### Key Concepts

- Basic steps
- Step status
- Vertical steps
- Steps with icons
- Simple style

### Example: Basic Steps

```vue
<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" />
      <el-step title="步骤 2" />
      <el-step title="步骤 3" />
    </el-steps>
    <el-button style="margin-top: 12px" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return { active: 0 }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>
```

### Example: Steps with Description

```vue
<template>
  <el-steps :active="1">
    <el-step title="已完成" description="这里是该步骤的描述信息" />
    <el-step title="进行中" description="这里是该步骤的描述信息" />
    <el-step title="待进行" description="这里是该步骤的描述信息" />
    <el-step title="待进行" description="这里是该步骤的描述信息" />
  </el-steps>
</template>
```

### Example: Step Status

```vue
<template>
  <el-steps space="200" :active="1" finish-status="success">
    <el-step title="已完成" />
    <el-step title="进行中" />
    <el-step title="步骤 3" />
  </el-steps>
</template>
```

### Example: Steps with Icons

```vue
<template>
  <el-steps :active="1">
    <el-step title="步骤1" icon="el-icon-edit" />
    <el-step title="步骤2" icon="el-icon-upload" />
    <el-step title="步骤3" icon="el-icon-picture" />
  </el-steps>
</template>
```

### Example: Vertical Steps

```vue
<template>
  <el-steps direction="vertical" :active="1">
    <el-step title="步骤 1" description="这里是该步骤的描述信息" />
    <el-step title="步骤 2" description="这里是该步骤的描述信息" />
    <el-step title="步骤 3" description="这里是该步骤的描述信息" />
  </el-steps>
</template>
```

### Example: Simple Style

```vue
<template>
  <el-steps :space="200" :active="1" simple>
    <el-step title="实名认证" icon="el-icon-edit" />
    <el-step title="资质认证" icon="el-icon-upload" />
    <el-step title="完成" icon="el-icon-picture" />
  </el-steps>
</template>
```

### Example: Multi-Step Form

```vue
<template>
  <div>
    <el-steps :active="currentStep" finish-status="success" align-center>
      <el-step title="基本信息" />
      <el-step title="详细信息" />
      <el-step title="完成" />
    </el-steps>

    <div v-if="currentStep === 0">
      <!-- Step 1 content -->
      <el-form :model="form1" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form1.name" />
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="currentStep === 1">
      <!-- Step 2 content -->
      <el-form :model="form2" label-width="80px">
        <el-form-item label="地址">
          <el-input v-model="form2.address" />
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
      <el-result icon="success" title="提交成功" />
    </div>

    <div style="margin-top: 20px">
      <el-button v-if="currentStep > 0" @click="currentStep--">上一步</el-button>
      <el-button v-if="currentStep < 2" type="primary" @click="currentStep++">下一步</el-button>
      <el-button v-if="currentStep === 2" type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      form1: { name: '' },
      form2: { address: '' }
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('提交成功！')
    }
  }
}
</script>
```

### Key Points

- `active` (number) controls the current active step (0-indexed)
- `finish-status`: `wait` | `process` | `finish` | `error` | `success`
- `direction`: `horizontal` (default) | `vertical`
- `align-center` centers the step title and description
- `simple` for a simplified step style
- `space` sets the spacing between steps (px or %)
- Each `el-step` can have `title`, `description`, `icon`, `status`
