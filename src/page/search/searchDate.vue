<template>
	<div class="timeChose">
		<!-- 搜索选择日期 -->
		<div class='container'>
			<div class='header container'>
				<div class='header-date row'>
					<div class='rz-date'>
						<span>入住日期</span>
						<div class='date-span'>{{datas.rzDate}}</div>
					</div>
					<div class='sum-day'>共{{datas.daysSum}}晚</div>
					<div class='ld-date'>
						<span>离店日期</span>
						<div class='date-span'>{{datas.ldDate}}</div>
					</div>
				</div>
				<div class='week-span row'>
					<span v-for="(week,index) in datas.weekArr" :key="index">{{week}}</span>
				</div>
			</div>
			<div class='section-wrap-date'>
				<div class='month-content' v-for="(item,index) in datas.date" :key="index">
					<span class='month-span'>{{index}}</span>
					<div class='day-list row'>
						<div v-for="(list,inx) in item" :key="inx">
							<div class="every-day container" :class="{'ru-ld':list.state,'center':list.checked || list.remainingRoom > datas.rzNum && list. remainingRoom < datas.ldNum, 'no-dj':list.dayState == '2'}"
							 :data-state="list.dayState" :data-i="list.remainingRoom" :data-type="list.state" @click="selectDate">
								<span class='day-span' v-if="list.remainingRoom !=='0'">{{list.rdExtA}}</span>
								<span class="jr-or-rld" :style="{'visibility':list.dayDes!=='' ? 'visible' : 'hidden'}">{{list.dayDes!==''?list.dayDes:"占位"}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="footer-line" v-if="datas.date">我是有底线的，最长可预订近4个月的房屋</div>
			<div class='footer row'>
				<span @click="cancelDate">清空</span>
				<div class='sure-btn' @click='sureDate'>确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	import dayEventBus from '@/components/service/dayEventBus.js'
	import {
		getRoomListCalendar
	} from "../../api/api";
	export default {
		name: 'timeChose',
		data() {
			return {
				datas: {
					date: null,
					weekArr: ['日', '一', '二', '三', '四', '五', '六'],
					roomId: '',
					rzAndLd: -1, //1为点击了入住 选择离店
					rzIndex: -1, //入住的下标
					ldIndex: -1, //离店的下标
					daysSum: '', //入住总天数
					rzDate: '',  //入住日期
					ldDate: '',  //离店日期
					rzNum: 0,
					ldNum: 0,
					count: '', //上一页面传来的几套房屋
					rzDayShow: '',
					ldDayShow: '',
					inDate: '',
					outDate: ''
				}
			}
		},
		components: {
			dayEventBus
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getMonth()
			},
			getMonth() {
				getRoomListCalendar().then(res => {
					if (res.respCode === "2000") {
						let date = res.respData.monthDetail
						let	rzDate = this.$route.query.start, //入职日期
							ldDate = this.$route.query.end, //离店日期
							rzNum = this.datas.rzNum,
							ldNum = this.datas.ldNum,
							rzDayShow = this.datas.rzDayShow,
							ldDayShow = this.datas.ldDayShow,
							inDate = this.datas.inDate,
							outDate = this.datas.outDate
						for (let i in date) {
							let months = date[i]
							for (let m = 0; m < months.length; m++) {
								let monthId = months[m].remainingRoom
								if (months[m].rdExtB == rzDate) {
									months[m].state = true
									months[m].dayDes = '入住'
									let currDate = i.split('-')
									rzDate = currDate[1] + '月' + months[m].rdExtA + '日'
									rzNum = months[m].remainingRoom
									rzDayShow = months[m].dayShow,
										inDate = months[m].rdExtB
								}
								if (months[m].rdExtB == ldDate) {
									months[m].state = true
									months[m].dayDes = '离店'
									let currDate = i.split('-')
									ldDate = currDate[1] + '月' + months[m].rdExtA + '日'
									ldNum = months[m].remainingRoom
									ldDayShow = months[m].dayShow
									outDate = months[m].rdExtB
								}
							}
						}
						this.datas.date = date
						this.datas.rzDate = rzDate
						this.datas.rzNum = rzNum
						this.datas.ldDate = ldDate
						this.datas.ldNum = ldNum
						this.datas.daysSum = ldNum - rzNum
						this.datas.rzAndLd = 2
						this.datas.rzDayShow = rzDayShow
						this.datas.ldDayShow = ldDayShow
						this.datas.inDate = inDate
						this.datas.inDate = outDate
					}
				})
			},
			// 选择入住和离店
			selectDate(e) {
				let that = this
				// 状态 1 可点击
				let state = e.currentTarget.dataset.state
				let type = e.currentTarget.dataset.type
				if (state == '2' || type) {
					return
				}
				// 点击的日期下标
				let dayIndex = e.currentTarget.dataset.i

				// let month = that.data.month
				let date = that.datas.date

				let rzIndex = that.datas.rzIndex
				let ldIndex = that.datas.ldIndex
				console.log(state, dayIndex)

				let rzDate = that.datas.rzDate,
					ldDate = that.datas.ldDate,
					rzNum = that.datas.rzNum,
					ldNum = that.datas.ldNum,
					rzDayShow = that.datas.rzDayShow,
					ldDayShow = that.datas.ldDayShow,
					inDate = that.datas.inDate,
					outDate = that.datas.outDate

				//入住或离店状态
				let rzAndLd = that.datas.rzAndLd
				if (rzAndLd == 2) {
					console.log(3)
					for (let i in date) {
						// 每月所有天数
						let months = date[i]
						for (let d = 0; d < months.length; d++) {
							months[d].checked = false
							months[d].state = false
							months[d].dayDes = ''
							if (months[d].remainingRoom == dayIndex) {
								months[d].state = true
								months[d].dayDes = '入住'
								let currDate = i.split('-')
								rzDate = currDate[1] + '月' + months[d].rdExtA + '日'
								rzNum = months[d].remainingRoom
								rzDayShow = months[d].dayShow
								inDate = months[d].rdExtB
							}
							// if (months[d].remainingRoom == ldNum) {
							//   months[d].dayDes = ''
							// }
							// if (months[d].remainingRoom == rzNum) {
							//   months[d].dayDes = ''
							// }
						}
					}
					that.datas.date = date
					that.datas.rzAndLd = 1
					that.datas.rzDate = rzDate
					that.datas.ldDate = ''
					that.datas.rzNum = rzNum
					that.datas.rzDayShow = rzDayShow
					that.datas.ldNum = 0
					that.datas.inDate = inDate
					return
				}

				// nums = roomDayId
				// festival = dayDes

				// 设置用户点击了入住
				if (rzAndLd == 1) {
					console.log(1, dayIndex, rzNum)
					let newNum = ''
					// 离店
					for (let i in date) {
						let months = date[i]
						// 每个月的每一天  28  7118
						for (let d = 0; d < months.length; d++) {
							if (dayIndex > rzNum) {
								if (months[d].remainingRoom < dayIndex && months[d].remainingRoom > rzNum) {
									months[d].checked = true
								}
								if (months[d].remainingRoom == dayIndex) {
									months[d].state = true
									months[d].dayDes = '离店'
									let currDate = i.split('-')
									ldDate = currDate[1] + '月' + months[d].rdExtA + '日'
									ldNum = months[d].remainingRoom
									ldDayShow = months[d].dayShow
									outDate = months[d].rdExtB
								}
							} else {
								console.log('test111')
								if (months[d].remainingRoom > dayIndex && months[d].remainingRoom < rzNum) {
									console.log(123123123)
									months[d].checked = true
								}
								if (months[d].remainingRoom == rzNum) {
									months[d].state = true
									months[d].dayDes = '离店'
									let currDate = i.split('-')
									ldDate = currDate[1] + '月' + months[d].rdExtA + '日'
									ldNum = months[d].remainingRoom
									ldDayShow = months[d].dayShow
									outDate = months[d].rdExtB
								}
								if (months[d].remainingRoom == dayIndex) {
									months[d].state = true
									months[d].dayDes = '入住'
									let currDate = i.split('-')
									rzDate = currDate[1] + '月' + months[d].rdExtA + '日'
									newNum = months[d].remainingRoom
									rzDayShow = months[d].dayShow
									inDate = months[d].rdExtB
								}
							}
						}
					}
					rzNum = newNum !== '' ? newNum : rzNum
					that.datas.date = date
					that.datas.ldDate = ldDate
					that.datas.ldNum = ldNum
					that.datas.rzDate = rzDate
					that.datas.rzNum = rzNum
					that.datas.rzAndLd = '2'
					that.datas.daysSum = ldNum - rzNum,
					that.datas.ldDayShow = ldDayShow
					that.datas.rzDayShow = rzDayShow
					that.datas.inDate = inDate
					that.datas.outDate = outDate
				}
			},
			// 确定按钮
			sureDate() {
				// 传递一个map，dayDatas是key,this.datas是value
				dayEventBus.$emit('dayDatas',this.datas)
				this.$router.go(-1)
			},
			// 取消
			cancelDate(){
				this.getMonth()
			}
		},
		computed: {

		},
		watch: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.timeChose {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.row {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.header {
			margin-top: 60px;
		}

		.header-date {
			width: 674px;
			justify-content: space-between;
			align-items: flex-end;
		}
		.section-wrap-date{
			margin-bottom:30px;
		}
		.rz-date>span,
		.ld-date>span {
			font-size: 30px;
			color: #999;
		}

		.date-span {
			font-size: 42px;
			color: #353535;
			margin-top: 24px;
		}

		.sum-day {
			width: 109px;
			height: 41px;
			line-height: 41px;
			text-align: center;
			font-size: 24px;
			color: #ffd544;
			border: 2px solid #ffd544;
			border-radius: 20px;
		}

		.week-span {
			width: 750px;
			height: 60px;
			line-height: 60px;
			border-top: 2px solid #eaeaea;
			border-bottom: 2px solid #eaeaea;
			justify-content: space-around;
			margin-top: 60px;
		}

		.week-span>span {
			font-size: 24px;
			color: #666;
		}

		.month-span {
			width: 194px;
			height: 51px;
			line-height: 51px;
			text-align: center;
			font-size: 30px;
			color: #666;
			border-radius: 30px;
			border: 2px solid #e9e9e9;
			display: block;
			margin-top: 12px;
		}

		.day-span {
			font-size: 30px;
			color: #333;
		}

		.day-list {
			/* justify-content: space-evenly; */
			flex-wrap: wrap;
			align-items: flex-start;
			margin: 10px 0 20px;
		}

		.every-day {
			width: 107px;
			height: 90px;
			/* margin: 0 10px 20px; 
  border-radius: 50%;*/
			justify-content: center;
		}

		/* 入住和离店样式 */
		.every-day.ru-ld {
			background-color: #ffd544;
		}

		/* 选择日期之前的样式 */
		.every-day.center {
			background-color: #FFE693;
		}

		/* 禁止点击样式 */
		.every-day.no-dj>span {
			color: #ddd;
		}

		.no-dj>.day-span {
			position: relative;
		}

		.no-dj>.day-span::after {
			content: '';
			position: absolute;
			left: 50%;
			top: 50%;
			width: 36px;
			height: 2px;
			margin-left: -18px;
			background-color: #ddd;
			transform: rotate(-45deg)
		}

		.every-day:nth-of-type(1n+0) {
			margin-left: 0;
		}

		.every-day:nth-of-type(7n+0) {
			margin-right: 0;
		}

		/* 节日或入离店样式 */
		.jr-or-rld {
			font-size: 24px;
		}
		.footer-line {
			width: 100%;
			text-align: center;
			font-size: 28px;
			color: #999;
			margin-bottom: 230px;
    // padding: 100px;
		}
		.footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 120px;
			border-top: 2px solid #eee;
			background-color: #fff;
			justify-content: space-around;
		}

		.footer>span {
			font-size: 30px;
		}

		.sure-btn {
			width: 436px;
			height: 100px;
			line-height: 100px;
			text-align: center;
			font-size: 36px;
			border-radius: 50px;
			background-color: #ffd544;
		}
	}
</style>
