<template>
  <div class="loding">
    <van-loading size="24px" vertical>加载中...</van-loading>
  </div>
</template>
<script>
	import { Loading } from 'vant';
	export default {
		name: 'Loading',
		data() {
			return {

			}
		},
		components: {
			[Loading.name]: Loading,
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
	.loding{
		font-size:35px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>
