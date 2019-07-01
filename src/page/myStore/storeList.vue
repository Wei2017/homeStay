<template>
	<div class="storeList">
		<!-- <div v-if="datas.listObj.items.length > 0"> -->
			<van-list v-model="datas.loading" :offset="50" :finished="datas.finished" finished-text="没有更多数据了" @load="onLoad">
				<com-list :listData="datas.listObj" @storeChange="storeChange"></com-list>
			</van-list>
		<!-- </div> -->
		<!-- <no-data v-else :NoDataVal = 'datas.NoDataObj' ></no-data> -->
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
					pageSize: 10,
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
						if (res.respData.length > 0) {
							if (res.respData.length <= this.pageData.pageSize) {
								this.datas.listObj.items = res.respData
								this.datas.finished = true; //数据加载完成
							} else {
								this.pageData.pageNum += 1;
								this.datas.listObj.items = this.datas.listObj.items.concat(
									res.respData
								)
							}
						} else {
							this.datas.finished = true; //数据加载完成
						}
					} else {
						this.datas.finished = true;
					}
					// 加载结束
					this.datas.loading = false;
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
							this.datas.isLoading = false
							this.onLoad()
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
