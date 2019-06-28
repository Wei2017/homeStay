<template>
  <div id="app">
    <div class="main">
			<keep-alive> 
				<router-view  v-if="$route.meta.keepAlive"></router-view> 
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
      <nav-bar v-show="$route.meta.showFooter"></nav-bar>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  name: "App",
  components: {
    navBar
  },
  data() {
    return {};
  },
  mounted() {
    localStorage.setItem("userId", 2);
  },
  methods: {},
  watch: {}
};
</script>

<style>
#app {
  width: 100%;
  height: auto;
}
.main {
  height: auto;
}
/* 弹框样式 */
.van-toast {
  padding: 35px !important;
}
.van-list__finished-text{
	padding: 30px 0 40px 0!important;
}
.van-dialog{
	border-radius: 12px;
	width:75%;
	padding:20px;
}
.van-dialog .van-dialog__header{
	font-size:36px;
	line-height: 36px;
	margin-bottom: 18px;
}
.van-dialog .van-dialog__footer .van-button--default{
	font-size:36px;
}
.van-dialog .van-dialog__footer{
	padding-top:16px;
}
.van-dialog .van-dialog__footer .van-dialog__cancel{
	color:#fff100;
}
.van-dialog .van-dialog__footer .van-dialog__confirm{
	color:#323232;
}
</style>
