import Vue from 'vue'
import Router from 'vue-router'
// 主界面
import Home from '@/page/home/home'
import Order from '@/page/order/order'
import Msg from '@/page/msg/msg'
import Me from '@/page/me/me'
// search
import searchList from '@/page/search/searchList'
import timeChose from '@/page/search/timeChose'

// 房源详情
import detail from '@/page/detail/detail'
// 设施服务详情
import hotelDevice from '@/page/detail/hotelDevice'
// 客房点评
import commentList from '@/page/detail/commentList'
// 房东印象
import fdImpress from '@/page/detail/fdImpress'


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
			path: '/searchList',
			name: 'searchList',
			meta: {
				title: '杭州',
				showFooter:false
			},
			component: searchList
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
			path: '/hotelDevice',
			name: 'hotelDevice',
			meta: {
				title: '设施服务详情',
				showFooter:false
			},
			component: hotelDevice
		},
		{
			path: '/commentList',
			name: 'commentList',
			meta: {
				title: '客房评价',
				showFooter:false
			},
			component: commentList
		},
		{
			path: '/fdImpress',
			name: 'fdImpress',
			meta: {
				title: '房东印象',
				showFooter:false
			},
			component: fdImpress
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
router.afterEach(to => {
	window.scrollTo(0, 0)
})
export default router
