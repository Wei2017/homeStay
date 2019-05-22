<template>
	<!-- <div class="navBar"> -->
	<nut-tabbar @tab-switch="tabSwitch" :tabbarList="tabList" :bottom="true">
	</nut-tabbar>
	<!-- </div> -->
</template>

<script>
	export default {
		name: 'navBar',
		data() {
			return {
				tabList: [{
						'tabTitle': '首页',
						'curr': true,
						'icon': 'http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg',
						'activeIcon': 'http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg',
						'path': '/home'
					},
					{
						'tabTitle': '订单',
						'curr': false,
						'icon': 'http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg',
						'activeIcon': 'http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg',
						'path': '/order'
					},
					{
						'tabTitle': '消息',
						'curr': false,
						'icon': 'http://img13.360buyimg.com/uba/jfs/t1/10361/35/4713/4643/5c0f3d62E437a3c94/273fd0fb90798f03.jpg',
						'activeIcon': 'http://img14.360buyimg.com/uba/jfs/t1/26604/35/1073/7896/5c0f3d61Eb9f5f184/5f01c938abe4216d.jpg',
						'path': '/msg'
					},
					{
						'tabTitle': '我的',
						'curr': false,
						'icon': 'http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg',
						'activeIcon': 'http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg',
						'path': '/me'
					}
				]
			}
		},
		components: {

		},
		mounted() {

		},
		methods: {
			tabSwitch(val, index) {
				this.$router.push({
					path: val.path
				})
			},
		},
		computed: {

		},
		watch: {

		}
	}
</script>

<style scoped="scoped" lang="stylus">
	.nut-tabbar {
		height: 97px;
		margin-top: 0;
		border-bottom: none;
		border-top: 1px solid #cccccc;
		/deep/ .icon-box .icon{
			width:34px;
			height:34px;
		}
		/deep/ .tabbar-nav{
			font-size:24px;
			color:#000;
		}
		/deep/ .curr {
			color: #ffd33b!important;
			font-size: 24px;
		}
	}
	
</style>
