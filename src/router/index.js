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
// 详情-设施服务详情
import hotelDevice from '@/page/detail/hotelDevice'
// 详情-客房点评
import commentList from '@/page/detail/commentList'
// 详情-房东印象
import fdImpress from '@/page/detail/fdImpress'

// 订单相关页面
// 填写订单
import fillOrder from '@/page/order/fillOrder'
// 费用明细
import priceDetail from '@/page/order/priceDetail'
// 等待确认
import sureOrder from '@/page/order/sureOrder'

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
		// 详情相关页面
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
		// 订单相关页面
		{
			path: '/fillOrder',
			name: 'fillOrder',
			meta: {
				title: '填写订单',
				showFooter:false
			},
			component: fillOrder
		},
		{
			path: '/priceDetail',
			name: 'priceDetail',
			meta: {
				title: '费用明细',
				showFooter:false
			},
			component: priceDetail
		},
		{
			path: '/sureOrder',
			name: 'sureOrder',
			meta: {
				title: '等待确认',
				showFooter:false
			},
			component: sureOrder
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
