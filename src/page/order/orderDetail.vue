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
				<div class='cancel-btn' v-if="orderDetail.oExtA" @click='orderDetail.oExtB'>{{orderDetail.oExtA}}</div>
			</span>
			<span class='other-btn' v-if="orderDetail.oExtC" @click='orderDetail.oExtD'>{{orderDetail.oExtC}}</span>
		</div>
	</div>
</template>

<script>
	import {
		getOrderByCode
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
		components: {},
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
			jumpFd(accountId) {
				this.$router.push({
					path: "/fdImpress",
					query: {
						accountId: accountId
					}
				});
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
