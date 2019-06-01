<template>
  <div class="setPhone container">
    <!-- 更换手机号 -->
    <div class="setting-item row">
      <div class="left">手机号</div>
      <div class="right row">
        <input type="tel" v-model="phone" placeholder="填写需要更换的手机号">
      </div>
    </div>
    <div class="change-btn" @click="changeBtn">更换手机号</div>
  </div>
</template>

<script>
export default {
  name: "setPhone",
  data() {
    return {
      phone: "13466608250"
    };
  },
  components: {},
  mounted() {},
  methods: {
    changeBtn() {
      this.$router.push({ path: "/me" });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.setPhone {
  .setting-item {
    width: 675px;
    height: 103px;
    justify-content: space-between;
    padding: 0 12px 0 23px;
    border-top: 1px solid #f0f0f8;
    border-bottom: 1px solid #f0f0f8;
  }
  .left {
    font-size: 26px;
  }
  .right {
    width: 70%;
    input {
      width: 90%;
      text-align: right;
    }
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
  .change-btn {
    width: 589px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    margin-top: 54px;
    border-radius: 50px;
    background: -webkit-linear-gradient(left, #ffe799, #ffd33b);
    background: -o-linear-gradient(right, #ffe799, #ffd33b);
    background: -moz-linear-gradient(right, #ffe799, #ffd33b);
    background: linear-gradient(to right, #ffe799, #ffd33b);
  }
}
</style>
