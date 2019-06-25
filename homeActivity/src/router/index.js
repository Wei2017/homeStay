import Vue from 'vue'
import Router from 'vue-router'
// 活动页
import activity from '@/page/activity/activity.vue'

Vue.use(Router)

const router = new Router({
	mode: "history",
	routes: [
		// 活动页
		{
			path: '/webapph5/index',
			name: 'activity',
			meta: {
				title: '乐住坊',
				showFooter: false
			},
			component: activity
		}
	]
})
/*router.beforeEach((to, form, next) => {
	 window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
	next()
})*/
router.afterEach(to => {
	window.scrollTo(0, 0)
})
export default router
