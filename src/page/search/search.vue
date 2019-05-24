<template>
	<div class="searchList">
		<div class="search-top">
			<span @click="choseTime">{{datas.time}}</span>
			<input v-model="datas.searchText" type="text" placeholder="位置/房源/关键字">
		</div>
		<nut-infiniteloading 
			@loadmore="moreList" 
			:is-show-mod="true" 
			:has-more="datas.isHasMore" 
			:is-loading="datas.isLoading" 
			:threshold="100">
			<com-list :listData = "datas.searchObj"></com-list>
		</nut-infiniteloading>
		
	</div>
</template>

<script>
	import comList from "@/components/comList.vue" //列表
	export default {
		name: 'searchList',
		data() {
			return {
				datas:{
					searchText:'',
					time:'05.15-05.16',
					pageSize:10,
					pageNum:1,
					isHasMore:true,
					isLoading:false,
					searchObj: {
						score: true,
						comment: true,
						items: []
					},
				}
			}
		},
		components: {
			comList
		},
		mounted() {
			this.getList()
		},
		destroyed() {
			
    },
		methods: {
			// 选取时间
			choseTime(){
				this.$router.push({
					path: '/timeChose',
					query:{}
				})
			},
			// 获取数据
			getList(){
				this.datas.searchObj.items = [
					{
						img:'/static/img/footer-img@2x.png',
						title:'杭州西湖边的名人别墅',
						yPrice:284,
						nPrice:263
					},
					{
						img:'/static/img/ms-lb.png',
						title:'宿州别墅',
						yPrice:224,
						nPrice:263
					},
					{
						img:'/static/img/ms-lb.png',
						title:'宿州别墅',
						yPrice:244,
						nPrice:263
					},
					{
						img:'/static/img/footer-img@2x.png',
						title:'杭州西湖边的名人别墅',
						yPrice:193,
						nPrice:150
					},
				]
// 				if(res.code !== 600){
// 					this.datas.isLoading = false;
// 					this.datas.isHasMore = false;
// 				}
			},
			// 加载更多
			moreList(){
				// this.datas.isLoading = true
				let arr = [
					{
						img:'/static/img/footer-img@2x.png',
						title:'杭州西湖边的名人别墅',
						yPrice:284,
						nPrice:263
					}
				]
				// this.datas.searchObj.items.concat(arr)
				// this.datas.pageNum ++
				// console.log(this.datas.pageNum)
			}
		},
		computed: {

		},
		watch: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.searchList{
		.search-top{
			margin: 30px 20px 0 20px;
			background: #f1f0f8;
			padding:23px 5px;
			border-radius: 40px;
			span{
				font-size:24px;
				display: inline-block;
				padding:0 15px 0 30px;
				text-align: center;
				background: url('/static/img/sj_icon.png') no-repeat right 15px;
				background-size: 9px 8px;
				cursor: pointer;
			}
			input{
				font-size:30px;
				padding: 0 5px 0 20px;
			}
		}
		/deep/ .lists{
			margin: 0 auto;
			width: 670px!important;
			.list-top{
				width:100%;
				height: 440px!important;
			}
		}
	}
</style>
