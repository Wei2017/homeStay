<template>
  <div class="set container">
    <!-- 设置 -->
    <router-link to="/setPhone" class="navig">
      <div class="setting-item row">
        <div class="left">手机号</div>
        <div class="right row">
          <span class="phone">13466608250</span>
          <van-icon name="arrow"/>
        </div>
      </div>
    </router-link>
    <router-link to="/feedBack" class="navig">
      <div class="setting-item row">
        <div class="left">意见反馈</div>
        <div class="right row">
          <van-icon name="arrow"/>
        </div>
      </div>
    </router-link>
    <router-link to="/about" class="navig">
      <div class="setting-item row">
        <div class="left">关于乐住宿</div>
        <div class="right row">
          <van-icon name="arrow"/>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.set {
  a {
    color: #000;
  }
  .van-icon-arrow {
    color: #333;
  }
  .setting-item {
    width: 675px;
    height: 103px;
    justify-content: space-between;
    padding: 0 12px 0 23px;
  }
  .navig {
    border-top: 1px solid #f0f0f8;
  }
  .left {
    font-size: 26px;
  }
  .phone {
    font-size: 26px;
    color: #999;
    margin-right: 30px;
  }
  .right-icon {
    width: 9px;
    height: 14px;
  }
  .navig:last-child {
    border-bottom: 1px solid #f0f0f8;
  }
}
</style>
