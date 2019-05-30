<template>
	<div class="fdImpress">
		<div class="fdMsg">
			<div class="lf-msg">
				<h3>你好，我是</h3>
				<span>{{obj.userName}}</span>
				<em>欢迎您的到来</em>
			</div>
			<div class="rg-msg">
				<img :src="obj.userImg" alt="">
			</div>
		</div>
		<div class="msg-con">
			<div class="img"><img src="/static/img/smile.png" alt=""></div>
			<p>{{obj.content}}</p>
			<div class="testMsg">
				<h3>已验证信息</h3>
				<p></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fdImpress',
		data() {
			return {
				obj:{
					userName:'kun昆明百合楼',
					userImg:'/static/img/footer-img@2x.png',
					content:'房东在杭州居住生活了近二十年,可以为来杭旅游的住客提供细致的旅游指南和小吃指南,带你走街窜巷,像个本地人一样品尝最地道的杭州特色小吃｡',
					
				}
			}
		},
		components: {

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
	.fdImpress{
		.fdMsg{
			padding: 68px 42px 55px 82px;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.lf-msg{
				h3,span{
					font-size:36px;
				}
				span{
					color:rgb(255,211,59);
					margin:3px 0;
					display: block;
				}
				em{
					display: block;
					font-style:normal;
					font-size:20px;
					color:#999;
				}
			}
			.rg-msg{
				width:100px;
				height:100px;
				img{
					width:100%;
					height:100%;
					border-radius: 50%;
				}
			}
		}
		.msg-con{
			margin: 0 auto;
			width: 80%;
			min-height: 700px;
			border-radius: 30px;
			background: #fff;
			padding:45px 30px;
			box-shadow: 0 0 15px rgba(0, 0, 0, .15);
			 .img{
					width:68px;
					height:57px;
					img{
						width:100%;
						height:100%;
					}
			 }
			 >p{
				 font-size:30px;
				 color: #666;
				 line-height:45px;
				 padding: 30px 0;
			 }
		}
	}
</style>
