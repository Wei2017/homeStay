<template>
	<div class="hotelDevice">
		<div class="content">
			<div class="list">
				<h3>基础设施</h3>
				<div class="list-con">
					<span><em>无线电视</em><van-icon name="checked" /></span>
					<span class="clear"><em>无线电视</em><van-icon name="clear" /></span>
				</div>
			</div>
			<div class="list">
				<h3>卫浴设施</h3>
				<div class="list-con">
					<span><em>全天热水</em><van-icon name="checked" /></span>
					<span class="clear"><em>洗漱用品</em><van-icon name="clear" /></span>
					<span><em>毛巾</em><van-icon name="checked" /></span>
				</div>
			</div>
		</div>
		<div class="closeDevice"><van-icon  @click="closeDevice" name="cross" /></div>
	</div>
</template>

<script>
	export default {
		name: 'hotelDevice',
		data() {
			return {
				deviceItems:[
					{
						title:'基础设施',
					}
				]
			}
		},
		components: {

		},
		mounted() {

		},
		methods: {
			closeDevice(){
				this.$router.go(-1)
			},
		},
		computed:{
			
		},
		watch: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.hotelDevice{
		.list{
			padding: 20px;
			border-bottom: 1px solid #f0f0f8;
			h3{
				font-size:30px;
				padding: 10px 0;
			}
			.list-con{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-bottom:35px;
				span{
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 20px 20px 20px 0;
					em{
						font-size:24px;
						padding: 15px 35px;
						border-radius: 35px;
						font-style: normal;
						background: #f0f0f8;
						margin-bottom: 8px;
					}
					i{
						font-size:12px;
						color: #ffd43f;
					}
				}
				span.clear{
					em{
						color:#b2b2b2;
					}
					i{
						color: #b2b2b2;
					}
				}
			}
		}
		.content{
			min-height: 700px;
			.list:last-child{
				border-bottom: none;
			}
		}
		.closeDevice{
			font-size:40px;
			color: #999;
			text-align: center;
			margin: 80px 0;
			i{
				padding: 10px;
			}
		}
	}
</style>
