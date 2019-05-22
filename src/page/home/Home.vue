<template>
	<div class="home">
		<div class="head-bg">
			<nut-swiper direction="horizontal" ref="headBg" :loop="true" :paginationVisible="true">
				<div class="nut-swiper-slide gray" v-for="(bg,index) in datas.headBg" :key="index">
					<span><img :src="bg.img" alt=""></span>
				</div>
			</nut-swiper>
		</div>
		<search></search>
		<div class="goodHotel listCon">
			<div class="title">
				<h1>精选推荐 <i></i></h1>
				<span>住进超人气</span>
			</div>
			<good-list :listData = "datas.hotListObj"></good-list>
		</div>
		<div class="hotHotel listCon">
			<div class="title">
				<h1>热门入住 <i></i></h1>
				<span>住进超人气</span>
				<com-list :listData = "datas.hotListObj"></com-list>
			</div>
		</div>
		<div class="hom-footer">
			<img :src="datas.footImg" alt="">
		</div>
	</div>
</template>

<script>
	import search from './components/search'
	import goodList from './components/goodList'
	import comList from "@/components/comList.vue" //列表
	export default {
		name: 'Home',
		data() {
			return {
				datas:{
					headBg: [
						{
							img: '/static/img/footer-img@2x.png'
						},
						{
							img: '/static/img/ms-lb.png'
						},
					],
					hotListObj: {
						score: false,
						comment: false,
						items: [
							{
								img:'/static/img/footer-img@2x.png',
								title:'杭州西湖边的名人别墅',
								yPrice:284,
								nPrice:263
							},
							{
								img:'/static/img/ms-lb.png',
								title:'宿州别墅',
								yPrice:224,
								nPrice:263
							},
							{
								img:'/static/img/ms-lb.png',
								title:'宿州别墅',
								yPrice:244,
								nPrice:263
							},
							{
								img:'/static/img/footer-img@2x.png',
								title:'杭州西湖边的名人别墅',
								yPrice:193,
								nPrice:150
							},
						]
					},
					footImg:'/static/img/footer-img@2x.png'
				}
				
		}
	},
	components: {
			search,
			goodList,
			comList
		},
		mounted() {

		},
		methods: {

		},
		computed: {

		},
		watch: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.home {
		height: 100%;
		position: relative;

		.head-bg {
			width: 100%;
			height: 460px;

			.nut-swiper {
				height: 100%;

				.nut-swiper-slide {
					span {
						display: block;
						width: 100%;
						height: 100%;

						img {
							width: 100%;
							height: 100%;
							border-radius: 0 0 80px 80px;
						}
					}
				}
			}

			/deep/ .nut-swiper.horizontal .nut-swiper-pagination {
				bottom: 115px !important;
			}

			/deep/ .swiper-pagination-bullet {
				width: 8px;
				height: 8px;
				opacity: 1;
				background: #fff;
			}

			/deep/ .swiper-pagination-bullet.active {
				width: 16px;
				height: 8px;
				opacity: 1;
				background: #f8ce3c;
			}
		}

		.search {
			position: absolute;
			top: 350px;
			left: 50%;
			transform: translateX(-50%);
		}

		.goodHotel {
			margin: 0 0 0 40px;
			padding-top: 260px;
		}
		.hotHotel{
			margin: 0 40px;
		}
		.listCon {
			.title {
				h1 {
					font-size: 46px;
					position: relative;
					z-index: 9;

					i {
						position: absolute;
						width: 95px;
						height: 17px;
						display: block;
						background: #ffd33b;
						bottom: 1px;
						left: 0;
						opacity: 0.7;
					}
				}

				span {
					font-size: 22px;
					color: #999;
					padding: 5px 0;
				}
			}
		}
		.hom-footer{
			height: 205px;
			margin: 10px 40px;
			img{
				width:100%;
				height:100%;
				border-radius: 20px;
			}
		}
	}
</style>
