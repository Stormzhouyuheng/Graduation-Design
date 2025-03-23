<template>
    <div class="company-jobs">
        <div class="company-baseInfo">
            <div class="company-logo">
                <img :src="item.pic" alt="">
            </div>
            {{ item.name }}
        </div>
        <div class="company-introduce">
            <div class="company-introduce-item">
                <img src="@/assets/label.png" alt="">
            </div>
            <div class="introduce">公司介绍</div>
            <div class="line"></div>
        </div>
        <div class="company-introduce-content common">
            <div style="margin-bottom: 10px;">公司性质：民营企业</div>
            <div style="margin-bottom: 10px;">所属行业：{{ item.category }}</div>
            <div style="margin-bottom: 10px;">{{ item.major }}</div>
            <div>{{ item.place }}</div>
        </div>
        <div class="company-introduce">
            <div class="company-introduce-item">
                <img src="@/assets/label.png" alt="">
            </div>
            <div class="introduce">招聘需求</div>
            <div class="line"></div>
        </div>
        <div class="company-introduce-content common singleJob" 
            v-for="(jobItem, index) in jobList" 
            :key="index">
            <el-tag style="margin-bottom: 10px;">{{ '岗位' + (index + 1) }}</el-tag>
            <div style="padding-bottom: 10px;">
                <div style="margin-bottom: 10px;">岗位职责</div>
                <div>{{ jobItem.dutyWork }}</div>
            </div>
            <div>
                <div style="margin: 10px 0;">岗位要求</div>
                <div>{{ jobItem.dutyMust }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Job',
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        jobList: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
.company-jobs {
    width: 100%;
    max-height: 50vh;
    min-height: 50vh;
    // background: red;
    overflow-y: auto;
}
.company-baseInfo {
    width: 100%;
    height: 100%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.company-logo {
    width: 60px;
    height: 50px;
    margin-right: 20px;
    img {
        width: 100%;
        height: 100%;
    }
}
.company-introduce {
    width: 100%;
    display: flex;
    align-items: center;
    .introduce {
        width: 100px;
    }
    .line {
        width: 100%;
        height: 1px;
        background: #e2e2e2;
    }
}
.company-introduce-item {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    img {
        width: 100%;
        height: 100%;
    }
}
.common {
    padding: 15px;
    font-size: 15px;
}
.singleJob {
    // border: 1px dashed #e2e2e2;
    margin: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>