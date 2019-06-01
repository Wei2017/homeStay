<template>
  <div class="orderDetail">
    <div class="header">
      <span>等待确认</span>
      <div class="header-desc">
        <span>请您耐心等待</span>
        <span class="count-down">14分05秒</span>
      </div>
    </div>
    <div class="section-wrap">
      <div class="center-container">
        <!-- 入住信息 -->
        <div class="room-info container">
          <!-- 预订日期 -->
          <div class="reserve-date row">
            <div class="rz-date container">
              <em>入住日期</em>
              <span>8月13日</span>
              <em>周一14:00后</em>
            </div>
            <div class="rz-sums">共20晚</div>
            <div class="ld-date container">
              <em>退房日期</em>
              <span>8月13日</span>
              <em>周三12:00前</em>
            </div>
          </div>
          <!-- 位置等信息 -->
          <div class="address-other">
            <div class="other-tips row">
              <span>2019.8.12 12:00后取消或变更订单将产生违约金</span>
              <van-icon name="arrow"/>
            </div>
            <div class="address-info row">
              <div class="room-name container">
                <span class="name-text">杭州西湖边的名人别墅，每幢价值超亿元，有些可以免费参观</span>
                <span class="room-type">经济 2居2床4人</span>
              </div>
              <van-icon name="arrow"/>
            </div>
            <!-- 具体位置 地图展示 -->
            <div class="map-view">
              <!-- <map id="map" bindtap='openLocation' longitude="116.1192065477" latitude="39.6470720880" scale="14" 
              markers="{{markers}}"
              show-location
              style="width: 100%; height: 134px;"
              enable-scroll="{{enableScroll}}">
              </map>-->
              <div class="address-text row">
                <span>杭州西湖边（龙门村例）</span>
                <div class="to-navi row">
                  <img class="to-navi-img" src="/static/img/to-navi.png" alt>
                  <span>去导航</span>
                </div>
              </div>
            </div>
            <!-- 联系商户 -->
            <div class="concat-merchant row">
              <div class="merchant-left row">
                <img src="/static/img/footer-img@2x.png" class="merchant-head">
                <div class="merchant-info">
                  <p>巨野山庄</p>
                  <span>商户</span>
                </div>
              </div>
              <div class="concat-phone row">
                <img class="phone-icon" src="/static/img/da-phone.png" alt>
                <span>打电话</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 订单信息 -->
        <div class="order-content container">
          <div class="rzr-info">
            <div class="order-num row">
              <span class="left-head">订单编号</span>
              <span>123123123131</span>
            </div>
            <div class="rz-ren row">
              <span class="left-head">入住人</span>
              <span>王集权</span>
            </div>
            <div class="rzr-phone row">
              <span class="left-head">手机号</span>
              <span>13126666501</span>
            </div>
          </div>
          <div class="online-pay row">
            <span>线上支付</span>
            <div class="money row">
              <span>￥100</span>
              <van-icon name="arrow"/>
            </div>
          </div>
          <div class="pay-deposit row">
            <span>押金</span>
            <div class="money row">
              <span>￥100</span>
              <van-icon name="arrow"/>
            </div>
          </div>
          <div class="order-tips row">
            <span>若需要机打发票，请在退房时在民宿前台开具发票</span>
            <van-icon name="arrow"/>
          </div>
        </div>
        <!-- 入住须知 -->
        <div class="rz-notice">
          <div class="notice-title">入住须知</div>
          <div class="notice-content">
            这是一个隐藏在繁华城市中心的安静之所，屋内的格式细软、床品、浴品，甚至小到一个杯子都是屋主精心挑选的。这里是杭城高端公寓，非常适合旅游，商务，家庭亲子等出行安排。希望能给您旅途带来居家的惬意和舒适。床单被套都是一客一换。
            房子紧邻历史悠久的京杭大运河，步行十分钟可以到达杭州著名景区拱宸桥，桥边可以坐水上巴士游览京
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按按 -->
    <div class="footer row">
      <span class="cancel-btn">取消订单</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetail.",
  data() {
    return {
      datas: {}
    };
  },
  components: {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.orderDetail {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background: #f0f0f8;
  .section-wrap {
    display: flex;
    justify-content: center;
  }
  em {
    font-style: normal;
  }
  .row {
    display: flex;
    flex-direction: row;
    margin: 8px 0;
    align-items: center;
  }
  .header {
    width: 100%;
    margin: 48px 0 42px 58px;
  }
  .header > span {
    font-size: 48px;
    color: #ffd33b;
  }
  .header-desc {
    margin-top: 20px;
  }
  .header-desc > span {
    font-size: 30px;
  }
  .header-desc .count-down {
    color: #ffd33b;
  }

  .center-container {
    width: 702px;
  }
  .room-info {
    background-color: #fff;
    border-radius: 30px;
    padding: 51px 0 43px;
  }
  .rz-sums {
    margin: 0 60px;
    padding: 10px 18px;
    border: 1px solid #f0f0f8;
    border-radius: 50px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rz-date > em,
  .ld-date > em,
  .rz-sums {
    font-size: 24px;
    color: #484848;
  }
  .rz-date > span,
  .ld-date > span {
    display: inline-block;
    font-size: 36px;
    color: #ffd33b;
    margin-top: 20px;
  }

  /* 位置等其它信息 */
  .address-other {
    width: 600px;
  }
  .other-tips {
    padding: 30px 17px;
    border-top: 1px solid #f0f0f8;
    border-bottom: 1px solid #f0f0f8;
    margin: 43px 0 33px;
    justify-content: space-between;
  }
  .other-tips > span {
    font-size: 24px;
    color: #ffd33b;
  }
  .right-icon {
    width: 10px;
    height: 18px;
  }
  .room-name {
    align-items: flex-start;
  }
  .name-text {
    font-size: 24px;
    color: #333;
    margin-bottom: 14px;
    max-width: 517px;
    line-height: 0.6rem;
  }
  .room-type {
    font-size: 24px;
    color: #999;
  }
  .address-info {
    padding: 0 17px;
    justify-content: space-between;
  }
  /* 地图 */
  .map-view {
    margin: 38px 0 44px;
  }
  .address-text {
    margin-top: 42px;
    padding-bottom: 35px;
    border-bottom: 1px solid #f0f0f8;
    justify-content: space-between;
  }
  .address-text > span {
    font-size: 24px;
    color: #999;
  }
  .to-navi > span {
    font-size: 24px;
    color: #ffd33b;
  }
  .to-navi-img {
    width: 28px;
    height: 29px;
    margin-right: 9px;
  }
  /* 联系商户 */
  .concat-merchant {
    justify-content: space-between;
  }
  .merchant-head {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    margin-right: 11px;
  }
  .merchant-info > p {
    font-size: 24px;
  }
  .merchant-info > span {
    font-size: 20px;
    color: #999;
  }
  .phone-icon {
    width: 30px;
    height: 30px;
    margin-right: 9px;
  }
  .concat-phone > span {
    font-size: 24px;
    color: #ffd33b;
  }

  /* 订单信息 */
  .order-content {
    padding: 44px 51px 54px;
    background-color: #fff;
    border-radius: 30px;
    margin: 20px 0 66px;
  }
  .rzr-info {
    width: 100%;
    padding: 0 0 33px 25px;
    border-bottom: 1px solid #f0f0f8;
    > div {
      margin: 5px 0;
    }
    > span {
      margin-bottom: 16px;
      padding: 10px 0;
    }
    .left-head {
      color: #999;
      width: 130px;
      margin-right: 16px;
    }
    span {
      font-size: 30px;
    }
  }
  .online-pay,
  .pay-deposit {
    width: 100%;
    padding: 38px 0 38px 25px;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f8;
  }
  .online-pay > span,
  .pay-deposit > span {
    font-size: 30px;
    color: #999;
  }
  .money {
    span {
      font-size: 30px;
      margin-right: 14px;
    }
    .van-icon {
      color: #666;
    }
  }
  .order-tips {
    width: 100%;
    padding-left: 17px;
    margin-top: 47px;
    justify-content: space-between;
    font-size: 24px;
    color: #ffd33b;
  }
  /* 入住须知 */
  .notice-title {
    font-size: 36px;
    font-weight: 600;
  }
  .notice-content {
    font-size: 24px;
    color: #999;
    margin: 36px 0 80px;
  }
  /* 底部按钮 */
  .footer {
    width: 100%;
    height: 120px;
    background-color: #fff;
    justify-content: flex-end;
  }
  .cancel-btn {
    width: 198px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    border-radius: 50px;
    border: 1px solid #f0f0f8;
    margin-right: 51px;
  }
}
</style>
