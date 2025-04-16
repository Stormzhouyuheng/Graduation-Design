<template>
    <div>
        <el-button type="primary" @click="add('新增')" v-if="isEdit">新增</el-button>

        <el-table
            :data="tableData"
            style="width: 100%; margin-top: 20px;"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }">
            <el-table-column
                label="序号"
                type="index">
            </el-table-column>
            <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :label="item.label"
                :prop="item.prop"
                :width="item.width">
            </el-table-column>
            <el-table-column
                label="操作"
                prop="operation"
                width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="add('详情', scope.row)">详情</el-button>
                    <el-button type="danger" size="small" @click="deleteRow(scope.row)" v-if="isEdit">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :title="title"
            width="30%"
            :visible.sync="visible"
            :before-close="handleClose">
            <el-form :model="form" :rules="rules" ref="form" :disabled="!isEdit">
                <el-form-item label="发布时间" prop="time">
                    <el-date-picker
                        v-model="form.time"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        size="small"
                        style="width: 100%;"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input
                        v-model="form.desc"
                        type="textarea"
                        placeholder="请输入描述"
                        size="small"
                        style="width: 100%;"></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="content">
                    <el-input
                        v-model="form.content"
                        type="textarea"
                        placeholder="请输入描述"
                        size="small"
                        style="width: 100%;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" v-if="isEdit">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { announce, createAnnounce, updateAnnounce, deleteAnnounce } from '@/api/manager'
export default {
    name: 'ManageAnounce',
    data() {
        return {
            tableData: [],
            columns: [
                {
                    prop: 'time',
                    label: '发布时间'
                },
                {
                    prop: 'desc',
                    label: '描述'
                },
            ],
            visible: false,
            title: '',
            form: {},
            rules: {
                time: [{ required: true, message: '请选择发布时间', trigger: 'change' }],
                desc: [{ required: true, message: '请输入描述', trigger: 'change' }],
                content: [{ required: true, message: '请输入内容', trigger: 'change' }], 
            }
        }
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getAnnounce() {
            announce().then(res => {
                this.tableData = res
            })
        },
        add(title, row) {
            this.visible = true
            this.title = title
            console.log(row);
            
            if(title === '新增') {
                this.form = {
                    time: '',
                    desc: '',
                    content: '' 
                }
            }else if(title === '详情') {
                this.form = row
            }
        },
        deleteRow(row) {
            this.$confirm('确认删除该条公告吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning' 
            }).then(() => {
                deleteAnnounce({
                    id: row.id
                }).then(res => {
                    this.$message({
                        type:'success',
                        message: '删除成功！'
                    })
                    this.getAnnounce()
                })
            })
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.title === '详情') {
                        updateAnnounce(this.form).then(res => {
                            this.$refs[formName].resetFields()
                            this.$message({
                                message: '公告更新成功！',
                                type:'success'
                            })
                            this.visible = false
                            this.getAnnounce()
                        }) 
                    }else if(this.title === '新增') {
                        createAnnounce(this.form).then(res => {
                            this.$refs[formName].resetFields()
                            this.$message({
                                message: '公告创建成功！',
                                type:'success'
                            })
                            this.visible = false
                            this.getAnnounce()
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false
                }
            }) 
        },
        handleClose(done) {
            // this.$message({
            //     message: '取消操作！',
            //     type:'info'
            // })
            this.visible = false
            this.getAnnounce()
            this.$refs.form.resetFields()
        }
    },
    created() {
        this.getAnnounce()
    },
}
</script>

<style lang="scss" scoped>

</style>