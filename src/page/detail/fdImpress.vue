<template>
  <div class="fdImpress">
    <div class="fdMsg">
      <div class="lf-msg">
        <h3>你好，我是</h3>
        <span>{{obj.userName}}</span>
        <em>欢迎您的到来</em>
      </div>
      <div class="rg-msg">
        <img :src="obj.userImg" alt>
      </div>
    </div>
    <div class="msg-con">
      <div class="img">
        <img src="/static/img/smile.png" alt>
      </div>
      <p>{{obj.content}}</p>
      <div class="testMsg">
        <h3>已验证信息</h3>
        <p>注册时间：{{obj.registerTime}}</p>
        <p class="trueFlag">已实名认证</p>
        <p class="phone">手机号</p>
      </div>
    </div>
    <div class="fdBottom">
      <ul>
        <li :class="{active:obj.activeInx===0}" @click="changeNav(0)">
          上架房源
          <em>(59)</em>
        </li>
        <li :class="{active:obj.activeInx===1}" @click="changeNav(1)">
          客房点评
          <em>(59)</em>
        </li>
      </ul>
      <div class="con">
        <div v-if="obj.activeInx===0">
          <com-list :listData="obj.hotelsObj"></com-list>
        </div>
        <div v-else>客房评价</div>
      </div>
    </div>
  </div>
</template>

<script>
import comList from "@/components/comList.vue"; //列表
export default {
  name: "fdImpress",
  data() {
    return {
      obj: {
        userName: "kun昆明百合楼",
        userImg: "/static/img/footer-img@2x.png",
        content:
          "房东在杭州居住生活了近二十年,可以为来杭旅游的住客提供细致的旅游指南和小吃指南,带你走街窜巷,像个本地人一样品尝最地道的杭州特色小吃｡",
        registerTime: "2016年7月",
        activeInx: 0,
        hotelsObj: {
          score: false,
          comment: false,
          items: []
        }
      }
    };
  },
  components: {
    comList
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getHotels();
    },
    // 上架房源
    getHotels() {
      this.obj.hotelsObj.items = [
        {
          img: "/static/img/ms-lb.png",
          title: "宿州别墅",
          yPrice: 244,
          nPrice: 263,
          id: 3
        },
        {
          img: "/static/img/ms-lb.png",
          title: "宿州别墅",
          yPrice: 244,
          nPrice: 263,
          id: 3
        }
      ];
    },
    // 上架房源/客房评价 切换
    changeNav(index) {
      this.obj.activeInx = index;
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.fdImpress {
  padding-bottom: 1rem;
  .fdMsg {
    padding: 68px 42px 55px 82px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .lf-msg {
      h3,
      span {
        font-size: 36px;
      }

      span {
        color: rgb(255, 211, 59);
        margin: 3px 0;
        display: block;
      }

      em {
        display: block;
        font-style: normal;
        font-size: 20px;
        color: #999;
      }
    }

    .rg-msg {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .msg-con {
    margin: 0 auto;
    width: 80%;
    min-height: 700px;
    border-radius: 30px;
    background: #fff;
    padding: 45px 30px 0;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

    .img {
      width: 68px;
      height: 57px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    > p {
      font-size: 30px;
      color: #666;
      line-height: 45px;
      padding: 30px 0;
    }
    .testMsg {
      padding: 15px 0;
      h3 {
        font-size: 36px;
        padding: 30px 10px;
      }
      p {
        padding: 30px 50px;
        border-top: 1px solid #f0f0f8;
        background: url("/static/img/time-icon.png") no-repeat 5px center;
        background-size: 30px 30px;
        font-size: 24px;
        color: #666;
      }
      p.trueFlag {
        background: url("/static/img/shi-name-icon.png") no-repeat 5px center;
        background-size: 33px 29px;
      }
      p.phone {
        background: url("/static/img/phone-icon.png") no-repeat 5px center;
        background-size: 22px 32px;
      }
    }
  }
  .fdBottom {
    margin: 45px 20px;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid #f0f0f8;
      // padding: 15px 0 30px;
      li {
        padding: 30px 20px;
        font-size: 36px;
        border-bottom: 1px solid transparent;
        em {
          font-style: normal;
          color: #999;
          font-size: 24px;
          margin-left: 10px;
        }
      }
      li.active {
        border-bottom: 1px solid #ffd544;
        color: #ffd544;
      }
    }
    /deep/ .con {
      .lists {
        width: 660px;
        .list-top {
          height: 438px;
        }
      }
    }
  }
}
</style>
