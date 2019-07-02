<template>
	<div class="orderList">
		<van-tabs v-model="datas.active" swipeable animated @change="changeTab">
			<van-tab v-for="(title,inx) in datas.titles" :key="inx" :title="title.name">
				<van-list
					v-model="datas.loading" 
					:finished="datas.finished" 
					:finished-text="datas.finishedText" @load="onLoad">
					<!-- 空页面 -->
					<no-data v-if="datas.items.length == 0 && !datas.loading" :NoDataVal = 'datas.NoDataObj' ></no-data>
					<div class="orderCon" v-else>
						<div class="all-order-list" v-for="(item,index) in datas.items" :key="index">
							<div class="order-header row">
								<span class="order-header-text">{{item.accountName}}</span>
								<span class="order-header-state">{{item.oStateName}}</span>
							</div>
							<div class="order-content row" @click="jumpDetail(item.orderCode)">
								<div class="order-img-text row">
									<img :src="item.roomAccImg" class="order-img">
									<div class="order-title">
										<p class="order-name">{{item.oName}}</p>
										<span class="order-date">{{item.oDes}}</span>
									</div>
								</div>
								<div class="order-price">￥{{item.oMoney}}</div>
							</div>
							<div class="order-footer row">
								<div class="order-pay-time">
									<span>{{item.recMark}}</span>
								</div>
								<div class="order-btn row">
									<span>
										<span v-if="item.oExtB == 'btnNeedHelp'" >
											<span class="btn-item btn-concat concat-kf"><a :href="'tel:' + serviceTel">{{item.oExtA}}</a></span>
										</span>
										<span v-else >
											<b class="btn-item btn-concat bStyle"  @click="item.oExtB" v-if="item.oExtA">{{item.oExtA}}</b>
										</span>
									</span>
									 <span class='btn-item btn-pay' @click="item.oExtD" v-if="item.oExtC">{{item.oExtC}}</span>
								</div>
							</div>
						</div>
					</div>
				</van-list>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import noData from '@/components/NoData.vue'
	import {
		Tab,
		Tabs
	} from "vant";
	import {
		getListPageByUserOrAcc
	} from "../../api/api";
	export default {
		name: "order",
		data() {
			return {
				pageData: {
					pageSize: 15,
					pageNum: 1
				},
				datas: {
					active: 0,
					stateId:0,
					NoDataObj: {
						text: '还没有订单哦',
						btnShow: true,
						name: '去逛逛吧',
						path: '/home',
					},
					titles:[
						{key:'0',name:'全部'},
						{key:'1',name:'待支付'},
						{key:'2',name:'待确认'},
						{key:'5',name:'待评价'},
					],
					loading: false, //是否处于加载状态
					finished: false, //是否已加载完所有数据
					finishedText:'',
					len:1,
					items: []
				}
			};
		},
		components: {
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			noData
		},
		mounted() {
		},
		methods: {
			onLoad(){
				setTimeout(async() =>{
					let par = {
						stateId:this.datas.stateId,
						userId:localStorage.getItem('userId'),
						accountId:0,
						pageSize:this.pageData.pageSize,
						pageIndex:this.pageData.pageNum
					}
					getListPageByUserOrAcc(par).then(res =>{
						if(res.respCode === '2000'){
							// 新数据拼接
							this.datas.items = this.datas.items.concat(res.respData)
							// 加载状态结束
							this.datas.loading = false;
							// 数据全部加载完成
							if(this.datas.items.length >= res.respDataExt.totalCount){
								this.datas.finished = true; //数据加载完成
							}
							this.pageData.pageNum ++;
							console.log(this.datas.items)
							this.datas.finishedText = this.datas.items.length ===0 ? '' : '没有更多数据了'
						}else{
							this.datas.finished = true;
						}
					})
				},150)
				
			},
			// 当前激活的标签改变时触发
			changeTab(inx,title) {
				var scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				scrollTop = 0;
				this.datas.NoDataObj.text = inx ==0 ? '还没有订单哦' : '还没有'+title+'的订单哦'
				this.datas.stateId = title == '待评价' ? 5 : inx
				this.datas.items = []
				this.pageData.pageNum = 1
				this.datas.loading = true //下拉加载中
				this.datas.finished = false 
				if(this.datas.loading){
					this.onLoad()
				}
			},
			jumpDetail(orderCode) {
				this.$router.push({
					path: "/orderDetail",
					query: {
						ordercode:orderCode,
					}
				})
			},
			// 删除
			btnDelByUser(){
				alert(1)
			}
		},
		computed: {
			serviceTel(){
				return this.$store.state.servicePhone
			}
		},
		watch: {}
	};
</script>

<style scoped="scoped" lang="scss">
	.orderList {
		position: relative;
		width: 100%;
		height: -webkit-fill-available;
// 		top: 0;
// 		left: 0;
// 		overflow-y: auto;
		background: #f0f0f8;
		/deep/ .van-tabs {
			.van-tabs__wrap {
				padding: 40px;
				position: unset;

				.van-tabs__nav {
					background: none;

					.van-tabs__line {
						bottom: 0;
						background-color: #ffd33b;
						height: 0.078rem;
						padding: 0 15px;
						left: -15px;
						margin: -8px 0;
					}

					.van-tab {
						font-size: 30px;
						color: #424649;
					}

					.van-tab--active {
						color: #ffd33b;
					}
				}
			}

			.van-tabs__content {
				.van-tabs__track{
					min-height: 1000px;
				}
				.van-tabs {
					height: 500px;
				}
				
				.van-tab__pane {
					position: relative;
					min-height: 1000px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding-bottom: 160px;
					.row {
						display: flex;
						flex-direction: row;
						align-items: center;
					}

					.all-order-list {
						width: 645px;
						height: 301px;
						padding: 37px 28px 32px 29px;
						background-color: #fff;
						border-radius: 30px;
						margin-bottom: 20px;
					}

					.order-img {
						width: 182px;
						height: 120px;
						border-radius: 10px;
						margin-right: 22px;
					}

					.order-header {
						justify-content: space-between;
					}

					.order-header-text {
						font-size: 20px;
						color: #666;
					}

					.order-header-state {
						font-size: 26px;
						color: #ffd33b;
					}

					.order-content {
						margin: 40px 0 50px;
						align-items: flex-start;
						justify-content: space-between;
					}

					.order-img-text {
						align-items: flex-start;
					}

					.order-name {
						display: block;
						font-size: 20px;
						margin-bottom: 12px;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.order-date {
						font-size: 20px;
						color: #666;
					}

					.order-price {
						font-size: 24px;
						font-weight: 600;
						margin: 16px 0 0 15px;
					}

					.order-pay-time {
						font-size: 24px;
						color: #666;
					}

					.order-pay-time>span {
						color: #ffd33b;
					}

					.order-footer {
						justify-content: space-between;
					}

					.btn-item {
						width: 165px;
						height: 53px;
						line-height: 53px;
						text-align: center;
						font-size: 30px;
						border-radius: 50px;
					}

					.btn-item:last-child {
						margin-left: 10px;
					}

					.btn-concat {
						color: #666;
						font-size: 26px;
						border: 2px solid #f0f0f8;
						display: inline-block;
					}
					.bStyle{
						font-weight: normal;
					}
					.concat-kf{
						a{
							color: #666;
							display: inline-block;
							width: inherit;
						}
					}
					.btn-pay {
						color: #fff;
						border: 2px solid #ffd33b;
						background-color: #ffd33b;
					}
				}
			}
		}
	}
</style>
