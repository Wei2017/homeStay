<template>
  <div id="app">
		<div class="main">
			<keep-alive>
			  <router-view></router-view>
			</keep-alive>
			<nav-bar></nav-bar>
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
	}
}
</script>

<style>
	#app{
		width:100%;
		height: 100%;
	}
	.main{
		margin-bottom:150px;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
