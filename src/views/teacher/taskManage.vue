<template>
    <div>
        <el-form ref="form" :model="form" label-width="0px">
            <!-- <el-form-item label="日期">
                <el-date-picker
                    v-model="form.value1"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item> -->
            <el-form-item label="">
                <el-button type="primary" @click="createTask">创建任务</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :type="item.type"
                :prop="item.prop"
                :label="item.label">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :title="title"
            width="30%"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <el-form ref="commitForm" :model="commitForm" :rules="rules" label-width="100px">
                <el-form-item label="开始日期" prop="time">
                    <el-date-picker
                        v-model="commitForm.time"
                        type="date"
                        placeholder="选择日期"
                        @change="changeTime"
                        style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="endTime">
                    <el-date-picker
                        v-model="commitForm.endTime"
                        type="date"
                        placeholder="选择日期"
                        @change="changeTime"
                        style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="任务描述" prop="task">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="commitForm.task">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否上传文件" prop="isUpload">
                    <el-switch
                        v-model="commitForm.isUpload"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="是"
                        inactive-text="否"
                        active-value="true"
                        inactive-value="false">
                    </el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('commitForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { commitTask, taskTeaFind, taskUpdate, taskDelete } from '@/api/teacher'
export default {
    name: 'TaskManage',
    props: {
        userId: {
            type: String,
            default: ''
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
            commitForm: {
                // isUpload: true
            },
            dialogVisible: false,
            tableData: [],
            columns: [
                {
                    type: 'index',
                    label: '序号'
                },
                {
                    prop: 'time',
                    label: '任务开始日期'
                },
                {
                    prop: 'endTime',
                    label: '任务结束日期'
                },
                {
                    prop: 'task',
                    label: '任务描述'
                },
            ]
        }
    },
    methods: {
        changeTime() {
            if (new Date(this.commitForm.time) > new Date(this.commitForm.endTime)) {
                this.$message.error('开始日期不能大于结束日期')
                return
            }
        },
        getTaskList() {
            taskTeaFind({
                user_id: this.userId
            }).then(res => {
                this.tableData = res
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (new Date(this.commitForm.time) > new Date(this.commitForm.endTime)) {
                        this.$message.error('开始日期不能大于结束日期')
                        return
                    }
                    if (this.title === '创建任务') {
                        commitTask({
                            ...this.commitForm,
                            user_id: this.userId
                        }).then(res => {
                            this.$message.success('创建任务成功')
                            this.getTaskList()
                            this.dialogVisible = false
                        })
                    }
                    if (this.title === '编辑任务') {
                        taskUpdate({
                            ...this.commitForm,
                        }).then(res => {
                            this.$message.success('编辑任务成功')
                            this.getTaskList()
                            this.dialogVisible = false
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        createTask() {
            this.dialogVisible = true
            this.title = '创建任务'
            this.commitForm = {}
        },
        handleEdit(row) {
            this.title = '编辑任务'
            this.dialogVisible = true
            this.commitForm = row
        },
        handleDelete(row) {
            taskDelete({
                task_id: row.task_id
            }).then(res => {
                this.$message.success('任务删除成功！')
                this.getTaskList()
            })
        },
        handleClose() {
            this.dialogVisible = false
        }
    },
    mounted() {
        this.getTaskList()
    }
}
</script>

<style lang="scss" scoped>

</style>