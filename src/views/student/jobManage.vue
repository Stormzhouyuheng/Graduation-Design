<template>
    <div>
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
                    <div v-if="scope.column.property === 'statue'">
                        <el-tag :type="scope.row.statue === '未录取' ? 'warning' : 'success'">{{ scope.row.statue }}</el-tag>
                    </div>
                    <div v-else>{{ scope.row[item.prop] }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column
                label="操作"
                prop="operation"
                width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="add('详情', scope.row)">详情</el-button>
                    <el-button type="danger" size="small" @click="deleteRow(scope.row)" v-if="isEdit">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
import {companyStuPositions} from '@/api/company'
export default {
    name: 'JobManage',
    data() {
        return {
            tableData: [],
            columns: [
                {
                    prop: 'name',
                    label: '公司'
                },
                {
                    prop: 'dutyMust',
                    label: '岗位要求'
                },
                {
                    prop: 'dutyWork',
                    label: '岗位职责' 
                },
                {
                    prop: 'statue',
                    label: '投递状态'
                }
            ]
        }
    },
    props: {
        userId: {
            type: String,
            default: '' 
        } 
    },
    methods: {
        getCompanyStuPositions() {
            companyStuPositions({
                user_id: this.userId
            }).then(res => {
                console.log('res', res);
                const data = res.Positions.map(item => {
                    return {
                        ...item,
                        statue: item.ResumePosition.statue
                    }
                })
                this.tableData = data;
            })
        }
    },
    mounted() {
        this.getCompanyStuPositions();
    }
}
</script>

<style lang="scss" scoped></style>