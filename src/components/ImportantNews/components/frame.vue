<template>
  <div class="frame">
    <!-- <slot name="frame"></slot> -->
    <div class="list-right-top">
      <div class="list-right-left pull-left">
        <span>{{ currentMenu.slice(0, 2) }}</span>{{ currentMenu.slice(-2) }}
      </div>
      <div class="pull-right nav-b">当前位置: 
        <a>{{ currentMenu.slice(-2) === '操作' ? '操作' : currentMenu === '招聘信息' ? '招聘' : '新闻' }}</a>
        <div class="arrow">&gt; </div>
        <a>{{ currentMenu }}</a>
      </div>
    </div>

    <div class="" v-if="currentMenu.slice(-2) === '操作'">
      <PersonalOperate />
    </div>
    <div v-else-if="currentMenu === '招聘信息'">
      <HireInfo />
    </div>
    <div v-else>
      <div class="newsPart" v-loading="loading" >
        <div class="left">
          <div style="width: 100%; text-align: right;">
            <div 
              style="padding: 10px; cursor: pointer; color: #666666" 
              class="el-icon-refresh-right"
              @click="refreshNews">更新</div>
          </div>
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
          <NewsDetails 
            :newContent="newContent" 
            :page="page" />
        </div>
      </div>
      <div class="handlePage" v-if="Object.keys(newContent).length !== 0">
          <Pagination 
            :total="page.total"
            :page.sync="page.pageNum"
            :limit.sync="page.pageSize"
            @pagination="handleGetNewsList"/>
      </div>
    </div>
  </div>
</template>

<script>
import NewsItem from '@/components/NewsItem'
import NewsDetails from '@/components/NewsDetails'
import PersonalOperate from '@/components/PersonalOperate'
import HireInfo from '@/components/HireInfo'
import {getNewsList, getNewsContent, reCatchNews} from '@/api/news'
export default {
    data() {
        return {
            value: '广软',
            newList: [],
            link: '',
            newContent: {},
            currentIndex: 0,
            loading: false,
            page: {
              pageSize: 10,
              pageNum: 1, 
              total: 0
            },
            type: 'gryw'
        }
    },
    components: {
      NewsItem,
      NewsDetails,
      PersonalOperate,
      HireInfo
    },
    props: {
      currentMenu: {
        type: String,
        default: '广软要闻'
      }
    },
    watch: {
      currentMenu(newVal) {
        this.type = this.currentMenu === '广软要闻' ? 'gryw' : this.currentMenu === '媒体广软' ? 'mtgr' : 'xykx'
        this.handleGetNewsList()
      }
    },
    methods: {
      handleGetNewsList() {
        this.currentIndex = 0
        console.log('this.type', this.type);
        getNewsList({
          page: this.page.pageNum,
          pageSize: this.page.pageSize
        }, this.type).then(res => {
          this.newList = res.newList
          this.page.total = res.total
          this.link = res.newList[0].link
          // console.log('123', res, res.newList);
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
          // console.log('456', res);
        }).finally(() => {
          this.loading = false
        })
      },
      handleCurrentNews(news) {
        this.currentIndex = news.index
        this.link= news.item.link
        this.newContent = {}
        this.handleGetNewsContent()
      },
      refreshNews() {
        reCatchNews(this.type).then(res => {
          this.$message.success(res.msg)
        }).then(() => {
          this.handleGetNewsList()
        })
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
  padding: 0 100px;
  // height: 100%;
  // background: red;
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
    padding-bottom: 25px;
    position: relative;
    font-size: 30px;
    font-weight: 600;
    color: #333;
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