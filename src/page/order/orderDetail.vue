<template>
	<div class="orderDetail" v-if="orderDetail">
		<div class="header">
			<span>{{orderDetail.oStateName}}</span>
			<div class="header-desc">
				<span>{{otherInfo.oStateDes}}</span>
				<!-- <span class="count-down">14分05秒</span> -->
			</div>
		</div>
		<div class="section-wrap">
			<div class="center-container">
				<!-- 入住信息 -->
				<div class="room-info container">
					<!-- 预订日期 -->
					<div class="reserve-date row" v-if="otherInfo">
						<div class="rz-date container">
							<em>入住日期</em>
							<span>{{otherInfo.stayInDay}}</span>
							<em>{{otherInfo.stayInTime}}</em>
						</div>
						<div class="rz-sums">共{{otherInfo.stayNight}}晚</div>
						<div class="ld-date container">
							<em>退房日期</em>
							<span>{{otherInfo.stayOutDay}}</span>
							<em>{{otherInfo.stayOutTime}}</em>
						</div>
					</div>
					<!-- 位置等信息 -->
					<div class="address-other">
						<div class="other-tips row">
							<span>{{orderDetail.oDes}}</span>
							<!-- <van-icon name="arrow" /> -->
						</div>
						<div class="address-info row">
							<div class="room-name container">
								<span class="name-text">{{orderDetail.oName}}</span>
								<span class="room-type">{{orderDetail.roomDes}}</span>
							</div>
							<!-- <van-icon name="arrow" /> -->
						</div>
						<!-- 具体位置 地图展示 -->
						<div class="map-view">
							<!-- <map id="map" bindtap='openLocation' longitude="116.1192065477" latitude="39.6470720880" scale="14" 
              markers="{{markers}}"
              show-location
              style="width: 100%; height: 134px;"
              enable-scroll="{{enableScroll}}">
              </map>-->
							<div class="address-text row">
								<span>{{orderDetail.roomAddress}}</span>
								<div class="to-navi row">
									<img class="to-navi-img" src="/static/img/to-navi.png" alt>
									<span>去导航</span>
								</div>
							</div>
						</div>
						<!-- 联系商户 -->
						<div class="concat-merchant row">
							<div class="merchant-left row">
								<img :src="orderDetail.roomAccImg" class="merchant-head">
								<div class="merchant-info">
									<p>{{orderDetail.accountName}}</p>
									<span>商户</span>
								</div>
							</div>
							<div class="concat-phone row" @click="jumpFd(orderDetail.accountId)">
								<img class="phone-icon" src="/static/img/da-phone.png" alt>
								<span>打电话</span>
							</div>
						</div>
					</div>
				</div>
				<!-- 订单信息 -->
				<div class="order-content container">
					<div class="rzr-info">
						<div class="order-num row">
							<span class="left-head">订单编号</span>
							<span>{{orderDetail.orderCode}}</span>
						</div>
						<div class="rz-ren row">
							<span class="left-head">入住人</span>
							<span>{{orderDetail.recName}}</span>
						</div>
						<div class="rzr-phone row">
							<span class="left-head">手机号</span>
							<span>{{orderDetail.recPhone}}</span>
						</div>
					</div>
					<div class="online-pay row">
						<span>线上支付</span>
						<div class="money row">
							<span>￥{{orderDetail.oMoney}}</span>
							<!-- <van-icon name="arrow" /> -->
						</div>
					</div>
					<div class="pay-deposit row">
						<span>押金</span>
						<div class="money row">
							<span>￥{{orderDetail.extMoney}}</span>
							<!-- <van-icon name="arrow" /> -->
						</div>
					</div>
					<div class="order-tips row">
						<span>若需要机打发票，请在退房时在民宿前台开具发票</span>
						<!-- <van-icon name="arrow" /> -->
					</div>
				</div>
				<!-- 入住须知 -->
				<div class="rz-notice">
					<div class="notice-title">入住须知</div>
					<div class="notice-content">{{otherInfo.userShouldKnow}}</div>
				</div>
			</div>
		</div>
		<!-- 底部按钮 -->
		<div class='footer row'>
			<span v-if="orderDetail.oExtB == 'btnNeedHelp'" >
				<span class="cancel-btn concat-kf"><a :href="'tel:' + serviceTel">{{orderDetail.oExtA}}</a></span>
			</span>
			<span v-else>
				<div class='cancel-btn' v-if="orderDetail.oExtA" @click='operaClick(orderDetail.oExtB,orderDetail)'>{{orderDetail.oExtA}}</div>
			</span>
			<span class='other-btn' v-if="orderDetail.oExtC" @click='operaClick(orderDetail.oExtD)'>{{orderDetail.oExtC}}</span>
		</div>
	</div>
</template>

<script>
	import WeixinJSBridge from 'weixin-js-sdk'
	import {
		getOrderByCode,
		createWXPay,
		orderPleaseConfirm,
		orderApplyRefund,
		orderCancel,
		orderDeleteByUser
	} from "../../api/api";
	export default {
		name: "orderDetail",
		data() {
			return {
				orderDetail: null,
				otherInfo: null,
				orderCode: this.$route.query.ordercode
			};
		},
		components: {
			WeixinJSBridge
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let par = {
					ordercode: this.orderCode
				}
				getOrderByCode(par).then(res => {
					if (res.respCode === '2000') {
						this.orderDetail = res.respData
						this.otherInfo = res.respDataExt
					}
				})
			},
			// 跳转至房东页
			jumpFd(accountId) {
				this.$router.push({
					path: "/fdImpress",
					query: {
						accountId: accountId
					}
				});
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
							this.$router.replace({
								path: "/order"
							});
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
						this.$router.replace({
							path: "/order"
						});
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
							this.$router.replace({
								path: "/order"
							});
						} else {
							this.$toast('支付失败！')
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
							this.$router.replace({
								path: "/order"
							});
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
							this.$router.replace({
								path: "/order"
							});
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
				this.$router.replace({
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
							this.$toast(res.respMsg);
							this.$router.replace({
								path: "/order"
							});
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
			serviceTel(){
				return this.$store.state.servicePhone
			}
		},
		watch: {}
	};
</script>

<style scoped="scoped" lang="scss">
	.orderDetail {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow-y: auto;
		background: #f0f0f8;

		.section-wrap {
			display: flex;
			justify-content: center;
		}

		em {
			font-style: normal;
		}

		.row {
			display: flex;
			flex-direction: row;
			margin: 8px 0;
			align-items: center;
		}

		.header {
			width: 100%;
			margin: 48px 0 42px 58px;
		}

		.header>span {
			font-size: 48px;
			color: #ffd33b;
		}

		.header-desc {
			margin-top: 20px;
		}

		.header-desc>span {
			font-size: 30px;
		}

		.header-desc .count-down {
			color: #ffd33b;
		}

		.center-container {
			width: 702px;
		}

		.room-info {
			background-color: #fff;
			border-radius: 30px;
			padding: 51px 0 43px;
		}

		.rz-sums {
			margin: 0 60px;
			padding: 10px 18px;
			border: 1px solid #f0f0f8;
			border-radius: 50px;
		}

		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.rz-date>em,
		.ld-date>em,
		.rz-sums {
			font-size: 24px;
			color: #484848;
		}

		.rz-date>span,
		.ld-date>span {
			display: inline-block;
			font-size: 36px;
			color: #ffd33b;
			margin-top: 20px;
		}

		/* 位置等其它信息 */
		.address-other {
			width: 600px;
		}

		.other-tips {
			padding: 30px 17px;
			border-top: 1px solid #f0f0f8;
			border-bottom: 1px solid #f0f0f8;
			margin: 43px 0 33px;
			justify-content: space-between;
		}

		.other-tips>span {
			font-size: 24px;
			color: #ffd33b;
		}

		.right-icon {
			width: 10px;
			height: 18px;
		}

		.room-name {
			align-items: flex-start;
		}

		.name-text {
			font-size: 24px;
			color: #333;
			margin-bottom: 14px;
			max-width: 517px;
			line-height: 0.6rem;
		}

		.room-type {
			font-size: 24px;
			color: #999;
		}

		.address-info {
			padding: 0 17px;
			justify-content: space-between;
		}

		/* 地图 */
		.map-view {
			margin: 38px 0 44px;
		}

		.address-text {
			margin-top: 42px;
			padding-bottom: 35px;
			border-bottom: 1px solid #f0f0f8;
			justify-content: space-between;
		}

		.address-text>span {
			font-size: 24px;
			color: #999;
		}

		.to-navi>span {
			font-size: 24px;
			color: #ffd33b;
		}

		.to-navi-img {
			width: 28px;
			height: 29px;
			margin-right: 9px;
		}

		/* 联系商户 */
		.concat-merchant {
			justify-content: space-between;
		}

		.merchant-head {
			width: 54px;
			height: 54px;
			border-radius: 50%;
			margin-right: 11px;
		}

		.merchant-info>p {
			font-size: 24px;
		}

		.merchant-info>span {
			font-size: 20px;
			color: #999;
		}

		.phone-icon {
			width: 30px;
			height: 30px;
			margin-right: 9px;
		}

		.concat-phone>span {
			font-size: 24px;
			color: #ffd33b;
		}

		/* 订单信息 */
		.order-content {
			padding: 44px 51px 54px;
			background-color: #fff;
			border-radius: 30px;
			margin: 20px 0 66px;
		}

		.rzr-info {
			width: 100%;
			padding: 0 0 33px 25px;
			border-bottom: 1px solid #f0f0f8;

			>div {
				margin: 5px 0;
			}

			>span {
				margin-bottom: 16px;
				padding: 10px 0;
			}

			.left-head {
				color: #999;
				width: 130px;
				margin-right: 16px;
			}

			span {
				font-size: 30px;
			}
		}

		.online-pay,
		.pay-deposit {
			width: 100%;
			padding: 38px 0 38px 25px;
			justify-content: space-between;
			border-bottom: 1px solid #f0f0f8;
		}

		.online-pay>span,
		.pay-deposit>span {
			font-size: 30px;
			color: #999;
		}

		.money {
			span {
				font-size: 30px;
				margin-right: 14px;
			}

			.van-icon {
				color: #666;
			}
		}

		.order-tips {
			width: 100%;
			padding-left: 17px;
			margin-top: 47px;
			justify-content: space-between;
			font-size: 24px;
			color: #ffd33b;
		}

		/* 入住须知 */
		.notice-title {
			font-size: 36px;
			font-weight: 600;
		}

		.notice-content {
			font-size: 24px;
			color: #999;
			margin: 36px 0 80px;
		}

		/* 底部按钮 */
		.footer {
			width: 100%;
			height: 120px;
			background-color: #fff;
			justify-content: flex-end;
		}

		.cancel-btn {
			border: 2px solid #f0f0f8;
			display: inline-block;
		}

		.cancel-btn,
		.other-btn {
			width: 198px;
			height: 80px;
			line-height: 80px;
			text-align: center;
			font-size: 36px;
			border-radius: 50px;
			margin-right: 51px;
		}

		.other-btn {
			color: #fff;
			border: 2px solid #ffd33b;
			background-color: #ffd33b;
		}

		.concat-kf {
			background-color: transparent;
			padding: 0;
			margin: 0 50px 0 0;
			a{
				color: #333;
				display: inline-block;
			}
		}
	}
</style>
