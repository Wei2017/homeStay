<template>
  <div class="me container">
    <!-- 我的页面 -->

    <div class="my-header container">
      <img class="user-head" src="/static/img/footer-img@2x.png" alt>
      <!-- 已登录用户展示 -->
      <!-- <view class='user-info container'>
      <text class='user-name'>杭州明月</text>
      <text class='user-level'>普通会员</text>
      </view>-->
      <!-- 未登陆 -->
      <div class="login-btn">去登录/注册</div>
    </div>
    <div class="section-wrap-my">
      <div class="my-order row">
        <div class="left-img-text row">
          <div class="img-box">
            <img src="/static/img/order-icon@2x.png" alt class="order-icon">
          </div>
          <span>我的订单</span>
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="my-order row">
        <div class="left-img-text row">
          <div class="img-box">
            <img src="/static/img/history-icon@2x.png" class="history-icon">
          </div>
          <span>浏览历史</span>
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="my-order row">
        <div class="left-img-text row">
          <div class="img-box">
            <img src="/static/img/kf-icon@2x.png" class="kf-icon">
          </div>
          <span>在线客服</span>
        </div>
        <van-icon name="arrow"/>
      </div>
      <router-link to="/set">
        <div class="my-order row">
          <div class="left-img-text row">
            <div class="img-box">
              <img src="/static/img/setting@2x.png" class="setting-icon">
            </div>
            <span>设置</span>
          </div>
          <van-icon name="arrow"/>
        </div>
      </router-link>
    </div>
    <div class="footer">
      <div class="login-out" @click="logoOut">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Me",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    // 退出登录
    logoOut() {}
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.me {
  .user-head {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 20px 0 40px;
  }
  .user-name {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .user-level {
    font-size: 20px;
    color: #999;
  }
  .login-btn {
    height: 40px;
    line-height: 40px;
    padding: 7px 15px;
    font-size: 22px;
    border: 1px solid #f0f0f8;
    text-align: center;
  }
  .section-wrap-my {
    width: 670px;
    margin-top: 65px;
    border-top: 1px solid #f0f0f8;
  }
  .my-order {
    padding: 0 40px 0 17px;
    height: 140px;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f8;
  }
  .img-box {
    width: 42px;
    margin-right: 25px;
  }
  .order-icon {
    width: 34px;
    height: 39px;
  }
  .history-icon {
    width: 34px;
    height: 34px;
  }
  .kf-icon {
    width: 40px;
    height: 32px;
  }
  .setting-icon {
    width: 35px;
    height: 33px;
  }
  .left-img-text > span {
    font-size: 32px;
    color: #484848;
  }
  .right-icon {
    width: 9px;
    height: 14px;
  }
  .login-out {
    width: 589px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    border-radius: 50px;
    background-color: #f0f0f8;
    margin-top: 65px;
  }
}
</style>
