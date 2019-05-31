<template>
  <div id="app">
		<div class="main">
			<keep-alive>
			  <router-view></router-view>
			</keep-alive>
			<nav-bar v-show="$route.meta.showFooter"></nav-bar>
		</div>
    
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue'
export default {
  name: 'App',
	components: {
    navBar
  },
	data(){
		return{
			
		}
	},
	mounted() {
		
	},
	methods:{
		
	},
	watch:{
		
	}
}
</script>

<style>
	#app{
		width:100%;
		height: auto;
	}
	.main{
		height:auto;
	}
</style>
