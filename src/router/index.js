import Vue from 'vue'
import Router from 'vue-router'
// 主界面
import Home from '@/page/home/home'
import Order from '@/page/order/order'
import Msg from '@/page/msg/msg'
import Me from '@/page/me/me'
// search
import search from '@/page/search/search'
import timeChose from '@/page/search/timeChose'

Vue.use(Router)

const router = new Router({
	mode: "history",
	routes: [{
			path: '/home',
			name: 'home',
			meta: {
				title: '乐居-轻松生活',
			},
			component: Home
		},
		{
			path: '/order',
			name: 'order',
			meta: {
				title: 'order - 订单',
			},
			component: Order
		},
		{
			path: '/msg',
			name: 'msg',
			meta: {
				title: 'msg - 消息',
			},
			component: Msg
		},
		{
			path: '/me',
			name: 'me',
			meta: {
				title: 'me - 我的',
			},
			component: Me
		},
		{
			path: '/search',
			name: 'search',
			meta: {
				title: 'search - 搜索页',
			},
			component: search
		},
		{
			path: '/timeChose',
			name: 'timeChose',
			meta: {
				title: '选择入离事件',
			},
			component: timeChose
		},
		{
			path: '/',
			redirect: '/home'
		}
	]
})
router.beforeEach((to, form, next) => {
	window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
	next()
})
export default router
