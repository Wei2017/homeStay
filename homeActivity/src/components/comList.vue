<template>
  <div class="list-hotel">
    <div
      class="lists"
      v-for="(item,index) in listObj.items"
      :key="index"
      @click="jumpDetail(item.id)"
    >
      <div class="list-top">
        <img :src="item.roomImg" alt>
      </div>
      <div class="list-bottom">
        <h3 class="title">{{item.roomName}}</h3>
        <div>
          <span>{{item.roomDes}}</span>
          <!-- <span>2居2床4人</span> -->
          <span v-show="listObj.score">4.6评分</span>
          <span v-show="listObj.comment">52点评</span>
        </div>
        <p class="price">
          <span>￥{{item.selDatePrice}}</span>
          <em>￥{{item.basicPrice}}</em>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  name: "listHotel",
  data() {
    return {
      listObj: {}
    };
  },
  props: {
    listData: Object
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.listObj = this.listData;
    },
    jumpDetail(id) {
      console.log(wx);
      wx.miniProgram.navigateTo({
        appid: "wxf5117571de54e8a4",
        url: `/pages/housingDetails/housingDetails?id=${id}`
      });

      // window.scrollTo(0, 0);
    }
  },
  computed: {},
  watch: {
    listData: {
      handler() {
        this.init();
      },
      deep: true
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
@import "../assets/css/list.scss";
.list-hotel {
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .lists {
    padding: 28px 0;
    width: 322px;
    .list-top {
      width: 100%;
      height: 215px;
    }
  }
}
</style>
