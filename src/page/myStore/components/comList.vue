<template>
  <div class="list-hotel">
    <div
      class="lists"
      v-for="(item,index) in listObj.items"
      :key="index"
      @click="jumpDetail(item.roomAccId)"
    >
			<div class="collection">
			  <img
			    @click.stop="addStore(item.roomAccId)"
			    :src="item.isCollectRoom === 0 ? '/static/img/collection-icon.png' : '/static/img/collection-checked.png'"
			    alt
			  >
			</div>
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
    jumpDetail(roomAccId) {
      this.$router.push({
        path: "/detail",
        query: { delId: roomAccId }
      });
      window.scrollTo(0, 0);
    },
		addStore(id){
			this.$emit('storeChange',id)
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
@import "../../../assets/css/list.scss";
.list-hotel {
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .lists {
		position: relative;
    padding: 28px 0;
    width: 322px;
		.collection {
		  position: absolute;
		  top: 6%;
		  right: 8%;
		  width: 30px;
		  height: 30px;
		  z-index: 9;
		  img {
		    display: block;
				cursor: pointer;
		  }
		}
    .list-top {
      width: 100%;
      height: 215px;
    }
  }
}
</style>
