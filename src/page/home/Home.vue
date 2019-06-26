<template>
  <div class="home">
    <div class="head-bg">
      <swiper :options="swiperOption" class="swiper" ref="mySwiper" v-if="datas.bannerImg.length">
        <swiper-slide
          v-for="(bgItem,index) in datas.bannerImg"
          :key="index"
          :data-jumpUrl="bgItem.adUrl"
        >
          <span>
            <img :src="bgItem.adImg" alt>
          </span>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <div class="search">
      <div class="location" @click="jumpLocation">
        <span>{{cityName}}</span>
      </div>
      <div class="text" @click="jumpSearchDic">
        <input type="text" v-model="searchKey" placeholder="位置/房源/关键字">
        <span>
          <van-icon name="arrow"/>
        </span>
      </div>
      <div class="searchBtn">
        <span @click="searchStart">开始搜索</span>
      </div>
    </div>
    <div class="goodHotel listCon">
      <div class="title">
        <h1>
          精选推荐
          <i></i>
        </h1>
        <span>住进超人气</span>
      </div>
      <good-list :listData="goodList"></good-list>
    </div>
    <div class="hotHotel listCon">
      <div class="title">
        <h1>
          热门入住
          <i></i>
        </h1>
        <span>住进超人气</span>
        <com-list :listData="hotList"></com-list>
      </div>
    </div>
    <div class="hom-footer">
      <img :src="datas.footImg.adImg" alt @click="bannerJump(datas.footImg.adUrl)">
    </div>
  </div>
</template>

<script>
import goodList from "./components/goodList";
import comList from "@/components/comList.vue"; //列表
import { Swipe, SwipeItem } from "vant";
import { homeGetAdList, getRoomList } from "../../api/api";
import { mapState } from 'vuex'
export default {
  name: "Home",
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        autoplay: 3000,
        loop: true,
        observer: true,
        onClick: (swiper, event) => {
          let length = this.datas.bannerImg.length;
          var index = Math.abs(
            (this.$refs.mySwiper.swiper.activeIndex - 1) % length
          );
          let url = this.datas.bannerImg[index].adUrl;
          location.href = url;
          this.$router.push({
            path: "/activity"
          });
        }
      },
      datas: {
				cityName: '',
				seachText: "",
        bannerImg: [],
        footImg: {}
      },
      goodList: {
        score: false,
        comment: false,
        items: []
      },
      hotList: {
        score: false,
        comment: false,
        items: []
      }
    };
  },
  components: {
    goodList,
    comList,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getBgList();
    },
    // 获取首页轮播图片-底部广告图片
    getBgList() {
      // 首页轮播图
      homeGetAdList(1, "").then(res => {
        if (res.respCode === "2000") {
          this.datas.bannerImg = res.respData;
        }
      });
      // 底部广告
      homeGetAdList(2, "").then(res => {
        if (res.respCode === "2000") {
          this.datas.footImg = res.respData[0];
        }
      });
      // 精品推荐
      getRoomList(3, "").then(res => {
        if (res.respCode === "2000") {
          this.goodList.items = res.respData;
        }
      });
      // 热门入住
      getRoomList(4, "").then(res => {
        if (res.respCode === "2000") {
          this.hotList.items = res.respData;
        }
      });
    },
    bannerJump(url) {
      window.location.href = url;
    },
		// 开始搜索
		searchStart() {
		  this.$router.push({ path: "/searchList" });
		},
		// 选择位置
		jumpSearchDic(){
			this.$router.push({
			  path: "/searchDic",
			});
		},
		// 选择城市
		jumpLocation() {
		  this.$router.push({
		    path: "/citySelect"
		  });
		}
  },
  computed: {
		...mapState({
			cityName:state => state.cityName,
			searchKey:state => state.searchKey
		})
	},
  watch: {
		
	}
};
</script>

<style scoped="scoped" lang="scss">
.home {
  padding-bottom: 2rem;
  position: relative;

  .head-bg {
    width: 100%;
    position: relative;
    // height: 456px;

    .swiper-wrapper {
      height: 100%;

      .swiper-slide {
        span {
          display: block;
          width: 100%;
          height: 100%;

          img {
            width: 100%;
            height: 100%;
            border-radius: 0 0 80px 80px;
          }
        }
      }
    }

    /deep/ .swiper-pagination {
      bottom: 155px !important;
      left: 50%;
      transform: translateX(-50%);
    }

    /deep/ .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      opacity: 1;
      background: #fff;
      margin: 0 7px;
    }

    /deep/ .swiper-pagination-bullet-active {
      width: 16px;
      height: 10px;
      opacity: 1;
      background: #f8ce3c;
    }
  }
	
	.search {
		position: absolute;
		top: 385px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9;
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
  .goodHotel {
    margin: 0 0 0 40px;
    padding-top: 260px;
  }

  .hotHotel {
    margin: 0 40px;
  }

  .listCon {
    .title {
      h1 {
        font-size: 46px;
        position: relative;
        z-index: 9;

        i {
          position: absolute;
          width: 95px;
          height: 17px;
          display: block;
          background: #ffd33b;
          bottom: 1px;
          left: 0;
          opacity: 0.7;
        }
      }

      span {
        font-size: 22px;
        color: #999;
        padding: 5px 0;
      }
    }
  }

  .hom-footer {
    height: 205px;
    margin: 40px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
}
</style>
