<template>
  <div class="activity" :style="datas.style">
    <div class="active_top">
      <img :src="datas.bgImg" alt>
    </div>
    <div class="active_mid">
      <p class="title">
        <i></i>风景民宿
        <i></i>
      </p>
      <com-list :listData="datas.listObj"></com-list>
    </div>
    <div class="active_foot" @click="moreHome">
      查看更多房型
      <van-icon name="arrow"/>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import comList from "@/components/comList.vue"; //列表
import { getActivity, getActivityList } from "../../api/api";
export default {
  name: "message",
  data() {
    return {
      datas: {
        style: {
          backgroundColor: ""
        },
        cityName: "",
        bgImg: "",
        listObj: {
          score: false,
          comment: false,
          items: []
        }
      }
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   window.document.body.style.backgroundColor = "#abe3fc";
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   window.document.body.style.backgroundColor = "";
  //   next();
  // },
  components: {
    comList
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 获取广告图片
      let par = {
        dicTypeId: 5,
        cityName: ""
      };
      getActivity(par).then(res => {
        if (res.respCode === "2000") {
          this.datas.bgImg = res.respData[0].adImg;
          this.datas.style.backgroundColor = res.respData[0].bgColor
            ? res.respData[0].bgColor
            : "#abe3fc";
          this.datas.cityName = res.respData[0].remark
            ? res.respData[0].remark
            : "杭州";
        }
      });
      // 获取活动列表
      let pars = {
        dicTypeId: 6,
        cityName: ""
      };
      getActivityList(pars).then(res => {
        if (res.respCode === "2000") {
          this.datas.listObj.items = res.respData;
        }
      });
    },
    moreHome() {
      let cityName = this.datas.cityName;
      wx.miniProgram.navigateTo({
        appid: "wxf5117571de54e8a4",
        url: `/pages/search/search?city=${cityName}`
      });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped="scoped" lang="scss">
.activity {
  width: 100%;
  padding-bottom: 0.5rem;
  .active_top {
    width: 100%;
    height: 785px;
    img {
      width: 100%;
      height: 100%;
    }
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
