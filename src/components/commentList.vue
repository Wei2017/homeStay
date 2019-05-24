<template>
	<div>
		aa
	</div>
</template>

<script>
	export default {
		name: 'commentList',
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
			},
			
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
	
</style>
