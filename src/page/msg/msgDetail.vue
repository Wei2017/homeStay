<template>
  <div class="msgDetail">
    <div class="title">
      <h3>订单预定成功</h3>
      <span>2019-05-22 17:55</span>
    </div>
    <div class="con">房东在杭州居住生活了近二十年，可以为来杭州旅游的住客提供细致的旅游指南和小吃指南，带你走街串巷</div>
  </div>
</template>

<script>
export default {
  name: "msgDetail",
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.msgDetail {
  padding: 30px 63px;
  .title {
    margin: 20px 0 60px 0;
    h3 {
      font-size: 36px;
    }
    span {
      font-size: 24px;
      color: #999;
      display: block;
      margin-top: 10px;
    }
  }
  .con {
    font-size: 30px;
    color: #666;
    line-height: 0.6rem;
    padding: 0 5px;
  }
}
</style>
