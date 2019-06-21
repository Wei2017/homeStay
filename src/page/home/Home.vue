<template>
	<div class="home">
		<div class="head-bg">
			<swiper :options="swiperOption" class="swiper" ref="mySwiper" v-if="datas.bannerImg.length">
				<swiper-slide v-for="(bgItem,index) in datas.bannerImg" :key="index" :data-jumpUrl="bgItem.adUrl">
					<span><img :src="bgItem.adImg" alt=""></span>
				</swiper-slide>
			</swiper>
			<div class="swiper-pagination"></div>
		</div>
		<search-form></search-form>
		<div class="goodHotel listCon">
			<div class="title">
				<h1>
					精选推荐
					<i></i>
				</h1>
				<span>住进超人气</span>
			</div>
			<good-list :listData="goodList"></good-list>
		</div>
		<div class="hotHotel listCon">
			<div class="title">
				<h1>
					热门入住
					<i></i>
				</h1>
				<span>住进超人气</span>
				<com-list :listData="hotList"></com-list>
			</div>
		</div>
		<div class="hom-footer">
			<img :src="datas.footImg.adImg" alt @click="bannerJump(datas.footImg.adUrl)">
		</div>
	</div>
</template>

<script>
	import searchForm from "./components/searchForm";
	import goodList from "./components/goodList";
	import comList from "@/components/comList.vue"; //列表
	import {
		Swipe,
		SwipeItem
	} from "vant";
	import {
		homeGetAdList,
		getRoomList,
	} from "../../api/api"
	export default {
		name: "Home",
		data() {
			return {
				swiperOption: {
					pagination: '.swiper-pagination',
					autoplay: 3000,
					loop: true,
					observer: true,
					onClick: (swiper, event) => {
						let length = this.datas.bannerImg.length
						var index = Math.abs((this.$refs.mySwiper.swiper.activeIndex - 1) % length)
						let url = this.datas.bannerImg[index].adUrl
						location.href = url
						this.$router.push({
						  path: "/activity",
						})
					}
				},
				datas: {
					bannerImg: [],
					footImg: {}
				},
				goodList:{
					score: false,
					comment: false,
					items:[]
				},
				hotList:{
					score: false,
					comment: false,
					items:[]
				}
			};
		},
		components: {
			searchForm,
			goodList,
			comList,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getBgList()
			},
			// 获取首页轮播图片-底部广告图片
			getBgList() {
				// 首页轮播图
				homeGetAdList(1, '杭州').then(res => {
					if (res.respCode === '2000') {
						this.datas.bannerImg = res.respData
					}
				})
				// 底部广告
				homeGetAdList(2, '杭州').then(res => {
					if (res.respCode === '2000') {
						this.datas.footImg = res.respData[0]
					}
				})
				// 精品推荐 
				getRoomList(3, '杭州').then(res => {
					if (res.respCode === '2000') {
						this.goodList.items = res.respData
					}
				})
				// 热门入住
				getRoomList(4, '杭州').then(res => {
					if (res.respCode === '2000') {
						this.hotList.items = res.respData
					}
				})
			},
			bannerJump(url) {
				window.location.href = url
			},
		},
		computed: {},
		watch: {}
	};
</script>

<style scoped="scoped" lang="scss">
	.home {
		padding-bottom: 2rem;
		position: relative;

		.head-bg {
			width: 100%;
			position: relative;
			// height: 456px;

			.swiper-wrapper {
				height: 100%;

				.swiper-slide {
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

			/deep/ .swiper-pagination {
				bottom: 155px !important;
				left: 50%;
				transform: translateX(-50%);
			}

			/deep/ .swiper-pagination-bullet {
				width: 10px;
				height: 10px;
				opacity: 1;
				background: #fff;
				margin: 0 7px;
			}

			/deep/ .swiper-pagination-bullet-active {
				width: 16px;
				height: 10px;
				opacity: 1;
				background: #f8ce3c;
			}
		}

		.search {
			position: absolute;
			top: 385px;
			left: 50%;
			transform: translateX(-50%);
			z-index: 9;
		}

		.goodHotel {
			margin: 0 0 0 40px;
			padding-top: 260px;
		}

		.hotHotel {
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

		.hom-footer {
			height: 205px;
			margin: 40px;

			img {
				width: 100%;
				height: 100%;
				border-radius: 20px;
			}
		}
	}
</style>
