<template>
	<div class="citySelect">
		<h3 class='header'>热门城市</h3>
		<div class='hot-city-wrap'>
			<span class='city-name' 
				v-for="(item,index) in items" 
				:key="index" 
				@click="setCityName(item)">{{item}}</span>
		</div>
	</div>
</template>

<script>
	// import { IndexBar, IndexAnchor } from "vant";
	import {
		hotCityList
	} from "../../api/api";
	export default {
		name: "citySelect",
		data() {
			return {
				items: []
			};
		},
		components: {
			// [IndexBar.name]: IndexBar,
			// [IndexAnchor.name]: IndexAnchor
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				hotCityList().then(res => {
					if (res.respCode === '2000') {
						this.items = res.respData
					}
				})
			},
			setCityName(cityName){
				this.$store.commit('setCityName',cityName)
				this.$router.go(-1);//返回上一层
			}
		},
		computed: {
			
		},
		watch: {}
	};
</script>
<style scoped="scoped" lang="scss">
	.citySelect {
		.header {
			font-size: 30px;
			font-weight: bold;
			margin: 30px;
		}

		.hot-city-wrap {
			width: 690px;
			padding: 0 30px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

		}

		.city-name {
			width: 150px;
			height: 60px;
			line-height: 60px;
			border-radius: 50px;
			background-color: #f0f0f8;
			font-size: 24px;
			text-align: center;
			overflow: hidden;
			display: inline-block;
			margin-right: 30px;
			margin-bottom: 20px;
		}

		.city-name:nth-of-type(4n+0) {
			margin-right: 0;
		}
	}
</style>
