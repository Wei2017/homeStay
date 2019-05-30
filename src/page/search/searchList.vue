<template>
	<div class="searchList">
		<div class="search-top">
			<span @click="choseTime">{{datas.time}}</span>
			<input v-model="datas.searchText" type="text" placeholder="位置/房源/关键字" @keyup.enter="searchBtn($event)">
		</div>
		<no-data v-show="lodData.noData"></no-data>
		<van-list
			v-model="datas.loading"
			:finished="datas.finished"
			finished-text="没有更多数据了"
			@load="onLoad"
		>
			<com-list :listData = "datas.listObj"></com-list>
		</van-list>
	</div>
</template>

<script>
	import comList from "@/components/comList.vue" //列表
	import noData from '@/components/NoData.vue'
	export default {
		name: 'searchList',
		data() {
			return {
				pageData:{
					pageSize:10,
					pageNum:1,
				},
				lodData:{
					loading:false,
					noData:false,
				},
				datas:{
					searchText:'',
					time:'05.15-05.16',
					loading:false,   
					finished:false,  //是否加载完成
					listObj: {
						score: true,
						comment: true,
						items: []
					}
				}
			}
		},
		components: {
			comList,
			noData
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
				this.datas.listObj.items = [
					{
						img:'/static/img/footer-img@2x.png',
						title:'杭州西湖边的名人别墅',
						yPrice:284,
						nPrice:263,
						id:11
					},
					{
						img:'/static/img/ms-lb.png',
						title:'宿州别墅',
						yPrice:224,
						nPrice:263,
						id:22
					},
					{
						img:'/static/img/ms-lb.png',
						title:'宿州别墅',
						yPrice:244,
						nPrice:263,
						id:33
					},
					{
						img:'/static/img/footer-img@2x.png',
						title:'杭州西湖边的名人别墅',
						yPrice:193,
						nPrice:150,
						id:44
					},
				]
			},
			// 加载更多
			onLoad(){
				setTimeout(() => {
					this.pageData.pageNum ++;
						console.log(this.pageData.pageNum)
					for(let i = 0; i < 5; i++){
						let obj = {
								img:'/static/img/footer-img@2x.png',
								title:'杭州西湖边的名人别墅',
								yPrice:i+100,
								nPrice:263,
								id:i+1
						}
						this.datas.listObj.items.push(obj)
					}
					// 加载结束
					this.datas.loading = false
					// 数据全部加载完成
					if(this.datas.listObj.items.length >= 20){
						this.datas.finished = true
					}
				},800)
			},
			// 搜索查询
			searchBtn(e){
				let keyCode = window.event? e.keyCode:e.which;
        if(keyCode === 13){
					this.datas.listObj.items = []
					if(this.datas.listObj.items.length < 1){
						this.lodData.noData = true
					}else{
						this.lodData.noData = false
					}
				}
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
		padding-bottom:1rem;
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
		/deep/ .van-list{
			.van-list__loading{
				padding:15px 0;
				.van-list__loading-icon{
					width:0.4rem;
					height:0.4rem;
				}
			}
			.van-list__error-text, .van-list__finished-text, .van-list__loading-text{
				font-size:28px;
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
