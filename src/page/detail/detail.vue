<template>
	<div class="detail">
		<div class="detail-top">
			<swiper :options="swiperOption" class="swiper">
				<swiper-slide v-for="(img,index) in detals.headBg" :key="index">
			    <img :src="img" alt="">
			  </swiper-slide>
			</swiper>
				<div class="swiper-pagination"></div>
				<div class="bgBtn">
				 <span><i></i>视频</span><span>图片</span>
				</div>
		</div>
		<div class="detail-con">
			<div class="title-detail">
				<h2>西湖市中心/地铁口/两居室</h2>
				<div class="title-con">
					<div>
						<span>1室2厅 45m</span>
						<span>整租</span>
					</div>
					<div>
						<span>2人1床</span>
						<span>宜住</span>
					</div>
					<div>
						<span>1厨1卫</span>
						<span>可做饭</span>
					</div>
				</div>
			</div>
			<div class="hotel-comment details-com">
				<div class="title">
					<h3>客房点评</h3>
					<span @click="jumpComment">全部评论(59)<van-icon name="arrow" /></span>
				</div>
				<div class="comment-con">
					<div class="top-con">
						<div><img src="/static/img/ms-lb.png" alt=""></div>
						<div>
							<p>房客</p>
							<p>2019-05-10入住</p>
						</div>
					</div>
					<div class="descript">房子紧邻历史悠久的京杭运河，交通便利，方便出去</div>
				</div>
			</div>
			<div class="hotel-descript details-com">
				<div class="title">
					<h3>房屋描述</h3>
					<span @click="clickMoreDetail">展开</span>
				</div>
				<div class="content" ref="hotelDesCon">"这是一个隐藏在繁华城市中心的安静之所，屋内的格式细软、床品、浴品，甚至小到一个杯子都是屋主精心挑选的。这里是杭城高端公寓，非常适合旅游，商务，家庭亲子等出行安排。希望能给您旅途带来居家的惬意和舒适。床单被套都是一客一换。
					房子紧邻历史悠久的京杭大运河，步行十分钟可这是一个隐藏在繁华城市中心的安静之所这是一个隐藏在繁华城市中心的安静之所这是一个隐藏在繁华城市中心的安静之所这是一个隐藏在繁华城市中心的安静之所这是一个隐藏在繁华城市中心的安静之所这是一个隐藏在繁华城市中心的安静之所以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京"</div>
			</div>
			<div class="hotel-position details-com">
				<div class="title">
					<h3>房屋位置</h3>
				</div>
				<baidu-map  class="bm-view" 
					:center="detals.mapData.center" 
					:zoom="detals.mapData.zoom" 
					:scroll-wheel-zoom="true"
					@ready="handler"
					ak="288jpGDll3P7KGTcENGEboLzqFWPImSG">
					<!-- :icon="{url: '/static/img/map_mark.png', size: {width: 53, height: 53}}" -->
					<bm-marker 
						:position="detals.mapData.center" 
						:dragging="true" animation="BMAP_ANIMATION_BOUNCE"
						:zIndex="999">
						<bm-label 
							:content="detals.mapData.address" 
							:labelStyle="detals.mapData.labelStyle" 
							:offset="{width: -20, height: 60}"/>
					</bm-marker>
				</baidu-map>
				<div class="descript">"这是一个隐藏在繁华城市中心的安静之所，屋内的格式细软、床品、浴品，甚至小到一个杯子都是屋主精心挑选的。这里是杭城高端公寓，非常适合旅游，商务，家庭亲子等出行安排。希望能给您旅途带来居家的惬意和舒适。床单被套都是一客一换。
					房子紧邻历史悠久的京杭大运河，步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京"</div>
			</div>
			<div class="hotel-device details-com">
				<div class="title">
					<h3>配套设备</h3>
					<span @click="jumpHotlDevice">查看更多<van-icon name="arrow" /></span>
				</div>
				<div class="content">
					<div class="list">
						<div class="lf-con">
							<i></i>
							<span>基础设施</span>
						</div>
						<div class="rg-con">
							<span><van-icon name="checked" />无线电视</span>
							<span class="clear"><van-icon name="clear" />无线电视</span>
						</div>
					</div>
					<div class="list">
						<div class="lf-con">
							<i></i>
							<span>厨房设施</span>
						</div>
						<div class="rg-con">
							<span><van-icon name="checked" />无线电视</span>
							<span class="clear"><van-icon name="clear" />无线电视</span>
						</div>
					</div>
				</div>
			</div>
			<div class="reserv-notice details-com">
				<div class="title">
					<h3>预定须知</h3>
				</div>
				<div class="content">
					<div>
						<h4>闪订</h4>
						<p>预定无需等待，订单闪电确认</p>
					</div>
					<div>
						<h4>在线收取押金400.00元</h4>
						<p>到店后无需再次支付</p>
					</div>
					<div>
						<h4>提供发票</h4>
						<p class="invoice" @click="jumpInvoice">开具发票，点击进入发票说明页 <van-icon name="arrow" /></p>
					</div>
					<div>
						<h4>退订规则(由房东定制)</h4>
						<p>到取消订单，收取定金的100%作为违约金支付给房东</p>
					</div>
				</div>
			</div>
			<div class="checkin-notice details-com">
				<div class="title">
					<h3>入住须知</h3>
				</div>
				<div class="content">
					<p><span>入住时间</span><b>15:00后</b></p>
					<p><span>退房时间</span><b>12:00前</b></p>
					<p><span>接待时间</span><b>15:00-24:00</b></p>
					<p><span>卫生打扫</span><b>一客一扫</b></p>
					<p><span>被单更换</span><b>一客一换</b></p>
					<p><span>毛巾更换</span><b>一客一换</b></p>
				</div>
			</div>
			<div class="other-cost details-com">
				<div class="title">
					<h3>额外费用</h3>
				</div>
				<div class="content">
					<p><span>加人:</span><b>最多入住2人，不接受加人</b></p>
					<p><span>加床:</span><b>不允许加床</b></p>
					<p><span>做饭:</span><b>可做饭(入住1-2天拒绝使用厨房，入住3天以上免厨房使用费。使用厨房钱和房东预约)</b></p>
				</div>
			</div>
			<div class="price-explain details-com">
				<div class="title">
					<h3>价格说明</h3>
				</div>
				<div class="descript">"这是一个隐藏在繁华城市中心的安静之所，屋内的格式细软、床品、浴品，甚至小到一个杯子都是屋主精心挑选的。这里是杭城高端公寓，非常适合旅游，商务，家庭亲子等出行安排。希望能给您旅途带来居家的惬意和舒适。床单被套都是一客一换。
				房子紧邻历史悠久的京杭大运河，步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京"</div>
			</div>
			<div class="hotel-number">
				<span>乐居  放心租</span>
				<span>房屋编号: 4007894</span>
			</div>
		</div>
		<div class="detail-footer">
			<div @click="jumpFd">
				<img src="/static/img/map_mark.png" alt="">
				<span>房东</span>
			</div>
			<div>
				<img src="/static/img/detail_tel.png" alt="">
				<span>电话</span>
			</div>
			<div class="btn" @click="sureOrder">
				<span>￥224</span>
				<em>￥263</em>
				<span>立即预定</span>
			</div>
		</div>
	</div>
</template>

<script>
	import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
	import { BmMarker,BmLabel} from 'vue-baidu-map'
	export default {
		name: 'detail',
		data() {
			return {
				delId:this.$route.query.delId,
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationType : 'fraction',
				},
				detals:{
					headBg: ['/static/img/footer-img@2x.png','/static/img/ms-lb.png'],
					mapData:{
						center:{lng: 116.1192065477, lat: 39.6470720880},
						zoom: 15,
						address:'地址:街道',
						labelStyle:{
							color: '#000', 
							fontSize : '14px',
							padding:'5px 10px',
							border:'none'
						}
					},
					checkNotice:{
						
					}
				},
			}
		},
		components: {
			BaiduMap,
			BmMarker,
			BmLabel
		},
		mounted() {
			console.log(this.$route.query.delId)
		},
		methods: {
			handler ({BMap, map}) {
				this.detals.mapData.center.lng = 116.1192065477
				this.detals.mapData.center.lat = 39.6470
				this.detals.mapData.zoom = 15
			},
			// 展开更多
			clickMoreDetail(){
				let con = this.$refs.hotelDesCon
				con.style.overflow = 'visible'
				con.style.height = 'auto'
			},
			//查看全部客房点评
			jumpComment(){
				this.$router.push({
				  path: "/commentList",
				  query: {delId: this.delId}
				})
			},
			// 查看更多配套设施
			jumpHotlDevice(){
				this.$router.push({
				  path: "/hotelDevice",
				  query: {delId: this.delId}
				})
			},
			// 开具发票
			jumpInvoice(){
				
			},
			// 房东印象
			jumpFd(){
				this.$router.push({
				  path: "/fdImpress",
				  query: {delId: this.delId}
				})
			},
			// 立即预定
			sureOrder(){
				this.$router.push({
				  path: "/fillOrder",
				  query: {delId: this.delId}
				})
			}
		},
		computed:{
			
		},
		watch: {
			delId(){
				console.log(this.delId)
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.detail{
		height: auto;
		.detail-top{
			height: 515px;
			position: relative;
			.swiper-container{
				height: 100%;
				.swiper-slide{
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			/deep/ .swiper-pagination-fraction{
				left:unset;
				right: 20px;
				width: unset!important;
				background:#a7a9ac;
				opacity: 0.9;
				border-radius: 25px;
				padding:10px 20px;
				color: #fff;
				font-size:20px;
				bottom:65px;
			}
			.bgBtn{
				position: absolute;
				bottom:65px;
				z-index: 99;
				width:100%;
				text-align: center;
				span{
					color: #000;
					font-size:24px;
					padding:13px 35px;
					background: #ffd43f;
					border-radius: 50px;
				}
				span:nth-child(1){
					background: #fff;
					margin-right: 20px;
					opacity: 0.7;
					i{
						display: inline-block;
						width: 0;
						height: 0;
						border-top: 10px solid transparent;
						border-left: 10px solid #000;
						border-bottom: 10px solid transparent;
						font-size: 0;
						line-height: 0;
						margin-right: 7px;
					}
				}
			}
		}
		.detail-con{
			border-radius: 15px;
			margin-top:-40px;
			min-height:500px;
			position: absolute;
			background: #fff;
			border-radius: 55px 55px 0 0;
			width: 100%;
			z-index: 9;
			>div{
				padding:20px;
				border-bottom: 1px solid #f0f0f8;
			}
			.title-detail{
				h2{
					font-size:48px;
					padding: 15px 10px;
				}
				.title-con{
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 35px 0;
					>div{
						width:30%;
						span{
							font-size:24px;
							color: #000;
							display: block;
						}
						span:nth-child(2){
							font-size:20px;
							color: #999;
							margin-top:10px;
						}
					}
				}
			}
			.details-com{
				padding:20px;
				.title{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding:25px 0;
					h3{
						font-size:36px;
						color: #000;
					}
					span{
						font-size:24px;
						color:#999;
						/deep/ .van-icon{
							color:#999;
							margin-left:10px;
						}
					}
				}
				.content{
					margin-bottom:15px;
				}
			}
			.hotel-comment{
				.comment-con{
					padding: 10px 0;
					.top-con{
						display: flex;
						align-items: center;
						img{
							width: 60px;
							height:60px;
							border-radius: 50%;
						}
						div:nth-child(2){
							margin-left:15px;
							p{
								font-size:24px;
								color:#000;
							}
							p:nth-child(2){
								color:#999;
							}
						}
					}
					.descript{
						font-size:24px;
						color:#999;
						line-height: 0.6rem;
						padding:25px 10px;
					}
				}
			}
			.hotel-descript{
				.content{
					color: #999;
					font-size:24px;
					line-height: 0.6rem;
					padding: 10px 0;
					height: 200px;
					overflow: hidden;
				} 
			}
			.hotel-position{
				padding:0;
				.title{
					padding:20px;
				}
				.bm-view {
					width: 100%;
					height: 420px;
				}
				.descript{
					padding:30px 20px;
					margin-bottom:15px;
					color:#999;
					font-size:24px;
					line-height: 0.5rem;
				}
			}
			.hotel-device{
				.list{
					padding: 50px 25px;
					display: flex;
					align-items: center;
					justify-content: space-around;
					.lf-con{
						display: flex;
						flex-direction: column;
						white-space: nowrap;
						i{
							width:0;
							height:0;
							border-width:19px 16px 0;
							border-style:solid;
							border-color:#ffd43f transparent transparent;/*灰 透明 透明 */
							margin:10px auto;
							position:relative;
						}
						span{
							font-size:18px;
						}
					}
					.rg-con{
						span{
							margin: 0 50px;
							line-height: 60px;
							i{
								color: #ffd33d;
								font-size:18px;
								margin-right: 10px;
							}
						}
						span.clear{
							color: #b2b2b2;
							i{
								color: #b2b2b2;
							}
						}
					}
				}
			}
			.reserv-notice{
				.content{
					padding:15px 0;
					>div{
						padding:15px 5px;
						h4{
							font-size:24px;
							color:#000;
						}
						p{
							font-size:24px;
							color:#999;
							padding:15px 0;
						}
						p.invoice{
							color:#ffd43f;
							cursor: pointer;
						}
					}
				}
			}
			.checkin-notice{
				.content{
					padding:10px;
					p{
						padding:15px 0;
						span{
							font-size:24px;
							color: #999;
							display: inline-block;
							margin-right:65px;
						}
						b{
							font-size:24px;
							color:#000;
							font-weight: normal;
						}
					}
				}
			}
			.other-cost{
				.content{
					p{
						padding:8px 2px;
						display: flex;
						span{
							font-size:24px;
							color:#999;
							display: inline-block;
							margin-right: 25px;
							white-space: nowrap;
						}
						b{
							font-weight: normal;
							color: #000;
							font-size:24px;
							line-height: 0.6rem;
						}
					}
				}
			}
			.price-explain{
				background: #f0f0f8;
				.descript{
					padding:15px 15px 115px;
					line-height: 0.6rem;
					font-size:24px;
					color: #999;
				}
			}
			.hotel-number{
				padding:35px 20px 200px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				span:nth-child(1){
					font-size:24px;
					color:#ffd33d;
					padding-left:30px;
					background: url('/static/img/detail_lo.png') no-repeat left center;
					background-size: 24px 28px;
				}
				span:nth-child(2){
					font-size:20px;
					color:#999;
				}
			}
		}
		.detail-footer{
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1px solid #e9e9e9;
			background: #fff;
			width: 100%;
			height: 110px;
			z-index: 99999;
			display: flex;
			align-items: center;
			justify-content: space-around;
			>div{
				span{
					color: #000;
					display: inline-block;
					margin-top: 10px;
					font-size:24px;
				}
			}
			div:nth-child(1){
				display: flex;
				align-items: center;
				flex-flow: column;
				img{
					width: 35px;
					height: 35px;
					border-radius: 50%;
				}
			}
			div:nth-child(2){
				display: flex;
				align-items: center;
				flex-flow: column;
				img{
					width: 30px;
					height: 30px;
				}
			}
			div.btn{
				padding: 12px 27px;
				background: #ffd544;
				border-radius: 50px;
				span{
					color: #000;
					font-size: 36px;
					margin-top:0;
				}
				em{
					font-size: 24px;
					text-decoration:line-through;
					font-style:normal;
					margin-left:5px;
				}
				span:last-child{
					margin-left: 20px;
				}
			}
		}
	}
</style>
