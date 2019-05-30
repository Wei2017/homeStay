<template>
	<div class="wrapper">
		<swiper :options="swiperOption" class="swiper">
			<swiper-slide v-for="(item,index) in listObj.items" :key="index" >
        <div class="lists" @click="jumpDetail(item.id)">
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
      </swiper-slide>
		</swiper>
  </div>
</template>

<script>
	export default {
		name: 'goodHotel',
		data() {
			return {
				swiperOption: {
					slidesPerView: 'auto',
					spaceBetween: 15,
				},
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
			},
			jumpDetail(id){
				this.$router.push({
				  path: "/detail",
				  query: {delId: id}
				})
				window.scrollTo(0, 0)
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
	@import "../../../assets/css/list.scss";
	.swiper-slide{
		width: 445px;
	}
		.lists{
			padding: 30px 0;
			width: 100%;
			.list-top{
				width:100%;
				height: 295px;
			}
		}
</style>
