<template>
  <div class="searchList">
    <div class="search-top">
      <span @click="choseTime">{{datas.inDate}}-{{datas.outDate}}</span>
			<b @click="jumpSearchDic">
				<input
				  v-model="searchKey"
				  type="text"
				  placeholder="位置/房源/关键字"
				>
			</b>
      
    </div>
    <van-list
      v-model="datas.loading"
      :offset="50"
      :finished="datas.finished"
      finished-text="没有更多数据了"
      @load="onLoad"
    >
      <com-list :listData="datas.listObj"></com-list>
    </van-list>
  </div>
</template>

<script>
import dayEventBus from '@/components/service/dayEventBus.js'
import comList from "@/components/comList.vue"; //列表
import { searchList ,getRoomListDefDay} from "../../api/api";
export default {
  name: "searchList",
  data() {
    return {
      pageData: {
        pageSize: 10,
        pageNum: 1
      },
      datas: {
				inDate:'',
				outDate:'',
				dayStart:'',
				dayEnd:'',
        loading: false, //是否处于加载状态
        finished: false, //是否已加载完所有数据
        isLoading: false, //是否加载
        listObj: {
          score: true,
          comment: true,
          items: []
        }
      }
    };
  },
  components: {
    comList,
		dayEventBus
  },
  mounted() {
		this.init()
  },
  destroyed() {},
  methods: {
		// 获取默认日期
		init(){
			getRoomListDefDay().then(res =>{
				if (res.respCode === "2000") {
					this.datas.inDate = res.respData.dtStartShow
					this.datas.outDate = res.respData.dtEndShow
					this.datas.dayStart = res.respData.dayStart
					this.datas.dayEnd = res.respData.dayEnd
				}
			})
			this.activated()
		},
    // 选取时间
    choseTime() {
      this.$router.push({
        path: "/timeChose",
        query: {start:this.datas.inDate,end:this.datas.outDate}
      });
    },
		// 每次重新选择日期时
		activated(){
			//根据key名获取传递回来的参数，data就是map
			dayEventBus.$on('dayDatas', function(data){
					//赋值
					console.log(data)
					this.datas.inDate = data.inDate
					this.datas.outDate = data.outDate
					this.datas.dayStart = data.rzDayShow
					this.datas.dayEnd = data.ldDayShow
					// 重新加载数据
					this.pageData.pageNum = 1
					this.datas.finished = false
					this.datas.isLoading = false
					this.datas.listObj.items = []
					this.onLoad()
			}.bind(this));
		},
		
    // 获取数据-上拉加载
    onLoad() {
      let par = {
        orderBy: 1, //默认写1
        searchName: this.$store.state.searchKey, //关键词
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageNum,
        accountId: 0, //房东id, 默认写0
        stayInDate: this.datas.dayStart, //入住日期, 格式为 yyyy-MM-dd
        stayOutDate: this.datas.dayEnd //离店日期, 格式为 yyyy-MM-dd
      };
      searchList(par).then(res => {
        if (res.respCode === "2000") {
          if (res.respData.length > 0) {
						this.pageData.pageNum += 1;
            this.datas.listObj.items = this.datas.listObj.items.concat(
              res.respData
            )
          } else {
            this.datas.finished = true; //数据加载完成
          }
        } else {
          this.datas.finished = true;
        }
				// 加载结束
				this.datas.loading = false;
      });
    },
		// 选择位置
		jumpSearchDic(){
			this.$router.push({
			  path: "/searchDic",
			});
		},
  },
  computed: {
		searchKey(){
			return this.$store.state.searchKey
		}
  },
  watch: {
		searchKey:{
			handler(){
				this.pageData.pageNum = 1
				this.datas.finished = false
				this.datas.isLoading = false
				this.datas.listObj.items = []
				this.onLoad()
			}
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.searchList {
  padding-bottom: 1rem;

  .search-top {
    margin: 30px 20px 0 20px;
    background: #f1f0f8;
    padding: 23px 5px;
    border-radius: 40px;
		display: flex;
    span {
      font-size: 24px;
      display: inline-block;
      padding: 0 15px 0 30px;
      text-align: center;
      background: url("/static/img/sj_icon.png") no-repeat right 15px;
      background-size: 9px 8px;
      cursor: pointer;
    }
		b{
			width: 60%;
			font-weight: normal;
		}
    input {
      font-size: 30px;
      padding: 0 5px 0 20px;
    }
  }

  /deep/ .van-list {
    .van-list__loading {
      padding: 15px 0;

      .van-list__loading-icon {
        width: 0.4rem;
        height: 0.4rem;
      }
    }

    .van-list__error-text,
    .van-list__finished-text,
    .van-list__loading-text {
      font-size: 30px !important;
      margin: 60px 0;
    }
  }

  /deep/ .lists {
    margin: 0 auto;
    width: 670px !important;

    .list-top {
      width: 100%;
      height: 440px !important;
    }

    .list-bottom {
      > div {
        span {
          height: 30px;
          line-height: 30px;
          display: inline-block;
          padding-right: 15px;
          border-right: 1px solid #999;
        }

        span:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>
