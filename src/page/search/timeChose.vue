<template>
	<div class="timeChose">
		<div class="time-top">
			<div><em>入住日期</em><em>离店日期</em></div>
			<div class="times">
				<span class="startTime">05月16日 <b>周四</b></span>
				<b>共20晚</b>
				<span class="endTime">05月16日 <b>周四</b></span>
			</div>
			<div class="week">
				<span v-for="(week,index) in timeObj.weekArr" :key="index">{{week}}</span>
			</div>
		</div>
		<nut-calendar 
			:is-visible="true" 
			type="range" 
			title=""
			:start-date="timeObj.startDate" 
			:end-date="timeObj.endDate"
			:animation="`nutSlideUp`" 
			@close="clearTime" 
			@choose="setChooseValue3">
		</nut-calendar>
		<div class="footer-line">我是有底线的，最长可预订近4个月的房屋</div>
	</div>
</template>

<script>
	export default {
		name: 'timeChose',
		data() {
			return {
				timeObj:{
					weekArr:['日','一','二','三','四','五','六'],
					startDate:'2019-05-23',
					endDate:'2019-09-31'
				},
			}
		},
		components: {},
		mounted() {

		},
		methods: {
			// 清空选择的时间
			clearTime(param) {
				console.log(param)
			},
			// 选定时间
			setChooseValue3(param) {
				console.log(param)
				this.date3 = [...[param[0][3], param[1][3]]];
				console.log(this.date3)
			},
			timeSure(){
				
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
			position: unset;
			margin-bottom:100px;
			// top:350px;
			padding-top:0;
			// bottom: 200px;
			// padding-bottom:160px;
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
				.nut-calendar-months-panel{
					transform: unset!important;
					transition: unset!important;
				}
				.nut-calendar-month:last-child{
					// margin-bottom: 150px;
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
		.footer-line{
			height: 30px;
			line-height: 30px;
			text-align: center;
			font-size: 30px;
			color: #999;
			margin-bottom:80px;
		}
	}
</style>
