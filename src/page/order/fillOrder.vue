<template>
  <div class="fillOrder">
    <div class="order-detail">
      <div>
        <h3>{{roomMainInfo.roomName}}</h3>
        <p>{{roomMainInfo.roomDes}}</p>
      </div>
      <div>
        <span>
          <img :src="roomMainInfo.roomImg" alt>
        </span>
      </div>
    </div>
    <div class="choseTime" @click="choseTime(dateInfo.stayInDay,dateInfo.stayOutDay)">
      <div>
        <span>入住日期</span>
        <span>{{dateInfo.stayInDay}}</span>
      </div>
      <div>
        <span>退房日期</span>
        <span>{{dateInfo.stayOutDay}}</span>
      </div>
      <div>
        <span>共</span>
        <span>{{dateInfo.totalNightCount}}晚</span>
      </div>
    </div>
    <ul class="hotel-detail">
      <li>
        <span>房屋套数</span>
        <div class="stepNum">
          <em @click="roomMinus(1)">-</em>
          <b>{{obj.roomNum}}套</b>
          <em @click="roomPlus(1)">+</em>
        </div>
      </li>
      <li>
        <span>入住人数</span>
        <div class="stepNum">
          <em @click="roomMinus(2)">-</em>
          <b>{{obj.personNum}}人</b>
          <em @click="roomPlus(2)">+</em>
        </div>
      </li>
      <li>
        <span>入住人</span>
        <input type="text" v-model="obj.name" placeholder="填写真实姓名">
      </li>
      <li>
        <span>手机号</span>
        <input type="tel" v-model="obj.tel" placeholder="手机号将被用于接收订单信息">
      </li>
      <li>
        <span>身份证信息</span>
        <input type="text" v-model="obj.idCard" placeholder="选填">
      </li>
      <li>
        <span>费用明细</span>
        <div @click="showPriceDetail">
          查看详情
          <van-icon name="arrow"/>
        </div>
      </li>
    </ul>
    <div class="notice">
      <h3>预定须知</h3>
      <div>{{dateInfo.userShouldKnow}}</div>
    </div>
    <div class="bottomBtn">
      <b>￥{{dateInfo.totalFee}}</b>
      <span @click="sureOrder">立即预定</span>
    </div>
  </div>
</template>

<script>
import dayEventBus from '@/components/service/dayEventBus.js'
import { getModelByRoomAccId, getRoomDayDefaultSel ,getRoomDayUserSel} from "../../api/api";
export default {
  name: "fillOrder",
  data() {
    return {
      delId: this.$route.query.delId,
			roomMainInfo:null, //房型主要信息
			dateInfo:null,
      obj: {
        roomNum: 1,
        personNum: 1,
        name: "",
        tel: "",
        idCard: ""
      }
    };
  },
  components: {},
  mounted() {
		this.init()
	},
  methods: {
		init(){
			// 获取一个房型的主要信息 
			getModelByRoomAccId(this.$route.query.delId).then(res =>{
				if(res.respCode === '2000'){
					this.roomMainInfo = res.respData
				}
			})
			// 获取默认一个房型选择的日历
			getRoomDayDefaultSel(this.$route.query.delId).then(res =>{
				if(res.respCode === '2000'){
					this.dateInfo = res.respData
				}
			})
			this.activated()
		},
		
		// 每次重新选择日期时
		activated(){
			//根据key名获取传递回来的参数，data就是map
			dayEventBus.$on('dayDatas', function(data){
					//赋值
					console.log(data)
					this.dateInfo.stayInDay = data.inDate
					this.dateInfo.stayOutDay = data.outDate
					// this.dateInfo.totalNightCount = 
			}.bind(this));
		},
		// 选取时间
		choseTime(start,end) {
			let startDay = start.split('月')
		  this.$router.push({
		    path: "/timeChose",
		    query: {start:start,end:end}
		  });
		},
    // 房屋数量--
    roomMinus(inx) {
      if (inx === 1) {
        if (this.obj.roomNum <= 1) {
          return;
        }
        this.obj.roomNum--;
      } else {
        if (this.obj.personNum <= 1) {
          return;
        }
        this.obj.personNum--;
      }
    },
    roomPlus(inx) {
			let par = {
				startRoomDayId:'',
				endRoomDayId:'',
				roomAccId:this.$route.query.delId,
				roomCount:'',
			}
			getRoomDayUserSel(par).then(res =>{
				
			})
      if (inx === 1) {
        this.obj.roomNum++;
      } else {
        this.obj.personNum++;
      }
    },
    // 查看费用明细
    showPriceDetail() {
      this.$router.push({
        path: "/priceDetail",
        query: { delId: this.delId }
      });
    },
    // 立即预定
    sureOrder() {
      this.$router.push({
        path: "/sureOrder",
        query: { orderId: this.delId }
      });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
@import "../../style/com.css";
.fillOrder {
  > div {
    padding: 20px;
  }
  .order-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px 30px;
    h3 {
      font-size: 24px;
      line-height: 0.5rem;
    }
    p {
      color: #999;
      font-size: 24px;
      margin-top: 15px;
    }
    div:nth-child(2) {
      margin-left: 25px;
      span {
        width: 200px;
        height: 134px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .choseTime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 35px;
    padding: 53px 26px 63px;
    border-top: 1px solid #f0f0f8;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 24px;
        color: #484848;
      }
      span:nth-child(2) {
        font-size: 36px;
        color: #ffd33b;
        margin-top: 26px;
      }
    }
  }
  .hotel-detail {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 40px 30px;
      border-top: 1px solid #f0f0f8;
      span {
        font-size: 36px;
        color: #484848;
      }
      b,
      em {
        font-style: normal;
        font-weight: normal;
      }
      > div,
      input {
        width: 70%;
        text-align: right;
      }
      div.stepNum {
        em {
          display: inline-block;
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-radius: 50%;
          font-size: 22px;
          color: #ffd33b;
          border: 2px solid #ffd33b;
          touch-action: none;
        }
        em:nth-child(1) {
          color: #ccc;
          border: 2px solid #ccc;
        }
        b {
          font-size: 24px;
          color: #484848;
          padding: 0 10px;
        }
      }
    }
    li:last-child {
      > div {
        width: 40%;
        color: #999;
        i {
          margin-left: 8px;
          top: 4px;
        }
      }
    }
  }
  .notice {
    background: #f0f0f8;
    margin-bottom: 200px;

    h3 {
      font-size: 36px;
      color: #000;
      padding: 40px 5px 20px;
    }
    > div {
      color: #999;
      font-size: 24px;
      line-height: 0.55rem;
      padding: 0 5px 80px;
    }
  }
  .bottomBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    border-top: 1px solid #e9e9e9;
    width: 100%;
    height: 90px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #000;
    b {
      font-weight: normal;
      font-size: 36px;
    }
    span {
      display: inline-block;
      padding: 25px 120px;
      border-radius: 50px;
      background: #ffd544;
    }
  }
}
</style>
