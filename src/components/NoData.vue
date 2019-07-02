<template>
	<div class="notData">
		<img src="/static/img/noData.png" alt>
		<p>{{obj.text}}</p>
		<router-link :to="obj.path" v-if="obj.btnShow">
			<span class="btn">{{obj.name}}</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				obj:{}
			};
		},
		props:[
			'NoDataVal'
		],
		mounted() {
			this.init()
		},
		methods: {
			init(){
				this.obj = this.NoDataVal
			}
		},
		computed: {},
		watch: {
			NoDataVal(){
				this.init()
			}
		}
	};
</script>

<style scoped="scoped" lang="scss">
	.notData {
		/*padding:100px 0;*/
		position: absolute;
		top: 35%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;

		img {
			vertical-align: middle;
			text-align: center;
			display: inline-block;
			width: 266px;
			height:222px;
		}

		p {
			font-size:36px;
			color: #ccc;
			padding-top: 46px;
			
		}
		a{
			font-size:36px;
			color: #333;
		}
		span.btn{
			width: 429px;
			display: inline-block;
			text-align: center;
			height: 80px;
			line-height: 80px;
			border-radius:50px;
			background:-webkit-linear-gradient(left, #ffe799, #ffd33b);
			background:-o-linear-gradient(right, #ffe799, #ffd33b);
			background:-moz-linear-gradient(right, #ffe799, #ffd33b);
			background:linear-gradient(to right, #ffe799, #ffd33b);
			margin-top:115px;
			font-size:36px;
		}
	}
</style>
