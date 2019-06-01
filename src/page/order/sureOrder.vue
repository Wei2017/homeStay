<template>
  <div class="surOrder">
    <div class="top">
      <span>
        <img src="/static/img/sure-time-icon.png" alt>
      </span>
      <p>等待确认</p>
      <div>订单确认中，您可以联系房东询问进度</div>
    </div>
    <div class="detail">
      <div>
        <h3>杭州西湖边的名人别墅，每幢价值超亿元，有些可以免费参观</h3>
        <p>2019.04.07 — 2019.04.10(共3晚)</p>
      </div>
      <span>
        详情
        <van-icon name="arrow"/>
      </span>
    </div>
    <div class="progress">
      <p>与房东联系(询问进度)</p>
      <span>
        联系
        <van-icon name="arrow"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "surOrder",
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
