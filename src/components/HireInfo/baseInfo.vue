<template>
    <div class="base-info">
        <div class="left">
            <div class="left-img">
                <img :src="item.pic" alt="">
            </div>
        </div>
        <div class="right">
            <div class="right-left">
                <div class="company-name">
                    <el-tooltip class="item" effect="light" content="点击查看职位详情" placement="top">
                        <span class="company-name-text" @click="handleClick(item)">{{ item.name }}</span>
                    </el-tooltip>
                    <div class="border">{{ item.doing }}</div>
                    <div class="border">过</div>
                </div>
                <div class="company-type">
                    <div>民营企业</div>
                    <div style="margin-left: 50px;">{{ item.category }}</div>
                </div>
                <div class="company-demand">{{ item.major }}</div>
                <div class="company-city">{{ item.place }}</div>
            </div>
            <div class="right-right">
                <div class="publish-date">{{ transformTime(item.time) }}</div>
                <!-- <div class="publish-address">{{ '广州市白云区白云大道北2号123456789123456789123456789' }}</div> -->
            </div>
        </div>

        <el-dialog
            title="公司职位"
            width="50%"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <Job :item="item" :jobList="jobList"/>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
import { dateFormat } from '@/utils/timeFrame';
import { companyOne, companyPositionTemp } from '@/api/company';
import Job from './job.vue';
export default {
    name: 'BaseInfo',
    data() {
        return {
            dialogVisible: false,
            jobList: []
        }
    },
    components: {
        Job
    },
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        transformTime(time) {
            return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(time));
        },
        handleClick(item) {
            // console.log(item);
            // companyOne(
            //     {
            //         user_id: item.company_id
            //     }
            // ).then(res => {
            //     console.log('/company/one', res);
            // })

            companyPositionTemp(
                {
                    user_id: item.company_id
                }
            ).then(res => {
                if(res.length === 0) {
                    this.$message.error(item.name + '暂无职位信息');
                    return;
                }else {
                    this.dialogVisible = true;
                    const data = res;
                    data.forEach(item => {
                        item.disabled = false;
                    })
                    this.jobList = data
                    console.log('this.jobList', this.jobList);
                }
            })
        },
        handleClose() {
            this.dialogVisible = false;
        }
    },
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
.base-info {
    width: 100%;
    height: 200px;
    // border: 1px solid #000;
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #dedede;
    .left {
        width: 10%;
        height: 100%;
        display: flex;
        // align-items: center;
        justify-content: flex-end;
        .left-img {
            width: 75%;
            height: 50%;
            margin-right: 20px;
            // background: red;
            img {
                width: 100%;
                height: 100%;
            }
        }
        // background: red;
    }
    .right {    
        width: 90%;
        height: 100%;
        // background: #ccc;
        display: flex;
        .right-left {
            width: 75%;
            // background: blue;
        }
        .right-right {
            width: 25%;
            // background: #ccc;
            text-align: right;
            color: red;
            .publish-date {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .publish-address {
                width: 100%;
                margin-top: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
.company-name {
    font-size: 20px;
    // font-weight: bold;
    color: #1e649f;
    display: flex;
    align-items: center;
}
.border {
    // border: 1px solid #1e649f;
    border-radius: 5px;
    padding: 10px;
    background: #1e649f;
    color: #fff;
    font-size: 12px;
    margin-left: 10px;
}
.company-type {
    display: flex;
    margin-top: 20px;
    color: #6e6e6e;
}
.company-demand {
    margin-top: 30px;
    color: #6e6e6e;
}
.company-city {
    margin-top: 30px;
    color: #6e6e6e;
}
.company-name-text {
    &:hover {
        cursor: pointer;
    }
}
</style>