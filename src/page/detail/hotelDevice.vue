<template>
  <div class="hotelDevice">
    <div class="content">
      <div class="list" v-for="(item,index) in deviceItems" :key="index">
        <h3>{{index}}</h3>
        <div class="list-con">
          <span v-for="(cItem,cInx) in item" :key="cInx" :class="{'clear' : cItem.keyDes === '1'}">
            <em>{{cItem.keyOption}}</em>
            <van-icon v-if="cItem.keyDes === '1'" name="checked"/>
            <van-icon v-else name="clear"/>
          </span>
        </div>
      </div>
    </div>
    <div class="closeDevice">
      <van-icon @click="closeDevice" name="cross"/>
    </div>
  </div>
</template>

<script>
import { getRoomServiceList } from "../../api/api";
export default {
  name: "hotelDevice",
  data() {
    return {
      deviceItems: null
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getRoomServiceList(this.$route.query.delId).then(res => {
        if (res.respCode === "2000") {
          this.deviceItems = res.respData;
        }
      });
    },
    closeDevice() {
      this.$router.go(-1);
    }
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.hotelDevice {
  .list {
    padding: 20px;
    border-bottom: 1px solid #f0f0f8;
    h3 {
      font-size: 30px;
      padding: 10px 0;
    }
    .list-con {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 35px;
      span {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 20px 20px 0;
        em {
          font-size: 24px;
          padding: 15px 35px;
          border-radius: 35px;
          font-style: normal;
          background: #f0f0f8;
          margin-bottom: 8px;
        }
        i {
          font-size: 12px;
          color: #ffd43f;
        }
      }
      span.clear {
        em {
          color: #b2b2b2;
        }
        i {
          color: #b2b2b2;
        }
      }
    }
  }
  .content {
    min-height: 700px;
    .list:last-child {
      border-bottom: none;
    }
  }
  .closeDevice {
    font-size: 40px;
    color: #999;
    text-align: center;
    margin: 80px 0;
    i {
      padding: 10px;
    }
  }
}
</style>
