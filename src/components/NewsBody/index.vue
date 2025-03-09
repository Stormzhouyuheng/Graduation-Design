<template>
  <div class="newsBody">
    <BodyFrame :currentMenu="currentMenu">
        <!-- <template v-slot:frame>
            <ImportantNews v-if="currentMenu === '广软要闻'"/>
            <Media v-if="currentMenu === '媒体广软'"/>
        </template> -->
    </BodyFrame>
  </div>
</template>

<script>
import BodyFrame from '@/components/ImportantNews/components/frame.vue'
// 广软要闻
import ImportantNews from '@/components/ImportantNews'
// 媒体广软
import Media from '@/components/Media'
export default {
    data() {
        return {

        }
    },
    props: {
        currentMenu: {
            type: String,
            default: '广软要闻'
        }
    },
    components: {
        BodyFrame,
        ImportantNews,
        Media
    }
}
</script>

<style lang="scss" scoped>
.newsBody {
	width: 100%;
	height: 1290px;
    padding-top: 80px;
	background: url('../../assets/list-back.png') center no-repeat;
    background-size: cover;
}
</style>