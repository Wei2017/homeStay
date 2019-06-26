import Vue from 'vue'

/*
	*定义空vue实例，作为eventbus实现非父子组件之间的通信
	* 
*/
var dayEventBus = new Vue({})
export default dayEventBus