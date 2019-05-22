<template>
	<div class="list-hotel">
		<div class="lists" v-for="(item,index) in listObj.items" :key="index">
			<div class="list-top">
				<img :src="item.img" alt="">
			</div>
			<div class="list-bottom">
				<h3 class="title">{{item.title}}</h3>
				<div>
					<span>经济</span>
					<span>2居2床4人</span>
					<span v-show="listObj.score">4.6评分</span>
					<span v-show="listObj.comment">52点评</span>
				</div> 
				<p class="price">
					<span>￥{{item.nPrice}}</span>
					<em>￥{{item.yPrice}}</em>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'listHotel',
		data() {
			return {
				listObj:{}
			}
		},
		props: {
		  listData:Object
		},
		components: {
			
		},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				this.listObj = this.listData
			}
		},
		computed:{
			
		},
		watch: {
			listData:{
				handler() {
				  this.init()
				},
				deep: true
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import "../assets/css/list.scss";
	.list-hotel{
		width:100%;
		padding:15px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		.lists{
			padding: 28px 0;
			width: 322px;
			.list-top{
				width:100%;
				height: 215px;
			}
		}
	}
</style>
