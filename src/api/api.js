import axios from 'axios'
const BASEURL = 'https://apigateway.168buy.com/api/hotel'
const wxUrl = 'https://apigateway.168buy.com/api'
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
// 搜索页面-列表接口
export const searchList = params => {
	return axios.get(`${BASEURL}/ViewRoomMainInfo/GetListPageSearch`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 搜索页面-列表页默认选择的日期 
export const getRoomListDefDay = params => {
	return axios.get(`${BASEURL}/Room/GetRoomListDefDay`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 搜索页面-搜索列表页选择日历
export const getRoomListCalendar = params => {
	return axios.get(`${BASEURL}/Room/GetRoomListCalendar`, {
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
// 首页-点击进入城市列表
export const hotCityList = params => {
	return axios.get(`${BASEURL}/Recommend/GetOpenedCityList`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 首页-搜索点击进入热门城市
export const getHotSearchKey = (cityName) => {
	return axios.get(`${BASEURL}/Recommend/GetHotSearchKey`, {
		params: {
			cityName: cityName
		}
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
// 详情页—获取一个房型的所有设施
export const getListPageByAccOrRoom = params => {
	return axios.get(`${BASEURL}/RoomEvaluate/GetListPageByAccOrRoom`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 详情页—房东详情
export const fdInfo = (accountid,froms) => {
	return axios.get(`${BASEURL}/AccInfo/GetModelByAccId`, {
		params: {
			accountid: accountid,
			from: froms
		}
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 详情页—房东详情上架房源
export const fdGetRoomList= params => {
	return axios.get(`${BASEURL}/ViewRoomMainInfo/GetListPageSearch`, {
		params:params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 详情页—房东详情客房点评
export const fdGetCommentList = params => {
	return axios.get(`${BASEURL}/RoomEvaluate/GetListPageByAccOrRoom`, {
		params:params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 下单页面—获取一个房型的主要信息 
export const getModelByRoomAccId = roomAccId => {
	return axios.get(`${BASEURL}/ViewRoomMainInfo/GetModelByRoomAccId`, {
		params:{
			roomAccId:roomAccId
		}
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 下单页面—获取默认一个房型选择的日历 
export const getRoomDayDefaultSel = roomAccId => {
	return axios.get(`${BASEURL}/Room/GetRoomDayDefaultSel`, {
		params:{
			roomAccId:roomAccId
		}
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 下单页面—获取用户选择一个房型的入离时间 
export const getRoomDayUserSel = params => {
	return axios.get(`${BASEURL}/Room/GetRoomDayUserSel`, {
		params:params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 下单页面—获取一个房型的房源日历 
export const getRoomDayForUser = roomAccId => {
	return axios.get(`${BASEURL}/Room/GetRoomDayForUser`, {
		params:{
			roomAccId:roomAccId
		}
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 下单页面—用户选择入离日期后获取费用明细
export const getSelectDaysFeeDetail = params => {
	return axios.get(`${BASEURL}/Room/GetSelectDaysFeeDetail`, {
		params:params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
// 下单页面—用户下单 
export const addOrderHotel = params => {
	return axios.post(`${BASEURL}/OrderMain/AddOrderHotel`, params)
		.then(res => res.data)
		.catch(res => res.data)
}
// 下单页面—调起支付 
export const createWXPay = params => {
	return axios.post(`${wxUrl}/weixin/WXPay/CreateWXPay`, params)
		.then(res => res.data)
		.catch(res => res.data)
}
