<template>
  <div class="priceDetail" v-if="details">
    <div class="com div1">
      <span>线上支付</span>
      <b>￥{{details.totalFee}}</b>
    </div>
    <div>
      <p class="com">
        <span>房费({{details.stayRoomListFee.length}}晚)</span>
        <b>￥{{details.totalRoomFee}}</b>
      </p>
      <ul class="list">
        <li v-for="(item,index) in details.stayRoomListFee" :key="index">
          <span>{{item.rdExtB}}</span>
          <span>￥{{item.price}} * {{item.rdExtA}}套</span>
        </li>
      </ul>
    </div>
    <div class="com">
      <span>押金(离店后退还)</span>
      <b>￥{{details.onlineDeposit}}</b>
    </div>
    <div class="closeDevice">
      <van-icon @click="closeDevice" name="cross"/>
    </div>
  </div>
</template>

<script>
import { getSelectDaysFeeDetail } from "../../api/api";
export default {
  name: "priceDetail",
  data() {
    return {
      details: null
    };
  },
  components: {},
  mounted() {
		this.init()
	},
  methods: {
		init(){
			let par = {
				startRoomDayId:this.$route.query.startRoomDayId,
				endRoomDayId:this.$route.query.endRoomDayId,
				roomAccId:this.$route.query.roomAccId,
				roomCount:this.$route.query.roomCount,
			}
			getSelectDaysFeeDetail(par).then(res =>{
				if(res.respCode === '2000'){
					this.details = res.respData
				}
			})
		},
    closeDevice() {
      this.$router.go(-1);
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.priceDetail {
  padding: 40px 20px 0;
  > div {
    padding: 40px 22px;
    border-bottom: 1px solid #f0f0f8;
  }
  > div:nth-child(3) {
    border-bottom: none;
    margin-bottom: 80px;
  }
  .com {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    color: #333;
    b {
      font-weight: normal;
    }
  }
  .div1 {
    font-size: 36px;
    b {
      color: #ffd33c;
    }
  }
  .list {
    padding: 45px 23px;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #999;
      font-size: 26px;
      padding: 15px 0;
    }
  }
  .closeDevice {
    font-size: 40px;
    color: #999;
    text-align: center;
    margin: 80px 0;
    border-bottom: none;
    i {
      padding: 10px;
    }
  }
}
</style>
