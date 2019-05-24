<template>
	<div class="timeChose">
		<div class="time-top">
			<div><em>入住日期</em><em>离店日期</em></div>
			<div class="times">
				<span class="startTime">{{timeObj.startM}}月{{timeObj.startD}}日 <b>周{{timeObj.startWeek}}</b></span>
				<b>共{{timeObj.days}}晚</b>
				<span class="endTime">{{timeObj.endM}}月{{timeObj.endD}}日 <b>周{{timeObj.endWeek}}</b></span>
			</div>
			<div class="week">
				<span v-for="(week,index) in timeObj.weekArr" :key="index">{{week}}</span>
			</div>
		</div>
		<nut-calendar 
			ref="calendarDiv"
			:is-visible="true" 
			type="range" 
			title=""
			:isAutoBackFill = "true"
			:start-date="timeObj.startDate" 
			:end-date="timeObj.endDate"
			:animation="`nutSlideUp`" 
			@close="clearTime" 
			@choose="chooseTime">
		</nut-calendar>
		<!-- <div class="footer-line">我是有底线的，最长可预订近4个月的房屋</div> -->
	</div>
</template>

<script>
	export default {
		name: 'timeChose',
		data() {
			return {
				timeObj:{
					params:[],
					days:1,
					startM:'05',
					startD:'16',
					startWeek:'三',
					endM:'06',
					endD:'18',
					endWeek:'周二',
					dateArr:[],
					weekArr:['日','一','二','三','四','五','六'],
					startDate:'2019-05-23',
					endDate:'2019-09-31'
				},
			}
		},
		components: {},
		mounted() {
			this.init()
		},
		methods: {
			init(){
				let calendar = document.getElementsByClassName('nut-calendar-months-panel')[0]
				calendar.innerHTML = calendar.innerHTML + '<div class="footer-line"> 我是有底线的，最长可预订近4个月的房屋 </div>'
			},
			// 清空选择的时间
			clearTime() {
				
			},
			// 选定时间
			chooseTime(param) {
				console.log(param)
				let dateArr = [...[param[0][3], param[1][3]]]
				this.timeObj = {
					params:param,
					days:this.$common.DateMinus(dateArr[0],dateArr[1]),
					startM:param[0][1],
					startD:param[0][2],
					startWeek:param[0][4].slice(2),
					endM:param[1][1],
					endD:param[1][2],
					endWeek:param[1][4].slice(2),
					dateArr:dateArr,
					weekArr:['日','一','二','三','四','五','六'],
					startDate:'2019-05-23',
					endDate:'2019-09-31'
				}
			},
			timeSure(){
				
			}
		},
		computed: {

		},
		watch: {
			timeObj:{
				handler(){
					let dateArr = this.timeObj.dateArr
					this.timeObj.days = this.$common.DateMinus(dateArr[0],dateArr[1])
				},
				deep:true
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.timeChose {
		// overflow: auto;
		/deep/ .footer-line{
			width:100%;
			position: absolute;
			bottom:380px;
			left:50%;
			transform: translateX(-50%);
			text-align: center;
			font-size: 28px;
			color: #999;
			// padding: 100px;
		}
		.time-top{
			>div:first-child{
				margin: 65px 20px 25px;
				display: flex;
				justify-content: space-between;
				em{
					font-style:normal;
					color: #999999;
					font-size:30px;
				}
			}
			.times{
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				padding: 0 20px;
				span{
					font-size:42px;
					color:#353535;
					b{
						font-size:24px;
						font-weight: 100;
					}
				}
				>b{
					text-align:center;
					color:#ffd544;
					font-size:24px;
					padding: 5px 20px;
					border-radius: 40px;
					font-weight: 100;
					border: 2px solid #ffd544;
				}
			}
			.week{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin:50px 0 15px;
				padding: 30px 20px;
				border: 1px solid #e9e9e9;
				border-left: none;
				border-right: none;
				span{
					font-size:24px;
					color: #666;
				}
			}
		}
		/deep/ .nut-calendar{
			// position: unset;
			margin-bottom:100px;
			top:340px;
			padding-top:0;
			bottom: 200px;
			.nut-calendar-control{
				position: fixed;
				bottom:0;
				top:unset;
				background: #fff;
				height: 97px;
				line-height: 97px;
				border-top: 1px solid #cccccc; 
				>span{
					height: 77px;
					line-height: 77px;
					margin-top:10px;
					color:#000;
					cursor: pointer;
				}
				.nut-calendar-confirm-btn{
					width:55%;
					background: #ffd544;
					right:15px;
					font-size:36px;
					border-radius: 50px;
				}
				.nut-calendar-cancel-btn{
					width:35%;
					left: 15px;
					font-size:30px;
				}
				.nut-calendar-title{
					display: none;
				}
				.nut-calendar-week{
					display: none;
				}
			}
			
			.nut-calendar-months{
				// height: 100%;
				// overflow-y: scroll;
				.nut-calendar-month-con .nut-calendar-month-day .nut-calendar-day-tip{
					font-size:22px!important;
				}
				.nut-calendar-months-panel{
					// transform: unset!important;
					// transition: unset!important;
					height: 100%;
					padding-bottom:200px;
				}
				.nut-calendar-month:last-child{
					margin-bottom: 100px;
				}
				.nut-calendar-loading-tip{
					display: none;
				}
				.nut-calendar-month-title{
					font-size: 32px;
					text-align: left;
					color: #666666;
					margin: 20px;
					width: 27%;
					padding: 18px 23px;
					border:2px solid #e9e9e9;
					border-radius: 50px;
					background: none;
					text-align: center;
				}
				.nut-calendar-month-day{
					font-size: 30px;
					color: #333;
					height: 86px;
				}
				.nut-calendar-month-day-disabled{
					color: #dadada;
				}
				.nut-calendar-month-day-active{
					background-color:#ffd544;
					color: #000;
				}
				.nut-calendar-month-day-choose{
					background-color:#ffe693;
				}
			}
		}
	}
</style>
