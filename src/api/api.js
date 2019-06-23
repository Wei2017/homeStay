import axios from 'axios'
const BASEURL = 'https://apigateway.168buy.com/api/hotel'
// 登录
export const requestLogin = params => {
	return axios
		.post(`${bse1}/auth/login`, params)
		.then(res => res.data)
		.catch(res => res.data)
}
// 首页-轮播/底部广告图片 dicTypeId类型为1，2
export const homeGetAdList = (dicTypeId, cityName) => {
	return axios.get(`${BASEURL}/Recommend/GetAdList`, {
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
	return axios.get(`${BASEURL}/Recommend/GetRoomList`, {
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
	return axios.get(`${BASEURL}/ViewRoomMainInfo/GetListPageSearch`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 城市列表
export const cityLists = params => {
	return axios.get(`/static/json/city.json`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 详情页
export const homeDetail = (roomAccId, userid) => {
	return axios.get(`${BASEURL}/Room/GetRoomForDetailPage`, {
		params: {
			roomAccId: roomAccId,
			userid: userid
		}
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 详情页—收藏
export const addStoreHome = (url, params) => {
	return axios.post(`${BASEURL}/${url}`, params)
		.then(res => res.data)
		.catch(res => res.data)
}
// 详情页—获取一个房型的所有设施
export const getRoomServiceList = (roomAccId) => {
	return axios.get(`${BASEURL}/Room/GetRoomServiceList`, {
		params: {
			roomAccId: roomAccId
		}
	})
		.then(res => res.data)
		.catch(res => res.data)
}

