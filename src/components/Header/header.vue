<template>
	<div class="header">
		<div class="header-top">
			<div class="container">您好，欢迎访问学生实习就业管理系统！今天是： {{ formattedTime }}</div>
		</div>
		<div class="header-center">
			<div class="center container">
				<div class="newsLogo">
					<!-- <img src="../../assets/news.png" alt=""> -->
					学生实习就业管理系统
				</div>
				<div class="search">
					<!-- <div @click="gotoSchool">学校主页</div> -->
					<div @click="gotoSchool">退出</div>
				</div>
			</div>
		</div>
		<div class="header-bottom">
			<div class="container1">
				<el-button 
					type="text" 
					v-for="(item, index) in menus" 
					:key="index"
					@click="menusClick(item)">{{ item }}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
// import { dateFormat } from '@/utils/timeFrame'
export default {
    name: "Header",
	data() {
		return {
			menus: [
				// '新闻首页',
				'广软要闻',
				'媒体广软',
				'校园快讯',
				// '教学科研',
				// '广软人物',
				// '广软融媒',
				// '多彩广软',
				// '通知公告'
			],
			// date: dateFormat('YYYY年mm月dd日 HH时MM分', new Date()),
			currentTime: new Date(), // 存储当前时间的日期对象
        	formattedTime: '' // 存储格式化后的时间字符串
		}
	},
	methods: {
		gotoSchool() {
			// window.open('https://www.seig.edu.cn/')
			this.$router.push({ path: '/login' });
		},
		menusClick(item) {
			this.$emit('handleCurrentMenu', item)
		},
		updateTime() {
			// 更新当前时间
			this.currentTime = new Date();
			// 格式化时间并更新 formattedTime 变量
			this.formattedTime = this.formatTime(this.currentTime);
		},
		formatTime(date) {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			const seconds = String(date.getSeconds()).padStart(2, '0');
			const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
			const weekDay = weekDays[date.getDay()];
			// 返回格式化后的时间字符串
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${weekDay}`;
		}
	},
	beforeDestroy() {
		// 组件销毁前清除定时器，避免内存泄漏
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
	created() {
		// 页面加载时更新一次时间
		this.updateTime();
		// 设置定时器，每秒更新一次时间
		this.timer = setInterval(() => {
			this.updateTime();
		}, 1000);
	},
}
</script>

<style lang="scss" scoped>
.header {
	width: 100%;
	height: 290px;
	background: url('../../assets/header.png') center no-repeat;
    background-size: cover;
    // position: relative;
    // z-index: 1000;
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
}
.center {
	padding-top: 20px;
	padding-left: 10px;
	padding-right: 20px;
	height: 100px;
	// width: 100%;
	display: flex;
	justify-content: space-between;
	// background: white;
	
	.newsLogo {
		// height: 100%;
		font-size: 50px;
		font-family: "楷体";
		color: #fff;
	}
	.search {
		display: flex;
		// width: 10%;
		font-size: 18px;
		color: #ffffffad;
		letter-spacing: 2px;
		margin-top: 5px;
		cursor: pointer;
		// background: yellow;
		// align-items: center;
	}
}
.header-bottom {
	padding-top: 40px;
	height: 140px;
	width: 100%;
	.container1 {
		width: 80%;
		// height: 100%;
		display: flex;
		// justify-content: space-between;
		padding-right: 5px;
		padding-left: 5px;
		margin-right: auto;
		margin-left: auto;
		.el-button {
			font-size: 22px;
			color: #fff;
			margin-right: 50px;
			:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
