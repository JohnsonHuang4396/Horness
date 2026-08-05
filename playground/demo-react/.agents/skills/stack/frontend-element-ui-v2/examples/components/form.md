# Form Component / 表单

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/form

## Instructions

This example demonstrates the Form component in Element UI 2.x.

### Key Concepts

- Form model binding
- Validation rules
- Form submission
- Form reset
- Inline form
- Custom validators

### Example: Basic Form with Validation

```vue
<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-form"
  >
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="活动区域" prop="region">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>

    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>

    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type" />
        <el-checkbox label="地推活动" name="type" />
        <el-checkbox label="线下主题活动" name="type" />
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助" />
        <el-radio label="线下场地免费" />
      </el-radio-group>
    </el-form-item>

    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="form.desc" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('提交成功!')
        } else {
          this.$message.error('表单验证失败，请检查填写内容')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
```

### Example: Custom Validator

```vue
<script>
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      form: { phone: '' },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }]
      }
    }
  }
}
</script>
```

### Example: Inline Form

```vue
<template>
  <el-form :inline="true" :model="formInline">
    <el-form-item label="审批人">
      <el-input v-model="formInline.user" placeholder="审批人" />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="formInline.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
```

### Key Points

- Bind `:model` to the form data object
- Bind `:rules` to the validation rules object
- Add `ref="formRef"` to call `this.$refs.formRef.validate()`
- Each `el-form-item` needs `prop` matching the rules key
- `trigger: 'blur'` validates on blur, `trigger: 'change'` on value change
- `resetFields()` resets to initial values and clears validation
- `clearValidate()` only clears validation messages
- Custom validators use `(rule, value, callback)` signature
- Call `callback()` for pass, `callback(new Error('msg'))` for fail
