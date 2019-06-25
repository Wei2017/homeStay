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

// 订单—填写订单
import fillOrder from '@/page/order/fillOrder'
// 订单—费用明细
import priceDetail from '@/page/order/priceDetail'
// 订单—等待确认
import sureOrder from '@/page/order/sureOrder'
// 订单—订单详情
import orderDetail from '@/page/order/orderDetail'

// 消息—消息详情
import msgDetail from '@/page/msg/msgDetail'

// 我的-设置
import set from '@/page/me/set'
// 我的-更换手机号
import setPhone from '@/page/me/setPhone'
// 我的-意见及反馈
import feedBack from '@/page/me/feedBack'
// 我的-关于乐住宿
import about from '@/page/me/about'

// city选择
import citySelect from '@/page/areaSearch/citySelect.vue'
// 区域选择
import searchDic from '@/page/areaSearch/searchDic.vue'

// 活动页
import activity from '@/page/activity/activity.vue'

Vue.use(Router)

const router = new Router({
	mode: "history",
	routes: [{
		path: '/home',
		name: 'home',
		meta: {
			title: '乐居-轻松生活',
			showFooter: true
		},
		component: Home
	},
	{
		path: '/order',
		name: 'order',
		meta: {
			title: '订单',
			showFooter: true
		},
		component: Order
	},
	{
		path: '/msg',
		name: 'msg',
		meta: {
			title: '消息列表',
			showFooter: true
		},
		component: Msg
	},
	{
		path: '/me',
		name: 'me',
		meta: {
			title: '我的',
			showFooter: true
		},
		component: Me
	},
	{
		path: '/searchList',
		name: 'searchList',
		meta: {
			title: '杭州',
			showFooter: false
		},
		component: searchList
	},
	{
		path: '/timeChose',
		name: 'timeChose',
		meta: {
			title: '选择入离时间',
			showFooter: false
		},
		component: timeChose
	},
	// 详情相关页面
	{
		path: '/detail',
		name: 'detail',
		meta: {
			title: '房源详情',
			showFooter: false
		},
		component: detail
	},
	{
		path: '/hotelDevice',
		name: 'hotelDevice',
		meta: {
			title: '设施服务详情',
			showFooter: false
		},
		component: hotelDevice
	},
	{
		path: '/commentList',
		name: 'commentList',
		meta: {
			title: '客房评价',
			showFooter: false
		},
		component: commentList
	},
	{
		path: '/fdImpress',
		name: 'fdImpress',
		meta: {
			title: '房东印象',
			showFooter: false
		},
		component: fdImpress
	},
	// 订单相关页面
	{
		path: '/fillOrder',
		name: 'fillOrder',
		meta: {
			title: '填写订单',
			showFooter: false
		},
		component: fillOrder
	},
	{
		path: '/priceDetail',
		name: 'priceDetail',
		meta: {
			title: '费用明细',
			showFooter: false
		},
		component: priceDetail
	},
	{
		path: '/sureOrder',
		name: 'sureOrder',
		meta: {
			title: '等待确认',
			showFooter: false
		},
		component: sureOrder
	},
	// 消息相关页面
	{
		path: '/msgDetail',
		name: 'msgDetail',
		meta: {
			title: '通知详情',
			showFooter: false
		},
		component: msgDetail
	},
	{
		path: '/orderDetail',
		name: 'orderDetail',
		meta: {
			title: '订单详情',
			showFooter: false
		},
		component: orderDetail
	},
	// 我的相关页面
	{
		path: '/set',
		name: 'set',
		meta: {
			title: '设置',
			showFooter: false
		},
		component: set
	},
	{
		path: '/setPhone',
		name: 'setPhone',
		meta: {
			title: '手机号',
			showFooter: false
		},
		component: setPhone
	},
	{
		path: '/feedBack',
		name: 'feedBack',
		meta: {
			title: '意见及反馈',
			showFooter: false
		},
		component: feedBack
	},
	{
		path: '/about',
		name: 'about',
		meta: {
			title: '关于乐住宿',
			showFooter: false
		},
		component: feedBack
	},

	{
		path: '/citySelect',
		name: 'citySelect',
		meta: {
			title: '城市选择',
			showFooter: false
		},
		component: citySelect
	},
	{
		path: '/searchDic',
		name: 'searchDic',
		meta: {
			title: '乐住坊',
			showFooter: false
		},
		component: searchDic
	},
	// 活动页
	{
		path: '/activity',
		name: 'activity',
		meta: {
			title: '活动页',
			showFooter: false
		},
		component: activity
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
