<template>
    <div class="student-info" v-loading="loading">
        <el-button @click="triggerUpload" v-if="selectedFile && msg === '简历未上传'" type="primary">提交上传</el-button>
        <el-upload
            ref="upload"
            action="#"
            :limit="1"
            :auto-upload="false"
            :on-change="handleChange"
            v-if="msg === '简历未上传'"
        >
            <el-button v-if="!selectedFile" type="primary">选择图片</el-button>
        </el-upload>
        <div style="display: flex; align-items: center;" v-if="msg !== '简历未上传' && resumeUrl">
            <el-button type="primary" @click="deleteResume">删除简历图片</el-button>
            <span style="margin-left: 10px;font-weight: bold; color: red;">请先删除再重新上传！</span>
        </div>
        <img style="margin-top: 20px;" width="80%" :src="resumeUrl" alt="简历图片" v-if="msg !== '简历未上传' && resumeUrl">
    </div>
</template>

<script>
import { resumeFind, resumeDelete, resumeUpload } from '@/api/student'
import axios from 'axios'
export default {
    name: 'StudentInfo',
    data() {
        return {
            studentInfo: {},
            msg: '',
            resumeUrl: '',
            loading: false,
            fileList: [],
            selectedFile: null
        }
    },
    props: {
        userId: {
            type: Number,
            default: 0
        }
    },
    methods: {
        getResumeFind() {
            this.loading = true
            resumeFind(
                {
                    user_id: this.userId
                }
            ).then(res => {
                if (res.code === '201') {
                    this.msg = res.msg
                    this.$message.warning(this.msg)
                }else {
                    this.resumeUrl = process.env.VUE_APP_BASE_API + '/resume/' + res.resumeUrl
                }
            }).finally(() => {
                this.loading = false
            })
        },
        deleteResume() {
            resumeDelete(
                {
                    user_id: this.userId
                }
            ).then(res => {
                this.$message.success('简历图片删除成功！')
                this.msg = '简历未上传'
                this.resumeUrl = ''
            })
        },
        triggerUpload() {
            const formData = new FormData();
            formData.append('file', this.selectedFile); // 文件流
            formData.append('user_id', this.userId);
            axios.post(process.env.VUE_APP_BASE_API + '/resume/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                // this.$refs.upload.submit();
                this.resumeUrl = process.env.VUE_APP_BASE_API + '/resume/' + res.data.fileName
                this.msg = '简历图片上传成功！'
                this.$message.success('简历图片上传成功！');
                this.$refs.upload.clearFiles()
            })
        },
        handleChange(file, fileList) {
            this.selectedFile = file.raw;
        }
    },
    mounted() {
        this.getResumeFind()
    }
}
</script>

<style lang="scss" scoped>
.student-info {
    width: 100%;
    height: 100%;
    // background-color: red;
}
</style>