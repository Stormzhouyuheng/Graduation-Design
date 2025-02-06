<template>
	<div class="webSite">
		<Header></Header>
	</div>
</template>

<script>
import Header from '@/components/Header/header.vue'
export default {
    name: "WebSite",
	data() {
		return {
			
		}
	},
	components: {
		Header
	}
}
</script>

<style lang="scss" scoped>
	.webSite {
		width: 100%;
		height: 100%;
		background: red;
	}
</style>
