// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill"  
import 'lib-flexible'  //移动端rem适配
import './axios'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import common from '@/common/index'
NutUI.install(Vue);
Vue.config.productionTip = false
/* 通过fastClick解决移动端点击 300毫秒延迟 */
fastClick.attach(document.body)
// 全局注册swiper插件
Vue.use(VueAwesomeSwiper)

require('es6-promise').polyfill()
Vue.prototype.$common = common
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
