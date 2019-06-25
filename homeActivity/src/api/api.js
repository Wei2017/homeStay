import axios from 'axios'
const BASEURL = 'https://apigateway.168buy.com/api/hotel'

// 活动页
export const getActivity = params => {
	return axios.get(`${BASEURL}/Recommend/GetAdList`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}

// 活动页列表
export const getActivityList = params => {
	return axios.get(`${BASEURL}/Recommend/GetRoomList`, {
		params: params
	})
		.then(res => res.data)
		.catch(res => res.data)
}
