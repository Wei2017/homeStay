import axios from 'axios'
import Vue from 'vue'
import router from '../router'
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = ' application/json';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
//配置接口地址
// axios.defaults.baseURL = 'http://221.122.93.243:9005';
// 配置接口地址
// axios.defaults.baseURL = '';

// 请求的拦截器
axios.interceptors.request.use(config => {
	// 		if(getCookie('token')){
	// 			config.headers.Authorization = 'Bearer ' + getCookie('token')
	// 		}
	return config;
}, err => {
	return Promise.resolve(err);
})
// 响应拦截
axios.interceptors.response.use(res => {
	return res

}, err => {
	if (err.response) {
		if (err.response.status == 504 || err.response.status == 404) {
			// 		    Message.error({
			// 		        message: '服务器不响应了⊙﹏⊙∥'
			// 		    });
		} else if (err.response.status == 403) {
			// Message.error({
			// message: '权限不足,请联系管理员!'
			// });
		} else if (err.response.status == 401) {
			// 			Message.error({
			// 			    message: '账号已在另一处被登录'
			// 			});
		} else {
			// 		    Message.error({
			// 		        message: '未知错误'
			// 		    });
		}
	}
	return Promise.reject(err);
})