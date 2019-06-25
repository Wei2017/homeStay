<template>
	<div class="searchDic">
		<!-- 关键字搜索页 -->
		<div class='container'>
			<div class='header-input'>
				<input class="search-val" type="text" placeholder='位置/房源/关键字' 
				v-model="datas.serachVal" @keyup.enter="searchBtn($event)">
			</div>
			<div class='section-wrap'>
				<!-- 搜索历史 -->
				<div class='search-history'>
					<div class='history-title row'>
						<span>搜索历史</span>
						<b class="delete" @click="deletHistory">
							<img class='del-icon' src="/static/img/search-del.png" alt="">
						</b>
						
					</div>
					<div class='history-list-wrap row'>
						<div class='key-item'
							v-for="(item,index) in datas.histObj" 
							:key="index">{{item}}</div>
					</div>
				</div>
				<!-- 热门推荐 -->
				<div class='search-hot'>
					<div class='history-title hot-title'>热门推荐</div>
					<div class='history-list-wrap hot-list-wrap row'>
						<div class='key-item hot-key' 
							v-for="(item,index) in datas.hotTj" 
							:key="index" @click="setSearchKey(item)">{{item}}</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import {
		getHotSearchKey
	} from "../../api/api";
	export default {
		name: "searchDic",
		data() {
			return {
				datas:{
					serachVal: '',
					histObj: [],//用户搜索历史 存储本地
					hotTj:[],   //热门推荐
				}
				
			};
		},
		components: {

		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				getHotSearchKey(this.$store.state.cityName).then(res => {
					if (res.respCode === '2000') {
						this.datas.hotTj = res.respData
					}
				})
				this.datas.histObj = localStorage.getItem('histObj') ? JSON.parse(localStorage.getItem('histObj')) : []
			},
			setSearchKey(item) {
				this.$store.commit('setSearchKey', item)
				let words = this.datas.histObj
				if(words.indexOf(item) === -1){
					if(words.length >= 8){
						words.pop()
						words.unshift(item)
					}else{
						words.push(item)
					}
				}
				localStorage.setItem('histObj',JSON.stringify(words))
				this.$router.go(-1); //返回上一层
			},
			// 搜索关键字查询
			searchBtn(e) {
			  let keyCode = window.event ? e.keyCode : e.which;
			  if (keyCode === 13) {
					if(this.datas.serachVal){
						let words = this.datas.histObj
						let searchVal = this.datas.serachVal
						this.$store.commit('setSearchKey', searchVal)
						if(words.indexOf(searchVal) === -1){
							if(words.length >= 8){
								words.pop()
								words.unshift(searchVal)
							}else{
								words.push(searchVal)
							}
						}
						localStorage.setItem('histObj',JSON.stringify(words))
						this.$router.go(-1); //返回上一层
					}
			  }
			},
			deletHistory(){
				localStorage.setItem('histObj','')
				this.datas.serachVal = ''
				this.datas.histObj = []
			}
		},
		computed: {
			...mapState({
				cityName: state => state.cityName
			})
		},
		watch: {}
	};
</script>
<style scoped="scoped" lang="scss">
	.searchDic {
		.header-input {
			width: 710px;
			margin: 20px 0 55px;
		}

		.search-val {
			width: 683px;
			height: 70px;
			line-height: 70px;
			padding-left: 27px;
			border-radius: 50px;
			background-color: #f1f0f8;
			font-size: 30px;
		}

		.place-class {
			font-size: 30px;
			color: #999;
		}

		.section-wrap {
			width: 710px;
		}

		.search-history {
			padding: 0 10px 50px;
			border-bottom: 1px solid #f0f0f8;
		}

		.history-title {
			margin-bottom: 30px;
			justify-content: space-between;
		}

		.history-title>span {
			font-size: 30px;
			font-weight: bold;
			padding-left: 10px;

		}
		.history-title .delete{
			width: 0.8rem;
			height: 0.8rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.del-icon {
			width: 19px;
			height: 23px;
			padding-right: 10px;
		}

		.history-list-wrap {
			flex-wrap: wrap;
		}

		.key-item {
			margin-right: 30px;
			margin-bottom: 14px;
		}

		.key-item:nth-of-type(4n+0) {
			margin-right: 0;
		}

		.search-hot {
			padding: 34px 10px 50px;
		}

		.hot-key.key-item {
			width: auto;
			padding: 0 24px;
		}

		.key-item {
			width: 150px;
			height: 60px;
			line-height: 60px;
			border-radius: 50px;
			background-color: #f0f0f8;
			font-size: 24px;
			text-align: center;
			overflow: hidden;
		}
	}
</style>
