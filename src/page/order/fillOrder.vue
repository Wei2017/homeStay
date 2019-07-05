<template>
	<div class="fillOrder">
		<div class="order-detail" v-if="roomMainInfo">
			<div>
				<h3>{{roomMainInfo.roomName}}</h3>
				<p>{{roomMainInfo.roomDes}}</p>
			</div>
			<div>
				<span>
					<img :src="roomMainInfo.roomImg" alt>
				</span>
			</div>
		</div>
		<div class="choseTime" @click="choseTime()" v-if="dateInfo">
			<div>
				<span>入住日期</span>
				<span>{{dateInfo.stayInDay}}</span>
			</div>
			<div>
				<span>退房日期</span>
				<span>{{dateInfo.stayOutDay}}</span>
			</div>
			<div>
				<span>共</span>
				<span>{{dateInfo.totalNightCount}}晚</span>
			</div>
		</div>
		<ul class="hotel-detail">
			<li>
				<span>房屋套数</span>
				<div class="stepNum">
					<span><em @click="roomMinus(1)">-</em></span>
					<b>{{obj.roomNum}}套</b>
					<em @click="roomPlus(1)">+</em>
				</div>
			</li>
			<li>
				<span>入住人数</span>
				<div class="stepNum">
					<em @click="roomMinus(2)">-</em>
					<b>{{obj.personNum}}人</b>
					<em @click="roomPlus(2)">+</em>
				</div>
			</li>
			<li>
				<span>入住人</span>
				<input type="text" v-model="obj.name" placeholder="填写真实姓名">
			</li>
			<li>
				<span>手机号</span>
				<input type="tel" v-model="obj.tel" placeholder="手机号将被用于接收订单信息">
			</li>
			<li>
				<span>身份证信息</span>
				<input type="text" v-model="obj.idCard" placeholder="选填">
			</li>
			<li>
				<span>费用明细</span>
				<div @click="showPriceDetail">
					查看详情
					<van-icon name="arrow" />
				</div>
			</li>
			<li>
				<span>用户留言</span>
				<input type="text" v-model="obj.msg" placeholder="选填">
			</li>
		</ul>
		<div class="notice">
			<h3>预定须知</h3>
			<div v-if="dateInfo">{{dateInfo.userShouldKnow}}</div>
		</div>
		<div class="bottomBtn">
			<b v-if="dateInfo">￥{{dateInfo.totalFee}}</b>
			<span @click="sureOrder">立即预定</span>
		</div>
	</div>
</template>

<script>
	import WeixinJSBridge from 'weixin-js-sdk'
	import {
		getModelByRoomAccId,
		getRoomDayDefaultSel,
		getRoomDayUserSel,
		addOrderHotel,
		createWXPay
	} from "../../api/api";
	import { mapState } from 'vuex'
	export default {
		name: "fillOrder",
		data() {
			return {
				delId: this.$route.query.delId,
				roomMainInfo: null, //房型主要信息
				dateInfo: null,
				orderInfo:null,
				obj: {
					roomNum: 1,
					personNum: 1, //入住人数
					name: "", //人住人姓名
					tel: "", //入住人电话
					idCard: "", //入住人身份证信息
					msg: '', //用户留言
				},
				dates: null,
				flag:0
			};
		},
		components: {},
		beforeRouteEnter(to,from,next){
			if(from.name === 'detail' || !from.name){
				next(vm =>{
					vm.flag = 0
				})
			}else{
				next(vm =>{
					vm.flag = 1 
				})
			}
		},
// 		beforeRouteEnter(to,from,next){
// 			if(from.name === 'detail' || !from.name){
// 				next(vm =>{
// 					vm.$store.state.searchDate = {}
// 					vm.getDateInfo()
// 				})
// 				return 
// 			}else{
// 				next(vm =>{
// 					vm.$nextTick(function(){
// 						console.log(vm.$store.state.selectDate)
// 						vm.upDates()
// 						
// 						console.log(vm.dateInfo)
// 					})
// 				})
// 			}
// 		},
		mounted() {
			this.init()
			// this.getRoomDetail()
			console.log(WeixinJSBridge)
		},
		methods: {
			init(){
				this.getDateInfo()
				this.getRoomDetail()
			},
			getDateInfo() {
				// 获取默认一个房型选择的日历
				getRoomDayDefaultSel(this.$route.query.delId).then(res => {
					if (res.respCode === '2000') {
						this.dateInfo = res.respData
					}
				})
			},
			getRoomDetail(){
				// 获取一个房型的主要信息 
				getModelByRoomAccId(this.$route.query.delId).then(res => {
					if (res.respCode === '2000') {
						this.roomMainInfo = res.respData
					}
				})
			},
			// 选择日期后重新赋值
			upDates() {
				let selectDate = this.$store.state.selectDate
				this.dateInfo = selectDate
				this.dateInfo.stayInDay = selectDate.rzDate
				this.dateInfo.stayOutDay = selectDate.ldDate
				this.dateInfo.totalNightCount = selectDate.daysSum
				this.dateInfo.startRoomDayId = selectDate.rzIndex
				this.dateInfo.endRoomDayId = selectDate.ldIndex
				this.$route.query.delId = selectDate.roomId
				console.log('update',this.dateInfo)
				this.getNewDateinfo()
			},
			// 选择时间、房屋套数后，重新获取dateInfo的值
			getNewDateinfo() {
				let par = {
					startRoomDayId: this.dateInfo.startRoomDayId,
					endRoomDayId: this.dateInfo.endRoomDayId,
					roomAccId: this.$route.query.delId,
					roomCount: this.obj.roomNum,
				}
				getRoomDayUserSel(par).then(res => {
					if (res.respCode === '2000') {
						this.dateInfo = res.respData
					}
				})
			},
			// 选取时间
			choseTime() {
				let rz = this.dateInfo.startRoomDayId,
					ld = this.dateInfo.endRoomDayId,
					id = this.roomMainInfo.roomAccId,
					count = this.dateInfo.totalNightCount
				this.$router.push({
					path: "/selectDate",
					query: {
						roomAccId: id,
						rz: rz,
						ld: ld,
						count: count
					}
				});
			},
			// 房屋数量--
			roomMinus(inx) {
				if (inx === 1) {
					if (this.obj.roomNum > 1) {
						this.obj.roomNum = this.obj.roomNum - 1;
						this.getNewDateinfo()
					}
				} else {
					if (this.obj.personNum <= 1) {
						return;
					}
					this.obj.personNum--;
				}
			},
			roomPlus(inx) {
				if (inx === 1) {
					if (this.obj.roomNum < this.dateInfo.totalMaxRoomCount) {
						this.obj.roomNum = this.obj.roomNum + 1;
						this.getNewDateinfo()
					} else {
						this.$toast(`最多选择${this.dateInfo.totalMaxRoomCount}套房`);
					}
				} else {
					this.obj.personNum++;
				}
			},
			// 查看费用明细
			showPriceDetail() {
				this.$router.push({
					path: "/priceDetail",
					query: {
						startRoomDayId: this.dateInfo.startRoomDayId,
						endRoomDayId: this.dateInfo.endRoomDayId,
						roomAccId: this.$route.query.delId,
						roomCount: this.obj.roomNum
					}
				});
			},
			// 立即预定
			sureOrder() {
// 				if (this.obj.name === '') {
// 					this.$toast('请输入入住人的姓名')
// 					return
// 				}
// 				if (this.obj.tel === '') {
// 					this.$toast('请输入手机号码')
// 					return
// 				}
// 				if (!(/^1[3456789]\d{9}$/.test(this.obj.tel))) {
// 					this.$toast('请输入正确的手机号码')
// 					return
// 				}
				let par = {
					roomAccId: this.$route.query.delId,
					userId: localStorage.getItem('userId'),
					startRoomDayId: this.dateInfo.startRoomDayId, //用户选择的入住时间的 roomday的id
					endRoomDayId: this.dateInfo.endRoomDayId, //用户选择的离店时间的 roomday的id
					usermsg: this.obj.msg, //用户留言
					userName: this.obj.name, //入住用户姓名
					userPhone: this.obj.tel, //用户联系电话
					userIdCard: this.obj.idCard, //入住人员身份证, 选填
					roomCount: this.obj.roomNum, //预订房间套数
					personCount: this.obj.personNum, //入住人数量
				}
				console.log(par)
// 				addOrderHotel(par).then(res => {
// 					if (res.respCode === '2000') {
// 						let orderInfo = res.respData
// 						let payData = {
// 							from: 1, //1为花啦微店网页端 
// 							orderCode: orderInfo.orderCode, //订单编号
// 							orderMoney: orderInfo.oMoney, //订单总金额
// 							orderName: orderInfo.oName, //订单名称
// 							orderDes: orderInfo.oDes, //订单描述, 选填
// 							userIp: '', //终端设备ip
// 							openId: 'ombSf4v8rLZ-X3eQV7CpGeQPcuOM', //
// 						}
// 						createWXPay(payData).then(res => {
// 							if (res.respCode === '2000') {
// 								const pay_params = res.respData
// 								if (typeof WeixinJSBridge == "undefined") {
// 									if (document.addEventListener) {
// 										document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
// 									} else if (document.attachEvent) {
// 										document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
// 										document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
// 									}
// 								} else {
// 									this.onBridgeReady(pay_params);
// 								}
// 							} else {
// 								this.$toast(res.respMsg)
// 							}
// 						})
// 					} else {
// 						this.$toast(res.respMsg)
// 					}
// 				})
			},
			// 获取微信签名
			onBridgeReady(params) {
				const pay_params = JSON.parse(params);
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {  //微信接口
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
						}else{
							this.$toast('支付失败！')
							this.$router.push({
								path: "/order"
							});
						}
					});
			},
		},
		computed: {
			...mapState({
				searchKey:state =>state.searchKey,
				selectDate:state =>state.selectDate,
			})
		},
		watch: {
			flag(){
				if(this.flag === 0){
					this.$route.meta.keepAlive = false
				}else{
					this.$route.meta.keepAlive = true
					this.upDates()
				}
			}
		}
	};
</script>

<style scoped="scoped" lang="scss">
	@import "../../style/com.css";

	.fillOrder {
		padding: 20px 0 80px 0;
		>div {
			padding:20px;
		}

		.order-detail {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15px 10px 30px;

			h3 {
				font-size: 24px;
				line-height: 0.5rem;
			}

			p {
				color: #999;
				font-size: 24px;
				margin-top: 15px;
			}

			div:nth-child(2) {
				margin-left: 25px;

				span {
					width: 200px;
					height: 134px;
					display: inline-block;

					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.choseTime {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 35px;
			padding: 53px 26px 63px;
			border-top: 1px solid #f0f0f8;

			>div {
				display: flex;
				flex-direction: column;
				align-items: center;

				span {
					font-size: 24px;
					color: #484848;
				}

				span:nth-child(2) {
					font-size: 36px;
					color: #ffd33b;
					margin-top: 26px;
				}
			}
		}

		.hotel-detail {
			li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40px 30px;
				border-top: 1px solid #f0f0f8;

				span {
					font-size: 36px;
					color: #484848;
				}

				b,
				em {
					font-style: normal;
					font-weight: normal;
				}

				>div,
				input {
					width: 70%;
					text-align: right;
				}

				div.stepNum {
					em {
						display: inline-block;
						width: 40px;
						height: 40px;
						line-height: 40px;
						text-align: center;
						border-radius: 50%;
						color: #ffd33b;
						border: 2px solid #ffd33b;
						touch-action: none;
						margin: 0 20px;
					}

					em:nth-child(1) {
						color: #ccc;
						border: 2px solid #ccc;
					}

					b {
						font-size: 24px;
						color: #484848;
						padding: 0 10px;
					}
				}
			}

			li:last-child {
				>div {
					width: 40%;
					color: #999;

					i {
						margin-left: 8px;
						top: 4px;
					}
				}
			}
		}

		.notice {
			background: #f0f0f8;
			margin-bottom: 200px;

			h3 {
				font-size: 36px;
				color: #000;
				padding: 40px 5px 20px;
			}

			>div {
				color: #999;
				font-size: 24px;
				line-height: 0.55rem;
				padding: 0 5px 80px;
			}
		}

		.bottomBtn {
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 9999;
			border-top: 1px solid #e9e9e9;
			width: 100%;
			height: 90px;
			background: #fff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #000;

			b {
				font-weight: normal;
				font-size: 36px;
			}

			span {
				display: inline-block;
				padding: 20px 120px;
				border-radius: 50px;
				background: #ffd544;
			}
		}
	}
</style>
