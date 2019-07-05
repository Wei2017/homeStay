import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //存储城市名
		cityName:'杭州',
		searchKey:'',
		servicePhone:'13566605520',
		searchDate:{},
		selectDate:{},
		selectPriceDate:{}
  },
  mutations: {
    //修改状态，并且是同步的，在组件中使用$store.commit('',params)
		setCityName (state, name) {
		  state.cityName = name
		},
		setSearchKey (state, name) {
		  state.searchKey = name
		},
		setServicePhone(state,name){
			state.servicePhone = name
		},
		setSearchDate(state,searchDate){
			state.searchDate = searchDate
		},
		setSelectDate(state,selectDate){
			state.selectDate = selectDate
		},
		setselectPriceDate(state,selectPriceDate){
			state.selectPriceDate = selectPriceDate
		}
  },
  actions: {
    //异步操作,在组件中使用$store.dispath('')
  },
  modules: {
    // store的子模块
  },
	getters:{
		// 用于监听state的值的变化
		
	}
})