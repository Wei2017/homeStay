import axios from 'axios'
const BASEURL = 'https://apigateway.168buy.com/api'
// 登录
export const requestLogin = params => {
	return axios
		.post(`${bse1}/auth/login`, params)
		.then(res => res.data)
		.catch(res => res.data)
}
// 首页-轮播/底部广告图片 dicTypeId类型为1，2
export const homeGetAdList = (dicTypeId, cityName) => {
	return axios.get(`${BASEURL}/hotel/Recommend/GetAdList`, {
			params: {
				dicTypeId: dicTypeId,
				cityName: cityName
			}
		})
		.then(res => res.data)
		.catch(res => res.data)
}
// 首页-精品推荐 dicTypeId为3   热门入住 为4
export const getRoomList = (dicTypeId, cityName) => {
	return axios.get(`${BASEURL}/hotel/Recommend/GetRoomList`, {
			params: {
				dicTypeId: dicTypeId,
				cityName: cityName
			}
		})
		.then(res => res.data)
		.catch(res => res.data)
}
// 首页-开始搜索
export const searchList = params => {
	return axios.get(`${BASEURL}/hotel/ViewRoomMainInfo/GetListPageSearch`, {
			params: params
		})
		.then(res => res.data)
		.catch(res => res.data)
}
