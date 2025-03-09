<template>
	<div class="webSite">
		<NewsHeader @handleCurrentMenu="handleCurrentMenu"></NewsHeader>
		<NewsBody :currentMenu="currentMenu"/>
	</div>
</template>

<script>
import NewsHeader from '@/components/Header/header.vue'
import NewsBody from '@/components/NewsBody'
export default {
    name: "WebSite",
	data() {
		return {
			currentMenu: '广软要闻'
		}
	},
	components: {
		NewsHeader,
		NewsBody
	},
	methods: {
		handleCurrentMenu(data) {
			this.currentMenu = data
		}
	}
}
</script>

<style lang="scss" scoped>
	.webSite {
		width: 100%;
		height: 100%;
	}
</style>
