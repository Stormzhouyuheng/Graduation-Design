<template>
  <div class="frame">
    <!-- <slot name="frame"></slot> -->
    <!-- <div class="list-right-top">
      <div class="list-right-left pull-left">
        <span>{{ currentMenu.slice(0, 2) }}</span>{{ currentMenu.slice(-2) }}
      </div>
      <div class="pull-right nav-b">当前位置: 
        <a href="index.htm">新闻</a>
        <div class="arrow">&gt; </div>
        <a href="gryw.htm">{{ currentMenu }}</a>
      </div>
    </div>

    <div class="newsPart">
      <div class="left">
        <NewsItem 
          class="test"
          :class="currentIndex === index ? 'currentIndex' : ''"
          v-for="(item, index) in newList"
          :key="index"
          :item="item" 
          :index="index"
          @handleCurrentNews="handleCurrentNews"/>
      </div>
      <div class="right">
        <NewsDetails v-loading="loading" :newContent="newContent"/>
      </div>
    </div> -->

    <div class="handlePage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import NewsItem from '@/components/NewsItem'
import NewsDetails from '@/components/NewsDetails'
import {getNewsList, getNewsContent} from '@/api/news'
export default {
    data() {
        return {
            value: '广软',
            newList: [],
            link: '',
            newContent: {},
            currentPage4: 4,
            currentIndex: 0,
            loading: false
        }
    },
    components: {
      NewsItem,
      NewsDetails
    },
    props: {
      currentMenu: {
        type: String,
        default: '广软要闻'
      }
    },
    methods: {
      handleGetNewsList() {
        getNewsList({
          page: '1',
          pageSize: '10'
        }).then(res => {
          this.newList = res.newList
          this.link = res.newList[0].link
          console.log('123', res);
        }).then(res => {
          this.handleGetNewsContent()
        })
      },
      handleGetNewsContent() {
        this.loading = true
        getNewsContent({
          link: this.link
        }).then(res => {
          this.newContent = res
          console.log('456', res);
        }).finally(() => {
          this.loading = false
        })
      },
      handleCurrentNews(news) {
        console.log('handleCurrentNews', news);
        this.currentIndex = news.index
        this.link= news.item.link
        this.handleGetNewsContent()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted() {
      this.handleGetNewsList()
    }
}
</script>

<style lang="scss" scoped>
.frame {
  width: 100%;
  // height: 500px;
  // background: yellow;
  padding: 0 100px;
}
.newsPart {
  width: 100%;
  display: flex;
  .left {
    width: 30%;
  }
  .right {
    width: 70%;
  }
}
.test {
  &:hover {
    box-shadow: 1px 5px 13px 1px rgba(0, 0, 0, 0.5);
  }
}
.currentIndex {
  box-shadow: 1px 5px 13px 1px rgba(0, 0, 0, 0.5);
}
.list-right-top {
  margin-bottom: 50px;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
}
.list-right-left {
    // line-height: 1;
    padding-bottom: 25px;
    // border-bottom: solid 1px #ddd;
    position: relative;
    font-size: 30px;
    font-weight: 600;
    color: #333;
    // width: 100px;
    span {
      color: #244CB2;
      display: block;
      float: left;
    }
}
.list-right-left:before {
    display: block;
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    right: 0;
    height: 4px;
    background: url('../../../assets/lin-b.png') right center no-repeat;
}
// .pull-left {
//     float: left !important;
// }
.nav-b {
    background: url('../../../assets/home.png') left center no-repeat;
    background-size: 14px auto;
    font-size: 19px;
    color: #666;
    padding-left: 20px;
    display: flex;
    align-items: center;
    // margin: 15px 0 8px;
}
.arrow {
  margin: 0 5px;
}
// .pull-right {
//     float: right !important;
// }
.handlePage {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>