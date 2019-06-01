<template>
  <!-- 意见反馈 -->
  <div class="feedBack container">
    <div class="user-feedback-content">
      <textarea class="user-input" maxlength="500" placeholder="请输入您的意见及反馈（500字以内）"></textarea>
    </div>
    <div
      class="deedback-desc"
    >您的每条反馈我们都会仔细阅读，但我们无法保证每一条都能及时回复，如果您有紧急问题需要咨询，请直接拨打客服热线联系我们: 400-888-1234， 谢谢您的理解。</div>
    <div class="concat-phone row">
      <span class="concat-head">联系方式</span>
      <input type="tel" maxlength="11" placeholder="请输入您的联系方式" placeholder-class="place">
    </div>
    <div class="footer" @click="submit">提交</div>
  </div>
</template>

<script>
export default {
  name: "feedBack",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    submit() {
      this.$router.push({ path: "/me" });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.feedBack {
  .user-feedback-content {
    margin: 14px 0 48px;
  }
  .user-input {
    width: 663px;
    height: 326px;
    font-size: 26px;
    padding: 30px 0 0 30px;
    border: 1px solid #eaeaea;
  }
  .place,
  .deedback-desc {
    font-size: 26px;
    color: #999;
  }
  .deedback-desc {
    max-width: 675px;
    margin-bottom: 42px;
  }

  .concat-head {
    font-size: 26px;
  }
  .concat-phone {
    width: 665px;
    justify-content: space-between;
    padding: 45px 0 35px;
    border-top: 1px solid #f0f0f8;
    border-bottom: 1px solid #f0f0f8;
    padding-left: 5px;
    margin-bottom: 46px;
  }
  input[type="tel"] {
    width: 75%;
    font-size: 26px;
    text-align: right;
  }

  .footer {
    width: 589px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    border-radius: 50px;
    margin: 30px 0;
    background: -webkit-linear-gradient(left, #ffe799, #ffd33b);
    background: -o-linear-gradient(right, #ffe799, #ffd33b);
    background: -moz-linear-gradient(right, #ffe799, #ffd33b);
    background: linear-gradient(to right, #ffe799, #ffd33b);
  }
}
</style>
