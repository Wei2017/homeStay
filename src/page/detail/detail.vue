<template>
	<div class="detail">
		<div class="detail-top">
			<swiper :options="swiperOption" class="swiper">
				<swiper-slide v-for="(bg,index) in detals.headBg" :key="index">
			    <img :src="bg.img" alt="">
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
			<div class="comment-detail">
				<div class="title">
					<h3>客房点评</h3>
					<span>全部评论(59)<nut-icon type="right"></nut-icon></span>
				</div>
				<comment-list></comment-list>
			</div>
		</div>
		<div class="detail-footer">
			
		</div>
	</div>
</template>

<script>
	import commentList from "@/components/commentList.vue" //评论列表
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
					headBg: [
						{
							img: '/static/img/footer-img@2x.png'
						},
						{
							img: '/static/img/ms-lb.png'
						},
					],
				}
			}
		},
		components: {
			commentList
		},
		mounted() {

		},
		methods: {

		},
		computed:{
			
		},
		watch: {

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
			.comment-detail{
				pading:0 5px;
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
						/deep/ .nut-icon{
							color:#999;
							margin-left:10px;
						}
					}
				}
			}
		}
	}
</style>
