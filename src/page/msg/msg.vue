<template>
  <div class="msgCon">
    <div class="message">
      <div class="message-item" v-for="(item,index) in items" :key="index" @click="toDetail">
        <div class="msg-title row">
          <div class="title-text row">
            <!-- 如果未读 则显示红点 -->
            <p class="red-spot" v-if="test == '1'"></p>
            <span class="title-head">订单预定成功</span>
          </div>
          <span class="msg-time">17:23</span>
        </div>
        <div class="section-wrap">
          <p class="msg-key-text">房东已确认接单！欢迎您的入住。</p>
          <p class="msg-address">地址：杭州西湖边的名人别墅。</p>
          <p class="msg-tips">请与6月7日14：00之后办理入住，6月19日12：00之前办理退房。</p>
        </div>
        <div class="msg-footer">
          <p class="footer-desc">杭州西湖边的名人别墅，每幢价值超亿元，有些可以免费参观</p>
          <p class="footer-date">2019.04.07-2019.04.10(共3晚)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      test: 1,
      items: 10
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    toDetail() {
      this.$router.push({
        path: "/msgDetail",
        query: { msgId: 1 }
      });
      window.scrollTo(0, 0);
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped="scoped" lang="scss">
.msgCon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background: #f0f0f8;
}
.message {
  padding: 33px 0 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .message-item {
    width: 640px;
    padding: 32px 31px 36px;
    background-color: #fff;
    border-radius: 30px;
    margin-bottom: 24px;
  }
  .msg-title {
    justify-content: space-between;
  }
  .red-spot {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ff4200;
    margin-right: 16px;
  }
  .title-head {
    font-size: 30px;
    color: #666;
  }
  .msg-time {
    font-size: 20px;
    color: #999;
  }
  .section-wrap {
    margin: 36px 0 32px;
  }
  .section-wrap > p {
    font-size: 24px;
    color: #333;
    margin: 5px 0;
  }
  .msg-footer {
    padding: 26px 30px;
    background-color: #f4f4f4;
  }
  .footer-desc {
    font-size: 20px;
    color: #333;
    margin-bottom: 12px;
  }
  .footer-date {
    font-size: 24px;
    color: #999;
  }
}
</style>
