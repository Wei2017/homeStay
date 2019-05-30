<template>
	<div class="comment">
		<van-list v-model="obj.loading" :finished="obj.finished" finished-text="没有更多数据了" @load="onLoad">
			<div class="list" v-for="(item,index) in obj.items" :key="index">
				<div class="lf-con"><img :src="item.userImg" alt=""></div>
				<div class="rg-con">
					<div class="rg-con-top">
						<div>
							<span>{{item.userName}}</span>
							<em>{{item.time}}入住</em>
						</div>
						<div>
							<span>{{item.value}}</span>
							<van-rate v-model="item.valueNum" readonly />
						</div>
					</div>
					<div class="comment-con">
						<p :class="'pCon'+index">{{item.content}}</p>
						<span @click="showMoreComment(index)" :class="'moreComment'+index">全文</span>
						<div class="comment-imgs">
							<span v-for="(img,inx) in item.imgs" :key="inx" @click="showImg(item.imgs)">
								<img :src="img" alt="">
							</span>
						</div>
						<div class="replay">
							房东回复：<span>{{item.replay}}</span>
						</div>
					</div>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script>
	import {
		ImagePreview,
		Rate
	} from 'vant'
	export default {
		name: 'commentList',
		data() {
			return {
				pageData: {
					pageSize: 10,
					pageNum: 1,
				},
				obj: {
					loading: false,
					finished: false,
					imgConfig:'',
					items: []
				}
			}
		},
		props: {
			listData: Object
		},
		//在路由离开的时候，关闭预览的图片
		beforeRouteLeave(to, from, next) {
			this.obj.imgConfig.close()
			next();
		},
		components: {
			[ImagePreview.name]: ImagePreview,
			[Rate.name]: Rate,
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.obj.items = [{
						id: 1,
						userName: '张三',
						userImg: '/static/img/footer-img@2x.png',
						time: '2015-09-22',
						valueNum: 4,
						value: '4.0',
						content: '房子紧邻历史悠久的京杭大运河，房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京',
						imgs: ['/static/img/footer-img@2x.png', '/static/img/footer-img@2x.png'],
						replay: '谢谢您的评价'
					},
					{
						id: 2,
						userName: '李思佳',
						userImg: '/static/img/footer-img@2x.png',
						time: '2015-09-28',
						valueNum: 5,
						value: '5.0',
						content: '房子紧邻历史悠久的京杭大运河，房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京',
						imgs: ['/static/img/footer-img@2x.png', '/static/img/footer-img@2x.png'],
						replay: '谢谢您的评价，我们会继续努力'
					},
					{
						id: 2,
						userName: '李思佳',
						userImg: '/static/img/footer-img@2x.png',
						time: '2015-09-28',
						valueNum: 5,
						value: '5.0',
						content: '房子紧邻历史悠久的京杭大运河，房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京',
						imgs: ['/static/img/footer-img@2x.png', '/static/img/footer-img@2x.png'],
						replay: '谢谢您的评价，我们会继续努力'
					},
					{
						id: 2,
						userName: '李思佳',
						userImg: '/static/img/footer-img@2x.png',
						time: '2015-09-28',
						valueNum: 5,
						value: '5.0',
						content: '房子紧邻历史悠久的京杭大运河，房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京',
						imgs: ['/static/img/footer-img@2x.png', '/static/img/footer-img@2x.png'],
						replay: '谢谢您的评价，我们会继续努力'
					}
				]
			},
			onLoad() {
				setTimeout(() => {
					this.pageData.pageNum++;
					for (let i = 0; i < 10; i++) {
						let obj = {
							id: i + 1,
							userName: '张三',
							userImg: '/static/img/footer-img@2x.png',
							time: '2015-09-22',
							valueNum: 4,
							value: '4.0',
							content: '房子紧邻历史悠久的京杭大运河，房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河房子紧邻历史悠久的京杭大运河步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京',
							imgs: ['/static/img/footer-img@2x.png', '/static/img/footer-img@2x.png'],
							replay: '谢谢您的评价'
						}
						this.obj.items.push(obj)
					}
					// 加载结束
					this.obj.loading = false
					// 数据全部加载完成
					if (this.obj.items.length >= 20) {
						this.obj.finished = true
					}
				}, 800)
			},
			// 查看全文
			showMoreComment(index) {
				let con = document.getElementsByClassName('moreComment' + index)[0]
				let p = document.getElementsByClassName('pCon' + index)[0]
				console.log(con, p)
				if (con.innerHTML === '全文') {
					con.innerHTML = '收起'
					p.style.height = 'auto'
					p.style.overflow = 'visible'
				} else {
					con.innerHTML = '全文'
					p.style.height = '1.07rem'
					p.style.overflow = 'hidden'
				}
			},
			//查看图片
			showImg(imgs){
				this.obj.imgConfig =  ImagePreview(imgs)
			}
		},
		computed: {

		},
		watch: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.comment {
		margin-bottom: 100px;

		.list {
			display: flex;
			padding: 30px;

			.lf-con {
				margin: 10px 0 0 0;

				img {
					width: 54px;
					height: 54px;
					border-radius: 50%;
				}
			}

			.rg-con {
				.rg-con-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 10px;

					>div {
						display: flex;
						flex-direction: column;
					}

					div:nth-child(1) {
						span {
							font-size: 24px;
						}

						em {
							font-size: 20px;
							color: #999;
							margin-top: 5px;
							font-style: normal;
						}
					}

					div:nth-child(2) {
						text-align: right;

						span {
							font-size: 30px;
							color: #999;
							fontFamily: "Arial-BoldMT";
							margin-bottom: 3px;
						}

						.van-rate {
							i {
								font-size: 22px !important;
							}
						}
					}
				}

				.comment-con {
					p {
						font-size: 24px;
						line-height: 40px;
						margin: 10px 0;
						height: 80px;
						overflow: hidden;
					}

					>span {
						font-size: 20px;
						color: rgb(255, 211, 59)
					}

					.comment-imgs {
						margin: 20px -5px;
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						span {
							width: 193px;
							height: 193px;
							margin: 10px;

							img {
								width: 100%;
								height: 100%;
							}
						}
					}

					.replay {
						background: #f4f4f5;
						padding: 20px;
						font-size: 24px;

						span {
							line-height: 36px;
							color: rgb(153, 153, 153);
						}
					}
				}
			}
		}
	}
</style>
