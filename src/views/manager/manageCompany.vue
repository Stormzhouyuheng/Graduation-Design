<template>
    <div>
        <div style="display: flex;">
            <el-button type="primary" @click="addStudent" style="margin-right: 20px;">添加单个企业</el-button>
            <el-upload
                ref="upload"
                action="#"
                :limit="1"
                :show-file-list="false"
                :on-change="handleChange"
                :http-request="triggerUpload"
            >
                <el-button type="primary" @click="addStudents">添加多个企业</el-button>
            </el-upload>
        </div>
        <!-- <el-button type="primary" @click="addStudents">添加多个企业</el-button> -->
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
                <template slot-scope="scope">
                    <div v-if="scope.column.property === 'state'">
                        <el-tag v-if="scope.row[scope.column.property] === 1" type="success">正常</el-tag>
                        <el-tag v-else type="warning">冻结</el-tag>
                    </div>
                    <div v-else>{{ scope.row[scope.column.property] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                prop="operation"
                width="180">
                <template slot-scope="scope">
                    <el-button :disabled="scope.row.state === 0" type="primary" @click="freezeStudent(scope.row, 0)" size="small">冻结</el-button>
                    <el-button :disabled="scope.row.state === 1" type="danger" @click="freezeStudent(scope.row, 1)" size="small">解冻</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            title="添加企业"
            width="30%"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="编号" prop="user_id">
                            <el-input v-model="form.user_id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业名称" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item label="院系" prop="department">
                            <el-input v-model="form.department"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="专业" prop="major">
                            <el-input v-model="form.major"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="班级" prop="userClass">
                            <el-input v-model="form.userClass"></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="确认名单"
            width="30%"
            :visible.sync="confirmVisible"
            :before-close="handleConfirmClose">
            <div class="confirm-list">
                <div class="confirm-item-same" v-if="sameItems.length > 0">
                    <div style="margin-bottom: 20px;">以下企业编号已存在：</div>
                    <div v-for="(item, index) in sameItems" :key="index">
                        <el-tag type="danger">{{ item['企业名称'] }}</el-tag>
                    </div>
                </div>
                <div class="confirm-item-diff" v-if="diffItems.length > 0">
                    <div style="margin-bottom: 20px;font-size: 16px;font-weight: bold;">以下为新增企业：</div>
                    <div style="width: 100%; display: flex;flex-wrap: wrap">
                        <el-tag 
                            v-for="(item, index) in diffItems" 
                            :key="index"
                            closable
                            type="primary"
                            style="margin-bottom: 10px; margin-right: 10px;"
                            @close="deleteTag(item)">{{ item['编号'] }} - {{ item['企业名称'] }}</el-tag>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { userList, createOne, createMore, updateState } from '@/api/manager'
import axios from 'axios'
export default {
    name: 'TeacherInfo',
    data() {
        return {
            tableData: [],
            columns: [
                {
                    label: '编号',
                    prop: 'user_id'
                },
                {
                    label: '企业名称',
                    prop: 'username'
                },
                {
                    label: '创建时间',
                    prop: 'createTime',
                    width: '120'
                },
                // {
                //     label: '院系',
                //     prop: 'department'
                // },
                // {
                //     label: '专业',
                //     prop: 'major'
                // },
                // {
                //     label: '班级',
                //     prop: 'class'
                // },
                {
                    label: '状态',
                    prop: 'state'
                }
            ],
            form: {},
            rules: {
                user_id: [
                    { required: true, message: '请输入编号', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                department: [
                //     { required: true, message: '请输入院系', trigger: 'blur' }
                // ],
                // major: [
                //     { required: true, message: '请输入专业', trigger: 'blur' }
                // ],
                // userClass: [
                //     { required: true, message: '请输入班级', trigger: 'blur' }
                ]
            },
            dialogVisible: false,
            selectedFile: null,
            tempData: [],
            confirmVisible: false,
            sameItems: [],
            diffItems: []
        }
    },
    methods: {
        getUserList() {
            userList(
                {
                    role_id: 3
                }
            ).then(res => {
                const data = []
                res.forEach(item => {
                    data.push({
                        ...item.User,
                        ...item
                    })
                })
                this.tableData = data
                console.log(this.tableData)
            })
        },
        addStudent() {
            console.log('添加单个企业')
            this.dialogVisible = true
        },
        addStudents() {
            console.log('添加多个企业')
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    createOne({
                        ...this.form,
                        role_id: 3
                    }).then(res => {
                        this.$message.success('添加成功')
                        this.dialogVisible = false
                        this.getUserList()
                    })
                }
            })
        },
        triggerUpload() {
            const formData = new FormData();
            formData.append('excel', this.selectedFile); // 文件流
            axios.post(process.env.VUE_APP_BASE_API + '/getRole/createTeaCom', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                this.confirmVisible = true

                // 提取所有user_id生成哈希集合（O(n)时间复杂度）
                const userIdSet = new Set(this.tableData.map(m => m.user_id));

                // 单次遍历完成分类（O(m)时间复杂度）
                const sameItems = [];
                const diffItems = [];

                res.data.data.forEach(n => {
                if (userIdSet.has(n.编号)) {
                    sameItems.push(n);
                } else {
                    diffItems.push(n);
                }
                });

                // 结果存储（避免数据引用问题）
                this.sameItems = [...sameItems]; 
                this.diffItems = [...diffItems];

                this.$message.success('文件上传成功！');
                this.$refs.upload.clearFiles()
            })
        },
        deleteTag(tag) {
            this.diffItems = this.diffItems.filter(item => item !== tag)
        },
        handleChange(file, fileList) {
            this.selectedFile = file.raw;
        },
        confirmAdd() {
            createMore({
                temp: this.diffItems,
                role_id: 3
            }).then(res => {
                this.$message.success('添加成功')
                this.confirmVisible = false
                this.getUserList()
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        handleConfirmClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        freezeStudent(row, state) {
            updateState({
                user_id: row.user_id,
                state
            }).then(res => {
                this.$message.success(res.msg)
                this.getUserList()
            })
        }
    },
    created() {
        this.getUserList()
    },
}
</script>

<style lang="scss" scoped>
.confirm-list {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    .confirm-item-same {
        margin-bottom: 10px;
        border-bottom: 1px dashed #ccc;
    }
    .confirm-item-diff {
        margin-bottom: 10px;
    }
}
</style>