<template>
  <div class="comment">
    <van-list v-model="datas.loading" :finished="datas.finished" finished-text="没有更多数据了"  @load="onLoad">
      <tenant-list :listData="obj" @closeImg="closeImg"></tenant-list>
    </van-list>
  </div>
</template>

<script>
import { ImagePreview, Rate } from "vant";
import { getListPageByAccOrRoom } from "../../api/api";
import tenantList from "@/page/detail/components/commentList.vue"; //客房评论列表
export default {
  name: "commentList",
  data() {
    return {
      pageData: {
        pageSize: 10,
        pageNum: 1
      },
			datas:{
				loading: false,
				finished: false,
				imgConfig:'',//客房点评图片config值
			},
      obj: {
				replay:true,
        items: []
      }
    };
  },
  props: {
		
  },
  //在路由离开的时候，关闭预览的图片
  beforeRouteLeave(to, from, next) {
    if (this.datas.imgConfig) {
      this.datas.imgConfig.close();
    }
    next();
  },
  components: {
    [ImagePreview.name]: ImagePreview,
    [Rate.name]: Rate,
		tenantList
  },
  mounted() {
		
  },
  methods: {
    onLoad() {
      let par = {
        accountid: 0,
        roomAccId: this.$route.query.delId,
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageNum
      };
      getListPageByAccOrRoom(par).then(res => {
        // 加载结束
        this.datas.loading = false;
        if (res.respCode === "2000") {
          if (res.respData.length > 0) {
						this.pageData.pageNum += 1;
						this.obj.items = this.obj.items.concat(res.respData)
          } else {
            this.datas.finished = true; //数据加载完成
          }
        } else {
          this.datas.finished = true;
        }
      });
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
    // 接收子组件传来的imgConfig
    closeImg(imgConfig){
			this.datas.imgConfig = imgConfig
    },
  },
  computed: {},
  watch: {}
};
</script>

<style scoped="scoped" lang="scss">
.comment {
  margin-bottom: 100px;

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
