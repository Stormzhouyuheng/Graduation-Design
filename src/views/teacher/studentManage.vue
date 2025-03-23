<template>
    <div>
        <el-table
            :data="tableData"
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center' }"
            style="width: 100%">
            <!-- <el-table-column
                label="序号"
                type="index">
            </el-table-column> -->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-table
                            :header-cell-style="{ 'text-align': 'center' }"
                            :cell-style="{ 'text-align': 'center' }"
                            :data="props.row.tasks"
                            style="width: 100%">
                            <el-table-column
                                v-for="(item, index) in tasksColumns"
                                :key="index"
                                :label="item.label"
                                :prop="item.prop">
                                <template slot-scope="scope">
                                    <div v-if="scope.column.property === 'content'">
                                        <div v-if="scope.row.isUpload === 'false'" type="success">/</div>
                                        <el-tag v-else-if="scope.row.statue === '未完成'" type="danger">未完成</el-tag>
                                        <el-tag v-else-if="scope.row.statue === '已完成'" type="success">{{ scope.row.content }}</el-tag>
                                    </div>
                                    <div v-else>{{ scope.row[item.prop] }}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :label="item.label"
                :prop="item.prop">
                <template slot-scope="scope">
                    <div v-if="scope.column.property === 'state'">
                        <el-tag v-if="scope.row[item.prop] === 1" type="success">正常</el-tag>
                        <el-tag v-else type="danger">禁用</el-tag>
                    </div>
                    <div v-else>{{ scope.row[item.prop] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                prop="operation">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleRemove(scope.row)">解除指导关系</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { findAllStudent, removeNo } from '@/api/teacher'
import { taskStuFind } from '@/api/student'
export default {
    name: 'StudentManage',
    props: {
        userId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tableData: [],
            columns: [
                {
                    label: '序号',
                    prop: 'index'
                },
                {
                    label: '学生学号',
                    prop: 'user_id'
                },
                {
                    label: '学生姓名',
                    prop: 'username'
                },
                {
                    label: '创建时间',
                    prop: 'createTime'
                },
                {
                    label: '学生账号状态',
                    prop: 'state'
                }
            ],
            tasksColumns: [
                {
                    label: '任务名称',
                    prop: 'task'
                },
                {
                    label: '开始时间',
                    prop: 'time'
                },
                {
                    label: '结束时间',
                    prop: 'endTime'
                },
                {
                    label: '提交时间',
                    prop: 'submit_time'
                },
                {
                    label: '完成情况',
                    prop: 'statue'
                },
                {
                    label: '文件',
                    prop: 'content'
                }
            ]
        }
    },
    methods: {
        findAllStudent() {
            findAllStudent({
                user_id: this.userId
            }).then(res => {
                const data = JSON.parse(JSON.stringify(res))
                data.forEach((item, index) => {
                    item.index = index + 1
                    // item.tasks = ''
                    taskStuFind({
                        user_id: item.user_id
                    }).then(res => {
                        item.tasks = this.test(res)
                    })
                })
                this.tableData = data
            })
        },
        test(res) {
            const data = []
            res.forEach(m => {
                data.push({
                    ...m.Task,
                    ...m
                })
            })
            return data
        },
        handleRemove(row) {
            this.$confirm('确定要解除指导关系吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeNo({
                    user_id: row.user_id
                }).then(res => {
                    this.$message.success('解除指导关系成功！')
                    this.findAllStudent()
                }).catch(() => {
                    this.$message.info('已取消解除指导关系')
                })
            })
        }
    },
    mounted() {
        this.findAllStudent()
    },
}
</script>

<style lang="scss" scoped>

</style>