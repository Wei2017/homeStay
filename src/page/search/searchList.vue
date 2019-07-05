<template>
	<div class="searchList">
		<div class="search-top">
			<span @click="choseTime">{{searchDate.inDate ? searchDate.inDate : datas.inDate}}-{{searchDate.outDate ? searchDate.outDate : datas.outDate}}</span>
			<b @click="jumpSearchDic">
				<input v-model="searchKey" type="text" placeholder="位置/房源/关键字">
			</b>

		</div>
		<van-list 
			v-model="datas.loading" 
			:finished="datas.finished" 
			finished-text="没有更多数据了" @load="onLoad">
			<com-list :listData="datas.listObj"></com-list>
		</van-list>
	</div>
</template>

<script>
	import dayEventBus from '@/components/service/dayEventBus.js'
	import comList from "@/components/comList.vue"; //列表
	import {
		searchList,
		getRoomListDefDay
	} from "../../api/api";
	import { mapState } from 'vuex'
	export default {
		name: "searchList",
		data() {
			return {
				pageData: {
					pageSize: 15,
					pageNum: 1
				},
				datas: {
					flag:0,
					inDate: '',
					outDate: '',
					dayStart: '',
					dayEnd: '',
					loading: false, //是否处于加载状态
					finished: false, //是否已加载完所有数据
					isLoading: false, //是否加载
					listObj: {
						score: true,
						comment: true,
						items: []
					}
				}
			};
		},
		components: {
			comList,
			dayEventBus
		},
		destroyed() {},
		beforeRouteEnter(to,from,next){
			if(from.name === 'home'){
				next(vm =>{
					vm.$store.state.searchDate = {}
				})
				return;
			}
			next()
		},
		mounted() {
			this.init()
		},
		methods: {
			// 获取默认日期
			init() {
				this.getDefDay()
				// this.activated()
			},
			getDefDay(){
				getRoomListDefDay().then(res => {
					if (res.respCode === "2000") {
						this.datas.inDate = res.respData.dtStartShow
						this.datas.outDate = res.respData.dtEndShow
						this.datas.dayStart = res.respData.dayStart
						this.datas.dayEnd = res.respData.dayEnd
					}
				})
			},
			// 选取时间
			choseTime() {
				this.$router.push({
					path: "/searchDate",
					query: {
						start: this.$store.state.searchDate.inDate ? this.$store.state.searchDate.inDate : this.datas.inDate,
						end: this.$store.state.searchDate.outDate ? this.$store.state.searchDate.outDate : this.datas.outDate
					}
				});
			},
			// 每次重新选择日期时
			activated() {
				//根据key名获取传递回来的参数，data就是map
				console.log(22)
				dayEventBus.$on('dayDatas', function(data) {
					//赋值
					console.log(33333)
					console.log(data)
					this.datas.inDate = data.inDate
					this.datas.outDate = data.outDate
					this.datas.dayStart = data.rzDayShow
					this.datas.dayEnd = data.ldDayShow
					// 重新加载数据
					this.pageData.pageNum = 1
					this.datas.finished = false
					this.datas.loading = true
					this.datas.listObj.items = []
					if(this.datas.loading){
						this.onLoad()
					}
				}.bind(this));
			},

			// 获取数据-上拉加载
			onLoad() {
				let stayInDate = this.$store.state.searchDate.dayStart ? this.$store.state.searchDate.dayStart : this.datas.dayStart,
					stayOutDate = this.$store.state.searchDate.dayEnd ? this.$store.state.searchDate.dayEnd : this.datas.dayEnd
				let par = {
					orderBy: 1, //默认写1
					searchName: this.$store.state.searchKey, //关键词
					pageSize: this.pageData.pageSize,
					pageIndex: this.pageData.pageNum,
					accountId: 0, //房东id, 默认写0
					stayInDate: stayInDate, //入住日期, 格式为 yyyy-MM-dd
					stayOutDate: stayOutDate //离店日期, 格式为 yyyy-MM-dd
				};
				searchList(par).then(res => {
					if (res.respCode === "2000") {
						// 新数据拼接
						this.datas.listObj.items = this.datas.listObj.items.concat(res.respData)
						// 加载状态结束
						this.datas.loading = false;
						// 数据全部加载完成
						if(this.datas.listObj.items.length >= res.respDataExt.totalCount){
							this.datas.finished = true; //数据加载完成
						}
						this.pageData.pageNum ++;
						console.log(this.datas.listObj.items)
					} else {
						this.datas.finished = true;
					}
				});
			},
			// 选择位置
			jumpSearchDic() {
				this.$router.push({
					path: "/searchDic",
				});
			},
		},
		beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    //根据自己的逻辑添加代码
			to.meta.keepAlive=true   //可以动态修改是否让路由缓存
     
			next()
		},
		computed: {
			...mapState({
				searchKey:state =>state.searchKey,
				searchDate:state =>state.searchDate
			})
		},
		watch: {
			searchKey: {
				handler() {
					this.pageData.pageNum = 1
					this.datas.finished = false
					this.datas.loading = true
					this.datas.listObj.items = []
					if(this.datas.loading){
						this.onLoad()
					}
				}
			},
			searchDate(){
				if(this.$store.state.searchDate.inDate){
					// 重新加载数据
					this.pageData.pageNum = 1
					this.datas.finished = false
					this.datas.loading = true
					this.datas.listObj.items = []
					if(this.datas.loading){
						this.onLoad()
					}
				}else{
					this.pageData.pageNum = 1
					this.datas.finished = false
					this.datas.loading = false
					this.datas.listObj.items = []
				}
			}
		}
	};
</script>

<style scoped="scoped" lang="scss">
	.searchList {
		padding-bottom: 1rem;

		.search-top {
			margin: 30px 20px 0 20px;
			background: #f1f0f8;
			padding: 23px 5px;
			border-radius: 40px;
			display: flex;

			span {
				font-size: 24px;
				display: inline-block;
				padding: 0 15px 0 30px;
				text-align: center;
				background: url("/static/img/sj_icon.png") no-repeat right 15px;
				background-size: 9px 8px;
				cursor: pointer;
			}

			b {
				width: 60%;
				font-weight: normal;
			}

			input {
				font-size: 30px;
				padding: 0 5px 0 20px;
			}
		}

		/deep/ .van-list {
			.van-list__loading {
				padding: 15px 0;

				.van-list__loading-icon {
					width: 0.4rem;
					height: 0.4rem;
				}
			}

			.van-list__error-text,
			.van-list__finished-text,
			.van-list__loading-text {
				font-size: 30px !important;
				margin: 60px 0;
			}
		}

		/deep/ .lists {
			margin: 0 auto;
			width: 670px !important;

			.list-top {
				width: 100%;
				height: 440px !important;
			}

			.list-bottom {
				>div {
					span {
						height: 30px;
						line-height: 30px;
						display: inline-block;
						padding-right: 15px;
						border-right: 1px solid #999;
					}

					span:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>
