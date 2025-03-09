<template>
    <div class="newsItem" @click="selectNews">
        <div class="newsImage">
            <img :src="item.pic" style="width: 100%;height: 100%;">
        </div>
        <div class="newsInfo">
            <div class="date">2025-02-25</div>
            <div class="title">{{ item.title }}</div>
            <div class="info">{{ item.desc }}</div>
            <!-- <div class="arrow">
                <img src="@/assets/raw-r01.png" alt="">
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewsItem',
    data() {
        return {

        }
    },
    props: ['item', 'index'],
    methods: {
        selectNews() {
            console.log('this.item', this.item);
            this.$emit('handleCurrentNews', {
                index: this.index,
                item: this.item
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.newsItem {
    width: 100%;
    height: 8%;
    display: flex;
    padding: 20px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    box-shadow: 1px 5px 13px 1px rgba(0, 0, 0, 0.0615);
}
.newsImage {
    width: 40%;
    height: 100%;
    // background: red;
    border: 1px solid #ccc;
}
.newsInfo {
    width: 60%;
    height: 100%;
    // background: yellow;
    padding: 0px 0 20px 30px;
    position: relative;
}
.date {
    color: #394F87;
    font-size: 18px;
}
.title {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
    // margin-top: 13px;
    letter-spacing: 2px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info {
    color: #666;
    // margin-top: 25px;
    font-size: 16px;
    letter-spacing: 2px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
// .arrow {
//     position: absolute;
//     right: -70px;
//     bottom: 20px;
// }
</style>