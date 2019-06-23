<template>
  <div class="activity">
    <div class="active_top"></div>
    <div class="active_mid">
      <p class="title">
        <i></i>风景民宿
        <i></i>
      </p>
      <com-list :listData="datas.listObj"></com-list>
    </div>
    <div class="active_foot">
      查看更多房型
      <van-icon name="arrow"/>
    </div>
  </div>
</template>

<script>
import comList from "@/components/comList.vue"; //列表
export default {
  name: "activity",
  data() {
    return {
      datas: {
        listObj: {
          score: false,
          comment: false,
          items: [
            {
              id: 1,
              roomImg: "/static/img/footer-img@2x.png",
              roomName: "杭州千岛湖",
              roomDes: "经济",
              selDatePrice: "200",
              basicPrice: "230"
            },
            {
              id: 2,
              roomImg: "/static/img/footer-img@2x.png",
              roomName: "千岛湖",
              roomDes: "经济",
              selDatePrice: "200",
              basicPrice: "230"
            },
            {
              id: 3,
              roomImg: "/static/img/footer-img@2x.png",
              roomName: "杭州千岛湖",
              roomDes: "经济",
              selDatePrice: "200",
              basicPrice: "230"
            }
          ]
        }
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#abe3fc";
    next();
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "";
    next();
  },
  components: {
    comList
  },
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
.activity {
  width: 100%;
  .active_top {
    width: 100%;
    height: 785px;
    background: url("/static/img/activity/bg_img.png") no-repeat;
    background-size: cover;
  }
  .active_mid {
    padding: 0 35px;
    .title {
      padding: 30px 0;
      color: #fff;
      font-size: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        margin: 0 18px;
      }
    }
    /deep/ .lists {
      background: #fff;
      border-radius: 12px;
      padding: 0;
      margin-bottom: 30px;
      .list-bottom {
        text-align: center;
      }
    }
  }
  .active_foot {
    width: 420px;
    margin: 50px auto;
    height: 68px;
    line-height: 68px;
    border-radius: 50px;
    background: #f18561;
    text-align: center;
    font-size: 33px;
    color: #fff;
    /deep/ .van-icon {
      font-size: 26px;
      margin-top: 5px;
    }
  }
}
</style>
