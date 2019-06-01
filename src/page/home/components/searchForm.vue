<template>
  <div class="search">
    <div class="location">
      <span>{{datas.location}}</span>
    </div>
    <div class="text">
      <input type="text" v-model="datas.seachText" placeholder="位置/房源/关键字">
      <span>
        <van-icon name="arrow"/>
      </span>
    </div>
    <div class="searchBtn">
      <span @click="searchStart">开始搜索</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      datas: {
        location: "杭州",
        seachText: ""
      }
    };
  },
  components: {},
  mounted() {},
  methods: {
    // 开始搜索
    searchStart() {
      this.$router.push({
        path: "/searchList",
        query: {}
      });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.search {
  height: 285px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 1px 10px #999;
  padding: 20px 35px;
  > div {
    height: 82px;
    line-height: 82px;
    padding: 0 10px;
  }
  .location {
    border-bottom: 1px solid #e9e9e9;
    padding-left: 28px;
    background: url("/static/img/location-icon@2x.png") no-repeat left center;
    background-size: 17px 21px;
    font-size: 30px;
  }
  .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      width: 100px;
      text-align: right;
      cursor: pointer;
      /deep/ .van-icon {
        color: #999;
        font-size: 24px;
      }
    }
  }
  .searchBtn {
    height: 76px;
    line-height: 76px;
    margin: 20px auto;
    background: -webkit-linear-gradient(left, #ffe794, #ffd33b);
    border-radius: 50px;
    span {
      display: block;
      width: 585px;
      text-align: center;
      font-size: 36px;
    }
  }
}
</style>
