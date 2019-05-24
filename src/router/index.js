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

// 房源详情
import detail from '@/page/detail/detail'
Vue.use(Router)

const router = new Router({
	mode: "history",
	routes: [{
			path: '/home',
			name: 'home',
			meta: {
				title: '乐居-轻松生活',
				showFooter:true
			},
			component: Home
		},
		{
			path: '/order',
			name: 'order',
			meta: {
				title: '订单',
				showFooter:true
			},
			component: Order
		},
		{
			path: '/msg',
			name: 'msg',
			meta: {
				title: '消息列表',
				showFooter:true
			},
			component: Msg
		},
		{
			path: '/me',
			name: 'me',
			meta: {
				title: '我的',
				showFooter:true
			},
			component: Me
		},
		{
			path: '/search',
			name: 'search',
			meta: {
				title: '杭州',
				showFooter:false
			},
			component: search
		},
		{
			path: '/timeChose',
			name: 'timeChose',
			meta: {
				title: '选择入离时间',
				showFooter:false
			},
			component: timeChose
		},
		{
			path: '/detail',
			name: 'detail',
			meta: {
				title: '房源详情',
				showFooter:false
			},
			component: detail
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
