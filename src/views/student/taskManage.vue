<template>
    <div>
        <div v-if="Object.keys(currentTeacher).length > 0">
            <el-form ref="currentTeacher" :model="currentTeacher" label-width="110px">
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="教师工号：">
                            <el-tag>{{ currentTeacher.user_id }}</el-tag>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="教师姓名：">
                            <el-tag>{{ currentTeacher.username }}</el-tag>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :type="item.type"
                :prop="item.prop"
                :label="item.label">
                <template slot-scope="scope">
                    <!-- <span v-if="item.prop === 'statue'"></span> -->
                    <div v-if="item.prop === 'statue'">
                        <el-tag v-if="scope.row.statue === '已提交'" type="success">已完成</el-tag>
                        <el-tag v-else type="danger">未完成</el-tag>
                    </div>
                    <div v-else>
                        {{ scope.row[item.prop] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-upload
                        ref="upload"
                        action="#"
                        :limit="1"
                        :on-change="handleChange"
                        :http-request="triggerUpload"
                        v-if="scope.row.isUpload === 'true' && scope.row.statue !== '已提交'"
                    >
                        <el-button type="text" @click="openUpload(scope.row)">上传</el-button>
                    </el-upload>
                    <el-button type="text" v-if="scope.row.statue === '已提交'" @click="cancelUpload(scope.row)">重新提交</el-button>
                    <el-button v-if="scope.row.isUpload === 'false'" type="text" @click="handleEdit(scope.row)">确认</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="选择教师"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="请选择教师：" prop="user_id">
                            <el-select v-model="form.user_id" style="width: 100%">
                                <el-option 
                                    v-for="item in roleUserList" 
                                    :key="item.user_id" 
                                    :label="'NO.' + item.user_id + ' ' + item.username" 
                                    :value="item.user_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { taskStuFind, taskStudelete, taskStuCommit, no, getRoleUser, addNo } from '@/api/student'
import axios from 'axios'
export default {
    name: 'TaskManage',
    props: {
        userId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            title: '',
            form: {
                name: ''
            },
            rules: {
                time: [
                    { required: true, message: '请选择开始日期', trigger: 'blur' }
                ],
                endTime: [
                    { required: true, message: '请选择结束日期', trigger: 'blur' }
                ],
                task: [
                    { required: true, message: '请输入任务描述', trigger: 'blur' }
                ]
            },
            commitForm: {},
            tableData: [],
            columns: [
                {
                    prop: 'time',
                    label: '任务开始日期'
                },
                {
                    prop: 'endTime',
                    label: '任务结束日期'
                },
                {
                    prop: 'statue',
                    label: '完成状态'
                },
                {
                    prop: 'task',
                    label: '任务描述'
                },
            ],
            selectedFile: null,
            currentTeacher: {},
            dialogVisible: false,
            form: {},
            rules: {
                user_id: [
                    { required: true, message: '请输入教师工号', trigger: 'blur' }
                ]
            },
            roleUserList: []
        }
    },
    methods: {
        getTaskList() {
            taskStuFind({
                user_id: this.userId
            }).then(res => {
                let data = []
                res.forEach(item => {
                    data.push({
                        ...item.Task,
                        ...item
                    })
                })
                this.tableData = data
            })
        },
        // submitForm(formName) {
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             if (new Date(this.commitForm.time) > new Date(this.commitForm.endTime)) {
        //                 this.$message.error('开始日期不能大于结束日期')
        //                 return
        //             }
        //             if (this.title === '创建任务') {
        //                 commitTask({
        //                     ...this.commitForm,
        //                     user_id: this.userId
        //                 }).then(res => {
        //                     this.$message.success('创建任务成功')
        //                     this.getTaskList()
        //                     this.dialogVisible = false
        //                 })
        //             }
        //             if (this.title === '编辑任务') {
        //                 taskUpdate({
        //                     ...this.commitForm,
        //                 }).then(res => {
        //                     this.$message.success('编辑任务成功')
        //                     this.getTaskList()
        //                     this.dialogVisible = false
        //                 })
        //             }
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        // createTask() {
        //     this.dialogVisible = true
        //     this.title = '创建任务'
        //     this.commitForm = {}
        // },
        openUpload(row) {
            this.taskId = row.task_id
        },
        handleEdit(row) {
            this.taskId = row.task_id
            taskStuCommit({
                user_id: this.userId,
                task_id: this.taskId,
                isUpload: 'false'
            }).then(res => {
                this.$message.success('任务确认成功！')
                this.getTaskList()
            })
        },
        cancelUpload(row) {
            this.taskId = row.task_id
            taskStudelete({
                user_id: this.userId,
                task_id: this.taskId
            }).then(res => {
                this.$message.success('文件删除成功！')
                this.getTaskList()
            })
        },
        triggerUpload() {
            const formData = new FormData();
            formData.append('file', this.selectedFile); // 文件流
            formData.append('user_id', this.userId);
            formData.append('task_id', this.taskId);
            axios.post(process.env.VUE_APP_BASE_API + '/task/stucommit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                // this.$refs.upload.submit();
                this.resumeUrl = process.env.VUE_APP_BASE_API + '/task/stucommit/' + res.data.fileName
                // this.msg = '上传成功！'
                this.$message.success('文件上传成功！');
                this.$refs.upload.clearFiles()
                this.getTaskList()
            })
        },
        handleChange(file, fileList) {
            this.selectedFile = file.raw;
        },
        getNo() {
            no(
                {
                    user_id: this.userId
                }
            ).then(res => {
                // this.dialogVisible = true
                if(res.code === 201) {
                    this.dialogVisible = true
                }else {
                    this.currentTeacher = res
                    console.log(res)
                }
                
            })
        },
        handleGetRoleUser() {
            getRoleUser({
                role_id: 1
            }).then(res => {
                let data = []
                res.forEach(item => {
                    data.push({
                        ...item.User,
                        ...item
                    })
                })
                this.roleUserList = data
                console.log(this.roleUser)
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        confirm(formName) {
            console.log(this.form);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addNo({
                        user_id: this.userId,
                        teacher_no: this.form.user_id
                    }).then(res => {
                        this.$message.success('添加教师成功')
                        this.dialogVisible = false
                        this.getTaskList()
                        this.getNo()
                    })
                }
            })
        }
    },
    mounted() {
        this.getTaskList()
        this.getNo()
        this.handleGetRoleUser()
    }
}
</script>

<style lang="scss" scoped>

</style>