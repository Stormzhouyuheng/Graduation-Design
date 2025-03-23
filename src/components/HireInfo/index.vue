<template>
    <div class="hire-info">
        <BaseInfo v-for="(item, index) in companyData" :key="index" :item="item"/>
    </div>
</template>

<script>
import BaseInfo from './baseInfo.vue';
import { companyList } from '@/api/news';
export default {
    name: 'HireInfo',
    data() {
        return {
            companyData: []
        }
    },
    components: {
        BaseInfo
    },
    methods: {
        async getCompanyList() {    
            const res = await companyList();
            this.companyData = res;
        }
    },
    mounted() {
        this.getCompanyList();
    }
}
</script>

<style lang="scss" scoped>
.hire-info {
    width: 100%;
    height: 100%;
}
</style>