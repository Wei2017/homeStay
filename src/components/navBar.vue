<template>
  <van-tabbar route v-model="active" :z-index="99999">
    <van-tabbar-item
      v-for="(item,index) in tabList"
      :to="item.path"
      :icon="item.icon"
      :key="index"
      @click="tab(index,item.path)"
    >{{item.tabTitle}}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "navBar",
  data() {
    return {
      active: 0,
      tabList: [
        {
          tabTitle: "首页",
          icon: "",
          path: "/home"
        },
        {
          tabTitle: "订单",
          icon: "",
          path: "/order"
        },
        {
          tabTitle: "消息",
          icon: "",
          path: "/msg"
        },
        {
          tabTitle: "我的",
          icon: "",
          path: "/me"
        }
      ]
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.active = parseInt(sessionStorage.getItem("navInx"));
    },
    tab(index, val) {
      sessionStorage.setItem("navInx", index);
      this.$router.push({
        path: val
      });
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="stylus">
.van-tabbar {
  height: 97px;
  margin-top: 0;
  border-bottom: none;
  border-top: 1px solid #cccccc;

  /deep/ .van-tabbar-item {
    font-size: 24px;
    color: #000;
  }

  /deep/ .van-tabbar-item__icon {
    i {
      font-size: 35px;
    }
  }

  /deep/ .tabbar-nav {
    font-size: 24px;
    color: #000;
  }

  /deep/ .van-tabbar-item--active {
    color: #ffd33b !important;
    font-size: 24px;
  }
}
</style>
