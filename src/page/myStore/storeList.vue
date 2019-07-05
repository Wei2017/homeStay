<template>
	<div class="storeList">
			<van-list v-model="datas.loading" :finished="datas.finished" :finished-text="datas.finishedText" @load="onLoad">
				<no-data v-if="datas.listObj.items.length == 0 && !datas.loading" :NoDataVal = 'datas.NoDataObj' ></no-data>
				<com-list v-else :listData="datas.listObj" @storeChange="storeChange"></com-list>
			</van-list>
	</div>
</template>

<script>
	import noData from '@/components/NoData.vue'
	import comList from "@/page/myStore/components/comList.vue"; //列表
	import {
		collectGetListPageByUserOrAcc,
		addStoreHome
	} from "../../api/api";
	export default {
		name: "searchList",
		data() {
			return {
				pageData: {
					pageSize: 15,
					pageNum: 1
				},
				datas: {
					NoDataObj: {
						text: '还没有收藏的内容',
						btnShow: true,
						name: '去逛逛',
						path: '/home',
					},
					loading: false, //是否处于加载状态
					finished: false, //是否已加载完所有数据
					isLoading: false, //是否加载
					finishedText:'',
					listObj: {
						score: false,
						comment: false,
						items: []
					}
				}
			};
		},
		components: {
			noData,
			comList,
		},
		mounted() {
			this.init()
		},
		destroyed() {},
		methods: {
			init(){
			
			},
			// 获取数据-上拉加载
			onLoad() {
				let par = {
					opType: 2,
					userId: localStorage.getItem('userId'), //关键词
					pageSize: this.pageData.pageSize,
					pageIndex: this.pageData.pageNum,
				};
				this.datas.listObj.items = []
				collectGetListPageByUserOrAcc(par).then(res => {
					if (res.respCode === "2000") {
						// 新数据拼接
						this.datas.listObj.items = this.datas.listObj.items.concat(
							res.respData
						)
						// 加载状态结束
						this.datas.loading = false;
						// 数据全部加载完成
						if(this.datas.listObj.items.length >= res.respDataExt.totalCount){
							this.datas.finished = true; //数据加载完成
						}
						this.pageData.pageNum ++;
						console.log(this.datas.listObj.items)
						this.datas.finishedText = this.datas.listObj.items.length ===0 ? '' : '没有更多数据了'
					} else {
						this.datas.finished = true;
					}
				});
			},
			// 取消收藏
			storeChange(id) {
				let par = {
					roomaccid: id,
					userid: localStorage.getItem("userId")
				};
				this.$dialog.confirm({
					title: '取消收藏',
					message: '确定取消收藏吗?'
				}).then(() => {
					// on confirm
					addStoreHome('UserViewCollect/CancelUserCollect', par).then(res => {
						if (res.respCode === "2000") {
							this.pageData.pageNum = 1
							this.datas.finished = false
							this.datas.loading = true
							if(this.datas.loading){
								this.onLoad()
							}
						}
					})
				}).catch(() => {
					// on cancel
				})
				
			}
		},
		computed: {

		},
		watch: {

		}
	};
</script>

<style scoped="scoped" lang="scss">
	.storeList {
		/deep/ .list-hotel .lists {
			width: 660px;

			.list-top {
				height: 438px;
			}
		}
	}
</style>
