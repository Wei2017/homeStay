// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'css/reset.css'
import 'css/border.css'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
/* 通过fastClick解决移动端点击 300毫秒延迟 */
fastClick.attach(document.body)

// 全局注册swiper插件
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
