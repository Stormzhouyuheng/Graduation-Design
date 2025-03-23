<template>
  <div class="upload-container">
    <el-upload
      ref="upload"
      :action="'#'"
      :auto-upload="false"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    
    <!-- 将提交按钮移到el-upload外部 -->
    <el-button 
      style="margin-left: 10px;" 
      size="small" 
      type="success" 
      @click="submitUpload"
      :disabled="!fileList.length"
    >
      上传到服务器
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      fileList: [],
      uploadFile: null
    }
  },
  methods: {
    // 文件状态改变时的钩子
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1) // 只保留最后一个文件
      this.uploadFile = file.raw // 保存文件对象
      console.log('选择的文件:', file.raw)
    },
    
    // 文件移除时的钩子
    handleRemove(file, fileList) {
      this.fileList = fileList
      this.uploadFile = null
      console.log('移除文件:', file)
    },
    
    // 上传文件之前的钩子
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt500K = file.size / 1024 < 500

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt500K) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      
      // 返回false会阻止自动上传
      return false
    },
    
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning('当前限制选择 1 个文件')
    },
    
    // 手动上传文件
    submitUpload() {
      if (!this.uploadFile) {
        this.$message.warning('请先选择文件')
        return
      }
      
      // 这里可以使用 FormData 来处理文件上传
      const formData = new FormData()
      formData.append('file', this.uploadFile)
      
      // 在这里处理文件上传逻辑
      console.log('准备上传的文件:', this.uploadFile)
      console.log('FormData:', formData)
      
      // 示例：调用上传API
      // uploadAPI(formData).then(res => {
      //   this.$message.success('上传成功')
      // }).catch(err => {
      //   this.$message.error('上传失败')
      // })
    }
  }
}
</script>

<style scoped>
.upload-container {
  padding: 20px;
  display: flex;
  align-items: center;
}
.el-upload__tip {
  margin-top: 10px;
  color: #666;
}
</style> 