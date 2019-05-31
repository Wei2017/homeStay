<template>
	<div class="timeChose">
		<div>
			<div class="time-top">
				<div><em>入住日期</em><em>离店日期</em></div>
				<div class="times">
					<span class="startTime">{{timeObj.rzDate}}<b>{{timeObj.startWeek}}</b></span>
					<b>共{{timeObj.days}}晚</b>
					<span class="endTime">{{timeObj.endM}}月{{timeObj.endD}}日 <b>{{timeObj.endWeek}}</b></span>
				</div>
				<div class="week">
					<span v-for="(week,index) in timeObj.weekArr" :key="index">{{week}}</span>
				</div>
			</div>
			<div class='section-wrap-date'>
				<div class='month-content' v-for="(item,index) in timeObj.month" :key='index'>
					<p class='month-text'>{{item.date}}</p>
					<ul class='day-list row'>
						<li v-for="(day,inx) in item.days" :key="inx">
							<!-- <div class='every-day container {{list.state?"ru-ld":""}} {{list.checked?"center":""}} {{list.style == "2" && list.day !="" || list.style == "3"?"no-dj":""}}'
							 data-state="{{list.style}}" data-i="{{list.nums}}" data-type="{{list.state}}" @click='selectDate'>
								<span class='day-text'>{{day.day}}</span>
								<span class='jr-or-rld' style='visibility:{{day.festival != ""?"visible":"hidden"}}'>{{list.festival != ""?list.festival:"占位"}}</span>
							</div> -->
						</li>
					</ul>
				</div>
			</div>
			<div class="footer-line">我是有底线的，最长可预订近4个月的房屋</div>
		</div>
		<div class="footer">
			<b>清空</b>
			<span>确定</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'timeChose',
		data() {
			return {
				timeObj: {
					rzDate: '05月28日',
					ldDate: '05月29日',
					startWeek: '周三',
					endWeek: '周四',
					daysSum: 1, //入住总天数
					weekArr: ['日', '一', '二', '三', '四', '五', '六'],
					rzAndLd: -1, //1为点击了入住 选择离店
					rzIndex: -1, //入住的下标
					ldIndex: -1, //离店的下标
					month: []
				},
			}
		},
		components: {},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getMonth()
			},
			getMonth() {
				this.timeObj.month = [{
					date: '2019年5月',
					days: [{
							day: '',
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: '',
							festival: ''
						},
						{
							day: '',
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: '',
							festival: ''
						},
						{
							day: '',
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: '',
							festival: ''
						}, //前三个占位
						{
							day: 1,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 1,
							festival: '劳动节'
						},
						{
							day: 2,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 2,
							festival: ''
						},
						{
							day: 3,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 3,
							festival: ''
						},
						{
							day: 4,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 4,
							festival: '青年节'
						},
						{
							day: 5,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 5,
							festival: ''
						},
						{
							day: 6,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 6,
							festival: ''
						},
						{
							day: 7,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 7,
							festival: ''
						},
						{
							day: 8,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 8,
							festival: ''
						},
						{
							day: 9,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 9,
							festival: ''
						},
						{
							day: 10,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 10,
							festival: ''
						},
						{
							day: 11,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 11,
							festival: ''
						},
						{
							day: 12,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 12,
							festival: ''
						},
						{
							day: 13,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 13,
							festival: ''
						},
						{
							day: 14,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 14,
							festival: ''
						},
						{
							day: 15,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 15,
							festival: ''
						},
						{
							day: 16,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 16,
							festival: ''
						},
						{
							day: 17,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 17,
							festival: ''
						},
						{
							day: 18,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 18,
							festival: ''
						},
						{
							day: 19,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 19,
							festival: ''
						},
						{
							day: 20,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 20,
							festival: ''
						},
						{
							day: 21,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 21,
							festival: ''
						},
						{
							day: 22,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 22,
							festival: ''
						},
						{
							day: 23,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 23,
							festival: ''
						},
						{
							day: 24,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 24,
							festival: ''
						},
						{
							day: 25,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 25,
							festival: ''
						},
						{
							day: 26,
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 26,
							festival: ''
						},
						{
							day: 27,
							style: 1, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 27,
							festival: '',
							today: '05月27日'
						},
						{
							day: 28,
							style: 1, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 28,
							festival: '',
							today: '05月28日'
						},
						{
							day: 29,
							style: 1, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 29,
							festival: '',
							today: '05月29日'
						},
						{
							day: 30,
							style: 1, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 30,
							festival: '',
							today: '05月30日'
						},
						{
							day: 31,
							style: 3, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: 31,
							festival: '无房'
						},
						{
							day: '',
							style: 2, //1可选 2不可选||小于当前日期 3满房||无房,
							nums: '',
							festival: ''
						},
					]
				}]
			},
			// 选择乳垫和离店
			selectDate(e) {
				let that = this
				// 状态 1 可点击
				let state = e.currentTarget.dataset.state
				let type = e.currentTarget.dataset.type
				if (state != '1' || type) {
					return
				}
				// 点击的日期下标
				let dayIndex = e.currentTarget.dataset.i

				let month = that.data.month

				let rzIndex = that.data.rzIndex
				let ldIndex = that.data.ldIndex
				console.log(state, dayIndex)

				//入住或离店状态
				let rzAndLd = that.data.rzAndLd

				if (rzAndLd == 2) {
					let rzDate = ''
					console.log(3)
					for (let i = 0; i < month.length; i++) {
						// 每个月的每一天
						let days = month[i].days
						for (let d = 0; d < days.length; d++) {
							days[d].checked = false
							days[d].state = false
							if (days[d].nums == dayIndex) {
								days[d].state = true
								days[d].festival = '入住'
								rzDate = days[d].today
							}
							if (days[d].nums == ldIndex) {
								days[d].festival = ''
							}
							if (days[d].nums == rzIndex) {
								days[d].festival = ''
							}
						}
					}
					that.timeObj = {
						rzDate: rzDate,
						ldDate: '',
						startWeek: '周三',
						endWeek: '周四',
						daysSum: 1, //入住总天数
						weekArr: ['日', '一', '二', '三', '四', '五', '六'],
						rzAndLd: 1, //1为点击了入住 选择离店
						rzIndex: dayIndex, //入住的下标
						ldIndex: -1, //离店的下标
						month: month
					}
					return
				}

				// 设置用户点击了入住
				if (rzAndLd == 1) {
					let ldDate = ''
					let rzDate = ''
					console.log(1)
					// 离店
					for (let i = 0; i < month.length; i++) {
						let days = month[i].days
						// 每个月的每一天
						for (let d = 0; d < days.length; d++) {
							if (days[d].nums > rzIndex && days[d].nums < dayIndex) {
								days[d].checked = true
							}
							// 用户选择的离店日期小于入住日期 反选
							if (dayIndex < rzIndex) {
								if (days[d].nums == rzIndex) {
									days[d].festival = '离店'
									ldDate = days[d].today
								}
								if (days[d].nums == dayIndex) {
									days[d].state = true
									days[d].festival = '入住'
									rzDate = days[d].today
								}

								// 添加中间样式
								if (days[d].nums > dayIndex && days[d].nums < rzIndex) {
									days[d].checked = true
								}
							} else if (days[d].nums == dayIndex) {
								days[d].state = true
								days[d].festival = '离店'
								ldDate = days[d].today
							}
						}
					}
					if (dayIndex > rzIndex) {
						let daysSum = dayIndex - rzIndex
						that.timeObj = {
							rzDate: rzDate,
							ldDate: ldDate,
							startWeek: '周三',
							endWeek: '周四',
							daysSum: daysSum, //入住总天数
							weekArr: ['日', '一', '二', '三', '四', '五', '六'],
							rzAndLd: 2, //1为点击了入住 选择离店
							rzIndex: '', //入住的下标
							ldIndex: dayIndex, //离店的下标
							month: month
						}
					} else {
						let daysSum = rzIndex - dayIndex
						that.timeObj = {
							rzDate: rzDate,
							ldDate: ldDate,
							startWeek: '周三',
							endWeek: '周四',
							daysSum: daysSum, //入住总天数
							weekArr: ['日', '一', '二', '三', '四', '五', '六'],
							rzAndLd: 2, //1为点击了入住 选择离店
							rzIndex: dayIndex, //入住的下标
							ldIndex: rzIndex, //离店的下标
							month: month
						}
					}
				} else {
					console.log(2)
					let rzDate = ''
					// 入住
					// 三个月的所有日期
					for (let i = 0; i < month.length; i++) {
						let days = month[i].days
						// 每个月的每一天
						for (let d = 0; d < days.length; d++) {
							// 给当前点击的添加class
							if (dayIndex == days[d].nums) {
								days[d].state = true
								days[d].festival = '入住'
								rzDate = days[d].today
								break;
							}
						}
					}
					// 更新数据 存储入住的日期对应下标
					that.timeObj = {
						rzDate: rzDate,
						ldDate: '',
						startWeek: '周三',
						endWeek: '周四',
						daysSum: 1, //入住总天数
						weekArr: ['日', '一', '二', '三', '四', '五', '六'],
						rzAndLd: 1, //1为点击了入住 选择离店
						rzIndex: dayIndex, //入住的下标
						ldIndex: '', //离店的下标
						month: month
					}
				}
			},
			// 清空选择的时间
			clearTime() {

			},
			timeSure() {

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
		.footer{
			position: fixed;
			bottom:0;
			left:0;
			z-index:9999;
			border-top:1px solid #e9e9e9;
			width: 100%;
			height: 120px;
			background: #fff;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #000;
			b{
				font-weight: normal;
				font-size:30px;
			}
			span{
				display: inline-block;
				padding:25px 150px;
				border-radius: 50px;
				background: #ffd544;
				font-size:36px;
			}
		}
		// overflow: auto;
		/deep/ .footer-line {
			width: 100%;
			position: absolute;
			bottom: 380px;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			font-size: 28px;
			color: #999;
			// padding: 100px;
		}

		.time-top {
			>div:first-child {
				margin: 65px 20px 25px;
				display: flex;
				justify-content: space-between;

				em {
					font-style: normal;
					color: #999999;
					font-size: 30px;
				}
			}

			.times {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				padding: 0 20px;

				span {
					font-size: 42px;
					color: #353535;

					b {
						font-size: 24px;
						font-weight: 100;
					}
				}

				>b {
					text-align: center;
					color: #ffd544;
					font-size: 24px;
					padding: 5px 20px;
					border-radius: 40px;
					font-weight: 100;
					border: 2px solid #ffd544;
				}
			}

			.week {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 50px 0 15px;
				padding: 30px 20px;
				border: 1px solid #e9e9e9;
				border-left: none;
				border-right: none;

				span {
					font-size: 24px;
					color: #666;
				}
			}
		}

		.month-text {
			width: 194px;
			height: 51px;
			line-height: 51px;
			text-align: center;
			font-size: 30px;
			color: #666;
			border-radius: 30px;
			border: 1px solid #e9e9e9;
			display: block;
			margin-top: 12px;
		}

		.day-text {
			font-size: 30px;
			color: #333;
		}

		.day-list {
			/* justify-content: space-evenly; */
			flex-wrap: wrap;
			align-items: flex-start;
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
		.every-day.no-dj>text {
			color: #ddd;
		}

		.no-dj>.day-text {
			position: relative;
		}

		.no-dj>.day-text::after {
			content: '';
			position: absolute;
			left: 50%;
			top: 50%;
			width: 36px;
			height: 1px;
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

	}
</style>
