<template>
    <div class="newsDetails">
        <div class="title">
            <div class="titleInfo">
                {{ newContent.title }}
            </div>
            <div class="text-center article-sm">
                <span class="wz-date">
                    {{ newContent.time }}
                </span>
                <!-- <span class="wz-number">
                    浏览量：88
                </span> -->
            </div>
            <div v-for="(item, index) in newContent.paragraphs" :key="index">
                <div v-if="item.text" style="font-size: 18px;font-family:宋体;padding: 10px 20px;text-indent: 4ch;">{{ item.text }}</div>
                <div style="width: 100%; display: flex;justify-content: center;margin-bottom: 20px;">
                    <div v-if="item.imgurl" style="width: 600px;height: 400px;">
                        <img :src="item.imgurl" style="width: 100%;height: 100%;">
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="handlePage" v-if="Object.keys(newContent).length !== 0">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage.pageNum"
                :page-size="currentPage.pageSize"
                layout="total, prev, pager, next"
                :total="currentPage.total">
            </el-pagination>
                @size-change="handleSizeChange"
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'NewsDetails',
    props: ['newContent', 'page'],
    data() {
        return {
            // newsTotal: 0,
            // currentPage: {
                
            // }
        }
    },
    // watch: {
    //     page: {
    //         handler(val) {
    //             this.currentPage = JSON.parse(JSON.stringify(val))
    //         },
    //         deep: true
    //     }
    // },
    methods: {
        // handleSizeChange(val) {
        //     this.currentPage = {
        //         pageSize: val,
        //         pageNum: this.currentPage.pageNum, 
        //         total: this.currentPage.total
        //     }
        //     console.log(1);
            
        //     this.$emit("handlePage", this.currentPage)
        // },
        // handleCurrentChange(val) {
        //     this.currentPage = {
        //         pageSize: this.currentPage.pageSize,
        //         pageNum: val, 
        //         total: this.currentPage.total
        //     }
        //     console.log(2);
            
        //     this.$emit("handlePage", this.currentPage)
        // }
    }
      
}
</script>

<style lang="scss" scoped>
.newsDetails {
    width: 100%;
    // height: 500px;
    padding: 20px;
    // background: red;
}
.titleInfo {
    text-align: center;
    font-size: 22px;
    padding: 15px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.article-sm {
    margin: 20px 0 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    span.wz-date {
        background: url('../../assets/icon-wz01.png') left center no-repeat;
        padding-left: 25px;
        margin-right: 25px;
    }
    span.wz-number {
        background: url('../../assets/icon-wz02.png') left center no-repeat;
        padding-left: 25px;
    }
}
.handlePage {
//   display: flex;
//   width: 100%;
//   justify-content: center;
  position: absolute;
}
</style>