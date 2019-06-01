<template>
  <div class="orderList">
    <van-tabs v-model="datas.active" swipeable animated @change="changeTab">
      <van-tab v-for="(item,index) in datas.titles" :key="index" :title="item">
        <div class="all-order-list">
          <div class="order-header row">
            <span class="order-header-text">(湖景-高级标准间)</span>
            <span
              class="order-header-state"
            >{{datas.test == '2'?'待支付':datas.test == '3'?'待确认':'待评价'}}</span>
          </div>
          <div class="order-content row" @click="toDetail">
            <div class="order-img-text row">
              <img src="/static/img/footer-img@2x.png" class="order-img">
              <div class="order-title">
                <p class="order-name">杭州西湖边的名人别墅，每幢价值超亿元，有些可以免费参观</p>
                <span class="order-date">2019.04.07→2019.04.10</span>
              </div>
            </div>
            <div class="order-price">￥224.00</div>
          </div>
          <div class="order-footer row">
            <div class="order-pay-time">
              <span>22分钟</span>后订单自动取消
            </div>
            <div class="order-btn row">
              <span class="btn-item btn-concat">联系房东</span>
              <span class="btn-item btn-pay">去支付</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  name: "order",
  data() {
    return {
      datas: {
        active: 0,
        titles: ["全部", "待支付", "待确认", "待评价"],
        test: 3,
        items: []
      }
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  mounted() {},
  methods: {
    // 当前激活的标签改变时触发
    changeTab(inx) {
      console.log(inx);
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop = 0;
    },
    toDetail() {
      this.$router.push({
        path: "/orderDetail"
      });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.orderList {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background: #f0f0f8;
  /deep/ .van-tabs {
    .van-tabs__wrap {
      padding: 40px;
      position: unset;

      .van-tabs__nav {
        background: none;
        .van-tabs__line {
          bottom: 0;
          background-color: #ffd33b;
          height: 0.078rem;
          padding: 0 15px;
          left: -15px;
          margin: -8px 0;
        }
        .van-tab {
          font-size: 30px;
          color: #424649;
        }
        .van-tab--active {
          color: #ffd33b;
        }
      }
    }
    .van-tabs__content {
      .van-tabs {
        height: 500px;
      }
      .van-tab__pane {
        display: flex;
        align-items: center;
        justify-content: center;
        .row {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .all-order-list {
          width: 645px;
          height: 301px;
          padding: 37px 28px 32px 29px;
          background-color: #fff;
          border-radius: 30px;
          margin-bottom: 20px;
        }
        .order-img {
          width: 182px;
          height: 120px;
          border-radius: 10px;
          margin-right: 22px;
        }
        .order-header {
          justify-content: space-between;
        }
        .order-header-text {
          font-size: 20px;
          color: #666;
        }
        .order-header-state {
          font-size: 26px;
          color: #ffd33b;
        }
        .order-content {
          margin: 40px 0 50px;
          align-items: flex-start;
          justify-content: space-between;
        }
        .order-img-text {
          align-items: flex-start;
        }
        .order-name {
          display: block;
          font-size: 20px;
          max-width: 280px;
          margin-bottom: 12px;
        }
        .order-date {
          font-size: 20px;
          color: #666;
        }
        .order-price {
          font-size: 24px;
          font-weight: 600;
          margin-top: 16px;
        }
        .order-pay-time {
          font-size: 24px;
          color: #666;
        }
        .order-pay-time > span {
          color: #ffd33b;
        }
        .order-footer {
          justify-content: space-between;
        }
        .btn-item {
          width: 165px;
          height: 53px;
          line-height: 53px;
          text-align: center;
          font-size: 30px;
          border-radius: 50px;
        }
        .btn-item:last-child {
          margin-left: 10px;
        }
        .btn-concat {
          color: #666;
          border: 2px solid #f0f0f8;
        }
        .btn-pay {
          color: #fff;
          border: 2px solid #ffd33b;
          background-color: #ffd33b;
        }
      }
    }
  }
}
</style>
