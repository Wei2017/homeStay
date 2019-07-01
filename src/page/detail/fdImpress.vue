<template>
  <div class="fdImpress">
		<div v-if="datas.fdDetail">
			<div class="fdMsg">
			  <div class="lf-msg">
			    <h3>你好，我是</h3>
			    <span>{{datas.fdDetail.accountName}}</span>
			    <em>欢迎您的到来</em>
			  </div>
			  <div class="rg-msg">
			    <img :src="datas.fdDetail.accHeadImg" alt>
			  </div>
			</div>
			<div class="msg-con">
			  <div class="img">
			    <img src="/static/img/smile.png" alt>
			  </div>
			  <p>{{datas.fdDetail.accGgcDes}}</p>
			  <div class="testMsg">
			    <h3>已验证信息</h3>
			    <p>注册时间：{{datas.fdDetail.createTime}}</p>
			    <p class="trueFlag">已实名认证</p>
					<p class="phone">手机号<a :href="'tel:' + datas.fdDetail.busPhone"></a></p>
			  </div>
			</div>
		</div>
    <div class="fdBottom">
      <ul>
        <li :class="{active:datas.activeInx===0}" @click="changeNav(0)">
          上架房源
          <em>({{datas.roomCount}})</em>
        </li>
        <li :class="{active:datas.activeInx===1}" @click="changeNav(1)">
          客房点评
          <em>({{datas.comCount}})</em>
        </li>
      </ul>
      <div class="con">
        <div v-if="datas.activeInx===0">
					<van-list v-model="loading.loadingF" :finished="loading.finishedF" finished-text="没有更多数据了"  @load="getHotels">
						<com-list :listData="datas.unShelfObj"></com-list>
					</van-list>
        </div>
        <div v-else>
					<van-list v-model="loading.loadingS" :finished="loading.finishedS" finished-text="没有更多数据了"  @load="getTenant">
						<tenant-list :listData="datas.tenantCom" @closeImg="closeImg"></tenant-list>
					</van-list>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import comList from "@/components/comList.vue"; //上架房源列表
import tenantList from "@/page/detail/components/commentList.vue"; //客房评论列表
import {fdInfo , fdGetRoomList , fdGetCommentList} from '../../api/api.js'
export default {
  name: "fdImpress",
  data() {
    return {
			pages:{
				pageSize:10,
				pageNum1:1,
				pageNum2:1
			},
			loading:{
				loadingF: false,
				finishedF: false,
				loadingS: false,
				finishedS: false,
			},
			datas:{
				accountId:this.$route.query.accountId,
				fdDetail:null,
				activeInx: 0,
				unShelfObj:{ //上架房源列表
					score: false,
					comment: false,
					items: []
				},
				imgConfig: "", //客房点评图片config值
				tenantCom:{//房客点评列表
					replay:false,
					items:[]
				},
				roomCount:'', //上架房源总数
				comCount:'', //评论总数
			}
    };
  },
  components: {
    comList,
		tenantList
  },
	//在路由离开的时候，关闭预览的图片
  beforeRouteLeave(to, from, next) {
    if (this.datas.imgConfig) {
      this.datas.imgConfig.close();
    }
    next();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
			// 获取房东详情
			fdInfo(this.datas.accountId,1).then(res =>{
				if(res.respCode === '2000'){
					this.datas.fdDetail = res.respData
				}
			})
			// 客房点评
			let cData = {
				accountid: this.datas.accountId,
				roomAccId : 0,
				pageSize  : this.pages.pageSize,
				pageIndex: this.pages.pageNum2,
			}
			fdGetCommentList(cData).then(res =>{
				if(res.respCode === '2000'){
					this.datas.comCount = res.respDataExt.totalCount
				}
			})
    },
    // 上架房源列表
    getHotels() {
			let par = {
				orderBy: '1',
				searchName: '',
				pageSize: this.pages.pageSize,
				pageIndex: this.pages.pageNum1,
				accountId: this.datas.accountId,
				stayInDate: '',
				stayOutDate: ''
			}
			fdGetRoomList(par).then(res =>{
				if(res.respCode === '2000'){
					if (res.respData.length > 0) {
						if(res.respData.length <= this.pages.pageSize){
							this.datas.unShelfObj.items = res.respData
							this.loading.finishedF = true; //数据加载完成
						}else{
							this.pages.pageNum1 += 1;
							this.datas.unShelfObj.items = this.datas.unShelfObj.items.concat(res.respData)
						}
					}else{
						this.loading.finishedF = true; //数据加载完成
					}
					this.datas.roomCount = res.respDataExt.totalCount
				}else{
					this.loading.finishedF = true; //数据加载完成
				}
				// 加载结束
				this.loading.loadingF = false;
			})
    },
		// 客房点评列表
		getTenant(){
			let cData = {
				accountid: this.datas.accountId,
				roomAccId : 0,
				pageSize  : this.pages.pageSize,
				pageIndex: this.pages.pageNum2,
			}
			fdGetCommentList(cData).then(res =>{
				if(res.respCode === '2000'){
					if (res.respData.length > 0) {
						if(res.respData.length <= this.pages.pageSize){
							this.datas.tenantCom.items = res.respData
							this.loading.finishedS = true; //数据加载完成
						}else{
							this.pages.pageNum2 += 1;
							this.datas.tenantCom.items = this.datas.tenantCom.items.concat(res.respData)
						}
					}else{
						this.loading.finishedS = true; //数据加载完成
					}
					this.datas.comCount = res.respDataExt.totalCount
				}else{
					this.loading.finishedS = true; //数据加载完成
				}
				// 加载结束
				this.loading.loadingS = false;
			})
		},
		// 上架房源/客房评价 切换
    changeNav(index) {
      this.datas.activeInx = index;
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
