<template>
  <div class="comment">
    <div class="list" v-for="(item,index) in listObj.items" :key="index">
        <div class="lf-con">
          <img :src="item.userHeadImg" alt>
        </div>
        <div class="rg-con">
          <div class="rg-con-top">
            <div>
              <span>{{item.userName}}</span>
              <em>{{item.updateTime}}入住</em>
            </div>
            <div>
              <span>{{item.userScore+'.0'}}</span>
              <van-rate v-model="item.userScore" readonly/>
            </div>
          </div>
          <div class="comment-con">
            <p :class="'pCon'+index">{{item.userEvaluate}}</p>
            <span @click="showMoreComment(index)" :class="'moreComment'+index">全文</span>
            <div class="comment-imgs">
              <span v-for="(img,inx) in item.userEImgs" :key="inx" @click="showImg(item.userEImgs)">
                <img :src="img" alt>
              </span>
            </div>
						<div v-show="listObj.replay">
							<div class="replay" v-if="item.accReply">
							  房东回复：
							  <span>{{item.accReply}}</span>
							</div>
						</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { ImagePreview, Rate } from "vant";
export default {
  name: "commentList",
  data() {
    return {
			datas:{
				imgConfig:''
			},
			listObj:{}
    };
  },
  props: {
    listData: Object
  },
  components: {
    [ImagePreview.name]: ImagePreview,
    [Rate.name]: Rate
  },
  mounted() {
		this.init()
  },
  methods: {
		init() {
		  this.listObj = this.listData;
		},
    // 查看全文
    showMoreComment(index) {
      let con = document.getElementsByClassName("moreComment" + index)[0];
      let p = document.getElementsByClassName("pCon" + index)[0];
      if (con.innerHTML === "全文") {
        con.innerHTML = "收起";
        p.style.height = "auto";
        p.style.overflow = "visible";
      } else {
        con.innerHTML = "全文";
        p.style.height = "1.07rem";
        p.style.overflow = "hidden";
      }
    },
    //查看图片
    showImg(imgs) {
      this.datas.imgConfig = ImagePreview(imgs)
			// 离开路由关闭大图
			this.$emit('closeImg',this.datas.imgConfig)
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
.comment {
  .list {
    display: flex;
    padding: 30px;

    .lf-con {
      margin: 10px 0 0 0;

      img {
        width: 54px;
        height: 54px;
        border-radius: 50%;
      }
    }

    .rg-con {
      .rg-con-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;

        > div {
          display: flex;
          flex-direction: column;
        }

        div:nth-child(1) {
          span {
            font-size: 24px;
          }

          em {
            font-size: 20px;
            color: #999;
            margin-top: 5px;
            font-style: normal;
          }
        }

        div:nth-child(2) {
          text-align: right;

          span {
            font-size: 30px;
            color: #999;
            fontfamily: "Arial-BoldMT";
            margin-bottom: 3px;
          }

          .van-rate {
            i {
              font-size: 22px !important;
            }
          }
        }
      }

      .comment-con {
        p {
          font-size: 24px;
          line-height: 40px;
          margin: 10px 0;
          height: 80px;
          overflow: hidden;
        }

        > span {
          font-size: 20px;
          color: rgb(255, 211, 59);
        }

        .comment-imgs {
          margin: 20px -5px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          span {
            width: 193px;
            height: 193px;
            margin: 10px;
            display: flex;
            align-items: center;

            img {
              width: 100%;
							height:100%;
            }
						
          }
        }

        .replay {
          background: #f4f4f5;
          padding: 20px;
          font-size: 24px;
          span {
            line-height: 36px;
            color: rgb(153, 153, 153);
          }
        }
      }
    }
  }
}
</style>
