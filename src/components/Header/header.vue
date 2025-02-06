<template>
	<div class="header">
		<div class="header-top">
			<div class="container">您好，欢迎访问广州软件学院新闻网！今天是： 2025年2月2日  星期日</div>
		</div>
		<div class="header-center container">
			<div class="clearfix">
				<div class="newsLogo">
					<img src="../../assets/news.png" alt="">
				</div>
				<div class="search"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: "Header",
	data() {
		return {
			
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	height: 290px;
	background: url('../../assets/header.png') center no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1000;
}
.header-top {
    background: #1E429F;
    height: 50px;
    line-height: 50px;
    font-family: "思源宋体";
    font-size: 16px;
    color: #fff;
    font-weight: normal;
}
.container {
	width: 85%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
	// background: red;
}
.clearfix {
	padding-top: 15px;
	padding-left: 15px;
	padding-right: 15px;
	// background: red;
	height: 100px;
	.newsLogo {
		// width: 30%;
		height: 100%;
		// background: url('../../assets/news.png') center no-repeat;
		// background-size: cover;
	}
	.search {

	}
}
</style>
