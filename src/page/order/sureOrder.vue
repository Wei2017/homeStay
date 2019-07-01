<template>
  <div class="surOrder" v-if="orderInfo">
    <div class="top">
      <span>
        <img src="/static/img/sure-time-icon.png" alt>
      </span>
      <p>{{orderInfo.oStateName}}</p>
      <div>订单确认中，您可以联系房东询问进度</div>
    </div>
    <div class="detail" @click="jumpOrderDetail">
      <div>
        <h3>{{orderInfo.oName}}</h3>
        <p>{{orderInfo.oDes}}</p>
      </div>
      <span>
        详情
        <van-icon name="arrow"/>
      </span>
    </div>
    <div class="progress"  @click="jumpFdDetail">
      <p>与房东联系(询问进度)</p>
      <span>
        联系
        <van-icon name="arrow"/>
      </span>
    </div>
  </div>
</template>

<script>
import { getOrderByCode } from "../../api/api";
export default {
  name: "surOrder",
  data() {
    return {
			 orderInfo:null,
			 orderCode:this.$route.query.orderCode
		};
  },
  components: {},
  mounted() {
		this.init()
	},
  methods: {
		init(){
			let par = {
				ordercode:this.orderCode
			}
			getOrderByCode(par).then(res =>{
				if (res.respCode === '2000') {
					this.orderInfo = res.respData
				}
			})
		},
		// 跳转至订单详情
		jumpOrderDetail(){
			this.$router.push({
				path: "/orderDetail",
				query: {
					ordercode:this.orderCode,
				}
			});
		},
		// 跳转至房东页
		jumpFdDetail(){
			this.$router.push({
				path: "/fdImpress",
				query: {
					accountId:this.orderInfo.accountId,
				}
			});
		}
	},
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.surOrder {
  margin: 0 44px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .top {
    background: url("/static/img/sure-top-bj.png") no-repeat;
    background-size: contain;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 294px;
    margin-top: 15px;
    > span {
      width: 75px;
      height: 75px;
      padding: 30px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      color: #fff;
      font-size: 36px;
    }
    div {
      color: #fff;
      font-size: 24px;
      margin-top: 10px;
    }
  }
  .detail,
  .progress {
    > span {
      white-space: nowrap;
      font-size: 24px;
      color: #999;
      i {
        display: inline-block;
        top: 4px;
        margin-left: 9px;
      }
    }
  }
  .detail {
    margin: 30px 30px;
    padding: 40px 0;
    border-bottom: 1px solid #f0f0f8;
    div {
      width: 75%;
      padding: 0 10px;
      h3 {
        font-size: 24px;
        color: #333;
        line-height: 0.55rem;
      }
      p {
        font-size: 24px;
        color: #999;
        padding: 20px 0;
      }
    }
  }
  .progress {
    margin: 30px 30px;
    padding: 40px 0 80px;
    > p {
      width: 75%;
      padding: 0 10px;
      color: #666;
      padding-left: 50px;
      background: url("/static/img/phone-icon.png") no-repeat 12px center;
      background-size: 22px 32px;
    }
  }
}
</style>
