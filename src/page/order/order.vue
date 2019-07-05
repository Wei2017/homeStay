<template>
	<div class="orderList">
		<van-tabs v-model="datas.active" swipeable animated @change="changeTab">
			<van-tab v-for="(title,inx) in datas.titles" :key="inx" :title="title.name">
				<van-list 
					v-model="datas.loading" 
					:finished="datas.finished" 
					:finished-text="datas.finishedText" @load="onLoad">
					<!-- 空页面 -->
					<no-data v-if="datas.items.length == 0 && !datas.loading" :NoDataVal='datas.NoDataObj'></no-data>
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
										<span v-if="item.oExtB == 'btnNeedHelp'">
											<span class="btn-item btn-concat concat-kf"><a :href="'tel:' + serviceTel">{{item.oExtA}}</a></span>
										</span>
										<span v-else>
											<b class="btn-item btn-concat bStyle" @click="operaClick(item.oExtB,item)" v-if="item.oExtA">{{item.oExtA}}</b>
										</span>
									</span>
									<span class='btn-item btn-pay' @click="operaClick(item.oExtD,item)" v-if="item.oExtC">{{item.oExtC}}</span>
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
	import WeixinJSBridge from 'weixin-js-sdk'
	import {
		Tab,
		Tabs
	} from "vant";
	import {
		getListPageByUserOrAcc,
		createWXPay,
		orderPleaseConfirm,
		orderApplyRefund,
		orderCancel,
		orderDeleteByUser
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
					stateId: 0,
					NoDataObj: {
						text: '还没有订单哦',
						btnShow: true,
						name: '去逛逛吧',
						path: '/home',
					},
					titles: [{
							key: '0',
							name: '全部'
						},
						{
							key: '1',
							name: '待支付'
						},
						{
							key: '2',
							name: '待确认'
						},
						{
							key: '5',
							name: '待评价'
						},
					],
					loading: false, //是否处于加载状态
					finished: false, //是否已加载完所有数据
					finishedText: '',
					len: 1,
					items: []
				}
			};
		},
		components: {
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			noData,
			WeixinJSBridge
		},
		beforeRouteEnter(to, from, next) {
			window.document.body.style.backgroundColor = "#f0f0f8";
			console.log(from)
			if(from.name === 'orderDetail'){
				next(vm =>{
					vm.pageData.pageNum = 1
					vm.datas.items = []
					vm.datas.loading = true //下拉加载中
					vm.datas.finished = false
					if (vm.datas.loading) {
						vm.onLoad()
					}
				})
				return;
			}
			next()
		},
		beforeRouteLeave(to, from, next) {
			window.document.body.style.backgroundColor = "";
			next();
		},
		mounted() {},
		methods: {
			onLoad() {
				// setTimeout(async () => {
					let par = {
						stateId: this.datas.stateId,
						userId: localStorage.getItem('userId'),
						accountId: 0,
						pageSize: this.pageData.pageSize,
						pageIndex: this.pageData.pageNum
					}
					getListPageByUserOrAcc(par).then(res => {
						if (res.respCode === '2000') {
							// 新数据拼接
							this.datas.items = this.datas.items.concat(res.respData)
							// 加载状态结束
							this.datas.loading = false;
							// 数据全部加载完成
							if (this.datas.items.length >= res.respDataExt.totalCount) {
								this.datas.finished = true; //数据加载完成
							}
							this.pageData.pageNum += 1;
							console.log(this.datas.items)
							this.datas.finishedText = this.datas.items.length === 0 ? '' : '没有更多数据了'
						} else {
							this.datas.finished = true;
						}
					})
				// }, 150)

			},
			// 当前激活的标签改变时触发
			changeTab(inx, title) {
				var scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				scrollTop = 0;
				this.datas.NoDataObj.text = inx == 0 ? '还没有订单哦' : '还没有' + title + '的订单哦'
				this.datas.stateId = title == '待评价' ? 5 : inx
				this.datas.items = []
				this.pageData.pageNum = 1
				this.datas.loading = true //下拉加载中
				this.datas.finished = false
				if (this.datas.loading) {
					this.onLoad()
				}
			},
			jumpDetail(orderCode) {
				this.$router.push({
					path: "/orderDetail",
					query: {
						ordercode: orderCode,
					}
				})
			},
			/*
			 * 不同订单状态下 用户的操作
			 * btnCancel:表示用户未支付时取消订单 ==>调取消订单接口
			 * btnPay:表示用户对未付款订单的重新支付 ==>调用户支付接口
			 * btnApplyRefund:表示用户对已支付未入住订单的申请退款 ==>调用申请退款接口
			 * btnUrged:表示用户对待确认的催单，即发送短信给房东 ==>调用催单
			 * btnEvaluate:表示已离店用户要对订单进行评价 ==>调用评价接口
			 * btnNeedHelp:表示用户要联系客服 ==>调用微信客服，打开客服对话
			 * btnDelByUser:用户删除订单  ==>用户删除
			 * */
			// 操作按钮
			operaClick(btnName, item) {
				switch (btnName) {
					case 'btnCancel':
						this.btnCancel(item)
						break;
					case 'btnPay':
						this.btnPay(item)
						break;
					case 'btnApplyRefund':
						this.btnApplyRefund(item)
						break;
					case 'btnUrged':
						this.btnUrged(item)
						break;
					case 'btnEvaluate':
						this.btnEvaluate(item)
						break;
					case 'btnDelByUser':
						this.btnDelByUser(item)
						break;
				}
			},
			// 表示用户未支付时取消订单
			btnCancel(item) {
				let par = {
					oid: item.id,
					userid: localStorage.getItem('userId'),
					why: ''
				}
				this.$dialog.confirm({
					title: '取消订单',
					message: '取消后不可恢复，确定取消吗？'
				}).then(() => {
					orderCancel(par).then(res => {
						if (res.respCode === '2000') {
							this.$toast(res.respMsg);
							this.datas.items = []
							this.pageData.pageNum = 1
							this.datas.loading = true //下拉加载中
							this.datas.finished = false
							if (this.datas.loading) {
								this.onLoad()
							}
						} else {
							this.$toast(res.respMsg);
						}
					})
				}).catch(() => {

				})
			},
			// 表示用户对未付款订单的重新支付
			btnPay(item) {
				let payData = {
					from: 1, //1为花啦微店网页端 
					orderCode: item.orderCode, //订单编号
					orderMoney: item.oMoney, //订单总金额
					orderName: item.oName, //订单名称
					orderDes: item.oDes, //订单描述, 选填
					userIp: '', //终端设备ip
					openId: 'ombSf4v8rLZ-X3eQV7CpGeQPcuOM', //
				}
				createWXPay(payData).then(res => {
					if (res.respCode === '2000') {
						const pay_params = res.respData
						if (typeof WeixinJSBridge == "undefined") {
							if (document.addEventListener) {
								document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
							} else if (document.attachEvent) {
								document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
								document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
							}
						} else {
							this.onBridgeReady(pay_params);
						}
						this.datas.items = []
						this.pageData.pageNum = 1
						this.datas.loading = true //下拉加载中
						this.datas.finished = false
						if (this.datas.loading) {
							this.onLoad()
						}
					}
				})
			},
			// 获取微信签名
			onBridgeReady(params) {
				const pay_params = JSON.parse(params);
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', { //微信接口
						"appId": pay_params.appId, //公众号名称，由商户传入     
						"timeStamp": pay_params.timeStamp, //时间戳，自1970年以来的秒数     
						"nonceStr": pay_params.nonceStr, //随机串     
						"package": pay_params.package,
						"signType": pay_params.signType, //微信签名方式：     
						"paySign": pay_params.paySign, //微信签名 
						//这里的信息从后台返回的接口获得。
						jsApiList: [
							'chooseWXPay'
						]
					},
					function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							this.$toast('支付成功')
							// 支付成功调起的页面
							this.$router.push({
								path: "/sureOrder",
								query: {
									orderCode: orderInfo.orderCode
								}
							});
						} else {
							this.$toast('支付失败！')
							this.$router.push({
								path: "/order"
							});
						}
					});
			},
			// 表示用户对已支付未入住订单的申请退款
			btnApplyRefund(item) {
				let par = {
					oid: item.id,
					userid: localStorage.getItem('userId'),
					why: ''
				}
				this.$dialog.confirm({
					title: '确定退款',
					message: '确定退款吗？'
				}).then(() => {
					orderApplyRefund(par).then(res => {
						if (res.respCode === '2000') {
							this.$toast(res.respMsg);
							this.datas.items = []
							this.pageData.pageNum = 1
							this.datas.loading = true //下拉加载中
							this.datas.finished = false
							if (this.datas.loading) {
								this.onLoad()
							}
						} else {
							this.$toast(res.respMsg);
						}
					})
				}).catch(() => {

				})

			},
			// 表示用户对待确认的催单
			btnUrged(item) {
				let par = {
					oid: item.id,
					userid: localStorage.getItem('userId'),
					remark: ''
				}
				this.$dialog.confirm({
					title: '催单',
					message: '20分钟内未确认，您可以联系房东或者平台客服为您处理，确认催单吗？'
				}).then(() => {
					orderPleaseConfirm(par).then(res => {
						if (res.respCode === '2000') {
							this.$toast(res.respMsg);
							this.datas.items = []
							this.pageData.pageNum = 1
							this.datas.loading = true //下拉加载中
							this.datas.finished = false
							if (this.datas.loading) {
								this.onLoad()
							}
						} else {
							this.$toast(res.respMsg);
						}
					})
				}).catch(() => {
					// on cancel
				})
			},
			// 表示已离店用户要对订单进行评价
			btnEvaluate(item) {
				this.$router.push({
					path: "/evaluate",
					query: {
						orderCode: item.orderCode
					}
				});
			},
			// 用户删除订单
			btnDelByUser(item) {
				let par = {
					oid: item.id,
					userid: localStorage.getItem('userId')
				}
				this.$dialog.confirm({
					title: '删除订单',
					message: '确定要删除订单吗?'
				}).then(() => {
					orderDeleteByUser(par).then(res => {
						if (res.respCode === '2000') {
							for (let i = 0; i < this.datas.items.length; i++) {
								if (this.datas.items[i].id === item.id) {
									this.datas.items.splice(i, 1)
								}
							}
							this.$toast(res.respMsg);
						} else {
							this.$toast(res.respMsg);
						}
					})
				}).catch(() => {
					// on cancel
				})
			}
		},
		computed: {
			serviceTel() {
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
				.van-tabs__track {
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
						width: 135px;
						padding: 0 15px;
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

					.bStyle {
						font-weight: normal;
					}

					.concat-kf {
						a {
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
