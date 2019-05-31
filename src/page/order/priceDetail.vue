<template>
	<div class="priceDetail">
		<div class="com div1">
			<span>线上支付</span>
			<b>￥3400</b>
		</div>
		<div>
			<p class="com"><span>房费(9晚)</span><b>￥3200</b></p>
			<ul class="list">
				<li v-for="(item,index) in priceList" :key="index">
					<span>{{item.time}}</span>
					<span>￥{{item.price}} X {{item.num}}套</span>
				</li>
			</ul>
		</div>
		<div class="com">
			<span>押金(离店后退还)</span>
			<b>￥200</b>
		</div>
		<div class="closeDevice"><van-icon  @click="closeDevice" name="cross" /></div>
	</div>
</template>

<script>
	export default {
		name: 'priceDetail',
		data() {
			return {
				priceList:[
					{
						time:'2019-09-18',
						num:1,
						price:338
					},
					{
						time:'2019-09-18',
						num:1,
						price:338
					},{
						time:'2019-09-18',
						num:1,
						price:338
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
	.priceDetail{
		padding: 40px 20px 0;
		>div{
			padding:40px 22px;
			border-bottom: 1px solid #f0f0f8;
		}
		>div:nth-child(3){
			border-bottom:none;
			margin-bottom: 80px;
		}
		.com{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size:30px;
			color: #333;
			b{
				font-weight: normal;
			}
			
		}
		.div1{
			font-size:36px;
			b{
				color: #ffd33c;
			}
		}
		.list{
			padding:45px 23px;
			li{
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #999;
				font-size:26px;
				padding:15px 0;
			}
		}
		.closeDevice{
			font-size:40px;
			color: #999;
			text-align: center;
			margin: 80px 0;
			border-bottom: none;
			i{
				padding: 10px;
			}
		}
	}
</style>
