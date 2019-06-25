<template>
  <div class="detail" v-if="details">
    <!-- 背景图 -->
    <div class="detail-top">
      <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="(img,index) in details.rImgList" :key="index">
          <img :src="img.imgUrl" alt>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
      <div class="bgBtn">
        <span style="display:none;">
          <i></i>视频
        </span>
        <span>图片</span>
      </div>
      <div class="collection">
        <img
          @click="addStore"
          :src="details.isCollectRoom === 0 ? '/static/img/collection-icon.png' : '/static/img/collection-checked.png'"
          alt
        >
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="detail-con">
      <!-- 详情 -->
      <div class="title-detail">
        <h2>{{details.roomMainInfo.roomName}}</h2>
        <div class="title-con">
          <div>
            <span>{{details.roomMainInfo.rBasicDesA}}</span>
            <span>{{details.roomMainInfo.rBasicDesB}}</span>
          </div>
          <div>
            <span>{{details.roomMainInfo.rBasicDesC}}</span>
            <span>{{details.roomMainInfo.rBasicDesD}}</span>
          </div>
          <div>
            <span>{{details.roomMainInfo.rBasicDesE}}</span>
            <span>{{details.roomMainInfo.rBasicDesF}}</span>
          </div>
        </div>
      </div>
      <!-- 全部评论 -->
      <div class="hotel-comment details-com">
        <div class="title">
          <h3>客房点评</h3>
          <span @click="jumpComment">
            全部评论({{details.roomEvaluateCount}})
            <van-icon name="arrow"/>
          </span>
        </div>
        <div class="comment-con" v-if="details.roomEvaluate">
          <div class="top-con">
            <div>
              <img :src="details.roomEvaluate.userHeadImg" alt>
            </div>
            <div>
              <p>{{details.roomEvaluate.userName}}</p>
              <p>{{details.roomEvaluate.updateTime}} 入住</p>
            </div>
          </div>
          <div class="descript">{{details.roomEvaluate.userEvaluate}}</div>
        </div>
      </div>
      <!-- 房屋描述 -->
      <div class="hotel-descript details-com">
        <div class="title">
          <h3>房屋描述</h3>
          <span @click="clickMoreDetail">{{openHeiState}}</span>
        </div>
        <div class="content" ref="hotelDesCon">{{details.roomAccM.roomDes}}</div>
      </div>
      <!-- 房屋位置 -->
      <div class="hotel-position details-com">
        <div class="title">
          <h3>房屋位置</h3>
        </div>
        <baidu-map
          class="bm-view"
          :center="mapData.center"
          :zoom="mapData.zoom"
          :scroll-wheel-zoom="true"
          @ready="handler"
          ak="288jpGDll3P7KGTcENGEboLzqFWPImSG"
        >
          <!-- :icon="{url: '/static/img/map_mark.png', size: {width: 53, height: 53}}" -->
          <bm-marker
            :position="mapData.center"
            :dragging="true"
            animation="BMAP_ANIMATION_BOUNCE"
            :zIndex="999"
          >
            <bm-label
              :content="mapData.address"
              :labelStyle="mapData.labelStyle"
              :offset="{width: -20, height: 60}"
            />
          </bm-marker>
        </baidu-map>
        <div class="descript">{{details.roomAccM.roomPositionDes}}</div>
      </div>
      <!-- 配套设备 -->
      <div class="hotel-device details-com">
        <div class="title">
          <h3>配套设备</h3>
          <span @click="jumpHotlDevice">
            查看更多
            <van-icon name="arrow"/>
          </span>
        </div>
        <div class="content">
          <div class="list" v-for="(ptList,ptInx) in details.roomServerMain" :key="ptInx">
            <div class="lf-con">
              <i></i>
              <span>{{ptInx}}</span>
            </div>
            <div class="rg-con">
              <span v-for="(ptItem,itemInx) in ptList" :key="itemInx" v-if="itemInx < 4">
                <van-icon v-if="ptItem.keyDes === '1'" name="checked"/>
                <van-icon v-else name="clear" class="clearIcon"/>
                {{ptItem.keyOption}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 预定须知 -->
      <div class="reserv-notice details-com">
        <div class="title">
          <h3>预定须知</h3>
        </div>
        <div class="content">
          <div v-for="(ydItem,ydInx) in details.orderNeedKnow" :key="ydInx">
            <h4>{{ydInx}}</h4>
            <p :class="[ydInx == '发票' ? 'invoice' :'']">{{ydItem}}</p>
          </div>
        </div>
      </div>
      <div class="checkin-notice details-com">
        <div class="title">
          <h3>入住须知</h3>
        </div>
        <div class="content">
          <p v-for="(rzItem,rzInx) in details.stayInNeedKnow" :key="rzInx">
            <span>{{rzInx}}</span>
            <b>{{rzItem}}</b>
          </p>
        </div>
      </div>
      <!-- 额外费用 -->
      <div class="other-cost details-com">
        <div class="title">
          <h3>额外费用</h3>
        </div>
        <div class="content">
          <p v-for="(ewItem,ewInx) in details.extFee" :key="ewInx">
            <span>{{ewInx}}:</span>
            <b>{{ewItem}}</b>
          </p>
        </div>
      </div>
      <!-- 价格说明 -->
      <div class="price-explain details-com">
        <div class="title">
          <h3>预定须知</h3>
        </div>
        <div class="descript">{{details.roomAccM.roomDes}}</div>
      </div>
      <div class="hotel-number">
        <span>乐居 放心租</span>
        <span>房屋编号: {{details.roomMainInfo.roomAccId}}</span>
      </div>
    </div>
    <!-- 底部 -->
    <div class="detail-footer">
      <div @click="jumpFd">
        <img :src="details.roomMainInfo.accHeadImg" alt>
        <span>房东</span>
      </div>
      <div>
        <img src="/static/img/detail_tel.png" alt>
        <span>电话<a :href="'tel:' + details.servicePhone"></a></span>
      </div>
      <div class="btn" @click="sureOrder">
        <span>￥{{details.roomMainInfo.selDatePrice}}</span>
        <em
          v-if="details.roomMainInfo.selDatePrice < details.roomMainInfo.basicPrice"
        >￥{{details.roomMainInfo.basicPrice}}</em>
        <span>立即预定</span>
      </div>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import { BmMarker, BmLabel } from "vue-baidu-map";
import { homeDetail, addStoreHome } from "../../api/api";
export default {
  name: "detail",
  data() {
    return {
      delId: this.$route.query.delId,
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationType: "fraction"
      },
      details: null,
      openHeiState: "展开",
      mapData: {}
    };
  },
  components: {
    BaiduMap,
    BmMarker,
    BmLabel
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let userid = localStorage.getItem("userId");
      homeDetail(this.delId, userid).then(res => {
        if (res.respCode === "2000") {
          this.details = res.respData;
          let mark = res.respData.roomMainInfo;
          this.mapData = {
            center: {
              lng: mark.raddrGPSPoint.split(",")[0],
              lat: mark.raddrGPSPoint.split(",")[1]
            },
            zoom: 15,
            address: mark.rAddrStreet,
            labelStyle: {
              color: "#000",
              fontSize: "14px",
              padding: "5px 10px",
              border: "none"
            }
          };
        }
      });
    },
    handler({ BMap, map }) {
      console.log(BMap, map);
    },
    // 收藏
    addStore() {
      let par = {
        optype: 2,
        roomaccid: this.delId,
        userid: localStorage.getItem("userId")
      };
      if (this.details.isCollectRoom === 0) {
        addStoreHome("UserViewCollect/AddUserViewCollect", par).then(res => {
          if (res.respCode === "2000") {
            this.$toast(res.respMsg);
            this.details.isCollectRoom = 1;
          } else {
            this.$toast(res.respMsg);
          }
        });
      } else {
        let pars = {
          roomaccid: this.delId,
          userid: localStorage.getItem("userId")
        };
        addStoreHome("UserViewCollect/CancelUserCollect", pars).then(res => {
          if (res.respCode === "2000") {
            this.$toast(res.respMsg);
            this.details.isCollectRoom = 0;
          } else {
            this.$toast(res.respMsg);
          }
        });
      }
    },
    // 展开更多
    clickMoreDetail() {
      let con = this.$refs.hotelDesCon;
      if (this.openHeiState === "收起") {
        this.openHeiState = "展开";
        con.style.overflo = "visible";
        con.style.height = "auto";
      } else {
        this.openHeiState = "收起";
        con.style.overflo = "hidden";
        con.style.height = "2.666667rem";
      }
    },
    //查看全部客房点评
    jumpComment() {
      this.$router.push({
        path: "/commentList",
        query: {
          delId: this.delId
        }
      });
    },
    // 查看更多配套设施
    jumpHotlDevice() {
      this.$router.push({
        path: "/hotelDevice",
        query: {
          delId: this.delId
        }
      });
    },
    // 开具发票
    jumpInvoice() {},
    // 房东印象
    jumpFd() {
      this.$router.push({
        path: "/fdImpress",
        query: {
          accountId: this.details.roomMainInfo.accountId
        }
      });
    },
    // 立即预定
    sureOrder() {
      this.$router.push({
        path: "/fillOrder",
        query: {
          delId: this.delId
        }
      });
    }
  },
  computed: {},
  watch: {
    delId() {
      console.log(this.delId);
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
.detail {
  height: auto;
  .detail-top {
    height: 515px;
    position: relative;

    .swiper-container {
      height: 100%;

      .swiper-slide {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    /deep/ .swiper-pagination-fraction {
      left: unset;
      right: 20px;
      width: unset !important;
      background: #a7a9ac;
      opacity: 0.9;
      border-radius: 25px;
      padding: 10px 20px;
      color: #fff;
      font-size: 20px;
      bottom: 65px;
    }

    .bgBtn {
      position: absolute;
      bottom: 65px;
      z-index: 99;
      width: 100%;
      text-align: center;

      span {
        color: #000;
        font-size: 24px;
        padding: 13px 35px;
        background: #ffd43f;
        border-radius: 50px;
      }

      span:nth-child(1) {
        background: #fff;
        margin-right: 20px;
        opacity: 0.7;

        i {
          display: inline-block;
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-left: 10px solid #000;
          border-bottom: 10px solid transparent;
          font-size: 0;
          line-height: 0;
          margin-right: 7px;
        }
      }
    }
    .collection {
      position: absolute;
      top: 4%;
      right: 7%;
      width: 30px;
      height: 30px;
      z-index: 9;
      img {
        display: block;
      }
    }
  }

  .detail-con {
    border-radius: 15px;
    margin-top: -40px;
    min-height: 500px;
    position: absolute;
    background: #fff;
    border-radius: 55px 55px 0 0;
    width: 100%;
    z-index: 9;

    > div {
      padding: 20px;
      border-bottom: 1px solid #f0f0f8;
    }

    .title-detail {
      h2 {
        font-size: 48px;
        padding: 15px 10px;
      }

      .title-con {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        margin: 35px 0;

        > div {
          width: 30%;

          span {
            font-size: 24px;
            color: #000;
            display: block;
          }

          span:nth-child(2) {
            font-size: 20px;
            color: #999;
            margin-top: 10px;
          }
        }
      }
    }

    .details-com {
      padding: 20px;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 0;

        h3 {
          font-size: 36px;
          color: #000;
        }

        span {
          font-size: 24px;
          color: #999;

          /deep/ .van-icon {
            color: #999;
            margin-left: 10px;
          }
        }
      }

      .content {
        margin-bottom: 15px;
      }
    }

    .hotel-comment {
      .comment-con {
        padding: 10px 0;

        .top-con {
          display: flex;
          align-items: center;

          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }

          div:nth-child(2) {
            margin-left: 15px;

            p {
              font-size: 24px;
              color: #000;
            }

            p:nth-child(2) {
              color: #999;
              margin-top: 5px;
            }
          }
        }

        .descript {
          font-size: 24px;
          color: #999;
          line-height: 0.6rem;
          padding: 25px 10px;
        }
      }
    }

    .hotel-descript {
      .content {
        color: #999;
        font-size: 24px;
        line-height: 0.6rem;
        padding: 10px 0;
        height: 200px;
        overflow: hidden;
      }
    }

    .hotel-position {
      padding: 0;

      .title {
        padding: 20px;
      }

      .bm-view {
        width: 100%;
        height: 420px;
      }

      .descript {
        padding: 30px 20px;
        margin-bottom: 15px;
        color: #999;
        font-size: 24px;
        line-height: 0.5rem;
      }
    }

    .hotel-device {
      .list {
        padding: 50px 25px;
        display: flex;
        align-items: center;
        // justify-content: space-around;
        flex-direction: row;

        .lf-con {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 65px;
          white-space: nowrap;
          i {
            width: 0;
            height: 0;
            border-width: 19px 16px 0;
            border-style: solid;
            border-color: #ffd43f transparent transparent;
            /*灰 透明 透明 */
            margin: 10px auto;
            position: relative;
          }

          span {
            font-size: 18px;
          }
        }

        .rg-con {
          width: 390px;
          line-height: 40px;
          flex-wrap: wrap;
          justify-content: space-between;
          span {
            // max-width: 200px;
            // margin: 0 30px;
            width: 2.5rem;
            // white-space: nowrap;
            line-height: 60px;
            display: inline-block;
            white-space: nowrap;
            // display: flex;
            // flex-direction: row;
            // align-items: center;

            i {
              color: #ffd33d;
              font-size: 18px;
              margin-right: 14px;
            }
          }

          span {
            .clearIcon {
              color: #b2b2b2;
            }
          }
        }
      }
    }

    .reserv-notice {
      .content {
        padding: 15px 0;

        > div {
          padding: 15px 5px;

          h4 {
            font-size: 24px;
            color: #000;
          }

          p {
            font-size: 24px;
            color: #999;
            padding: 15px 0;
          }

          p.invoice {
            color: #ffd43f;
            cursor: pointer;
          }
        }
      }
    }

    .checkin-notice {
      .content {
        padding: 10px;

        p {
          padding: 15px 0;

          span {
            font-size: 24px;
            color: #999;
            display: inline-block;
            margin-right: 65px;
          }

          b {
            font-size: 24px;
            color: #000;
            font-weight: normal;
          }
        }
      }
    }

    .other-cost {
      .content {
        p {
          padding: 8px 2px;
          display: flex;

          span {
            font-size: 24px;
            color: #999;
            display: inline-block;
            margin-right: 25px;
            white-space: nowrap;
          }

          b {
            font-weight: normal;
            color: #000;
            font-size: 24px;
            line-height: 0.6rem;
          }
        }
      }
    }

    .price-explain {
      background: #f0f0f8;

      .descript {
        padding: 15px 15px 115px;
        line-height: 0.6rem;
        font-size: 24px;
        color: #999;
      }
    }

    .hotel-number {
      padding: 35px 20px 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span:nth-child(1) {
        font-size: 24px;
        color: #ffd33d;
        padding-left: 30px;
        background: url("/static/img/detail_lo.png") no-repeat left center;
        background-size: 24px 28px;
      }

      span:nth-child(2) {
        font-size: 20px;
        color: #999;
      }
    }
  }

  .detail-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e9e9e9;
    background: #fff;
    width: 100%;
    height: 110px;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: space-around;

    > div {
      span {
        color: #000;
        display: inline-block;
        margin-top: 10px;
        font-size: 24px;
      }
    }

    div:nth-child(1) {
      display: flex;
      align-items: center;
      flex-flow: column;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }

    div:nth-child(2) {
      display: flex;
      align-items: center;
      flex-flow: column;

      img {
        width: 30px;
        height: 30px;
      }
    }

    div.btn {
      padding: 12px 27px;
      background: #ffd544;
      border-radius: 50px;

      span {
        color: #000;
        font-size: 36px;
        margin-top: 0;
      }

      em {
        font-size: 24px;
        text-decoration: line-through;
        font-style: normal;
        margin-left: 5px;
      }

      span:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>
