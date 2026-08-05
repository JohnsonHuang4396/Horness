# Upload Component / 上传

**官方文档**: https://element.eleme.cn/2.15/#/zh-CN/component/upload

## Instructions

This example demonstrates the Upload component in Element UI 2.x.

### Key Concepts

- Basic file upload
- Image upload with preview
- Multiple file upload
- Custom upload request
- Upload validation

### Example: Basic Upload

```vue
<template>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="beforeUpload"
  >
    <el-button type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  methods: {
    beforeUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt500K = file.size / 1024 < 500
      if (!isJPGorPNG) {
        this.$message.error('上传文件只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt500K) {
        this.$message.error('上传文件大小不能超过 500KB!')
        return false
      }
      return true
    },
    handleSuccess(response, file, fileList) {
      this.$message.success('上传成功')
      console.log('Response:', response)
    },
    handleError(err, file, fileList) {
      this.$message.error('上传失败')
    }
  }
}
</script>
```

### Example: Image Upload with Preview

```vue
<template>
  <el-upload
    class="avatar-uploader"
    action="/api/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('上传头像图片只能是图片格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  width: 178px;
  height: 178px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
```

### Example: Custom HTTP Request

```vue
<template>
  <el-upload
    :http-request="customUpload"
    :on-success="handleSuccess"
    :file-list="fileList"
    list-type="text"
    multiple
  >
    <el-button type="primary">自定义上传</el-button>
  </el-upload>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return { fileList: [] }
  },
  methods: {
    async customUpload(options) {
      const formData = new FormData()
      formData.append('file', options.file)
      formData.append('token', 'your-token')
      try {
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (e) => {
            options.onProgress({ percent: Math.round(e.loaded / e.total * 100) })
          }
        })
        options.onSuccess(res.data)
      } catch (err) {
        options.onError(err)
      }
    },
    handleSuccess(res, file) {
      this.$message.success(`${file.name} 上传成功`)
    }
  }
}
</script>
```

### Key Points

- `action` is the upload URL
- `before-upload` hook for validation (return false to cancel)
- `on-success` / `on-error` for upload result handling
- `show-file-list` controls file list display
- `multiple` allows multiple file selection
- `limit` limits the number of files
- `accept` restricts file types (e.g., `accept=".jpg,.png"`)
- `http-request` for custom upload logic (overrides `action`)
- `list-type`: `text` | `picture` | `picture-card`
- Use `headers` prop to add custom request headers
