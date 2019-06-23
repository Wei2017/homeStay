<template>
  <div class="searchList">
    <div class="search-top">
      <span @click="choseTime">{{datas.time}}</span>
      <input
        v-model="datas.searchText"
        type="text"
        placeholder="位置/房源/关键字"
        @keyup.enter="searchBtn($event)"
      >
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
import comList from "@/components/comList.vue"; //列表
import { searchList } from "../../api/api";
export default {
  name: "searchList",
  data() {
    return {
      pageData: {
        pageSize: 10,
        pageNum: 1
      },
      datas: {
        searchText: "",
        time: "05.15-05.16",
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
    comList
  },
  mounted() {
    this.datas.searchText = this.$route.query.searchName;
  },
  destroyed() {},
  methods: {
    // 选取时间
    choseTime() {
      this.$router.push({
        path: "/timeChose",
        query: {}
      });
    },
    init() {
      this.datas.listObj.items = [];
      this.pageData.pageNum = 1;
      this.datas.loading = true; //下拉加载中
      this.datas.finished = false; //下拉结束
      if (this.datas.loading) {
        this.onLoad();
      }
    },
    // 获取数据-上拉加载
    onLoad() {
      let par = {
        orderBy: 1, //默认写1
        searchName: this.$route.query.searchName, //关键词
        // searchName: sessionStorage.getItem('searchName'),  //关键词
        pageSize: this.pageData.pageSize,
        pageIndex: this.pageData.pageNum,
        accountId: 0, //房东id, 默认写0
        stayInDate: "", //入住日期, 格式为 yyyy-MM-dd
        stayOutDate: "" //离店日期, 格式为 yyyy-MM-dd
      };
      this.datas.loading = true;
      this.datas.finished = false;
      searchList(par).then(res => {
        // 加载结束
        this.datas.loading = false;
        if (res.respCode === "2000") {
          if (res.respData.length > 0) {
            this.datas.listObj.items = this.datas.listObj.items.concat(
              res.respData
            );
            this.pageData.pageNum++;
          } else {
            this.datas.finished = true; //数据加载完成
          }
        } else {
          this.datas.finished = true;
        }
      });
    },
    // 搜索查询
    searchBtn(e) {
      let keyCode = window.event ? e.keyCode : e.which;
      if (keyCode === 13) {
        this.$route.query.searchName = this.datas.searchText;
        this.pageData.pageNum = 1;
        this.datas.listObj.items = [];
        this.onLoad();
      }
    }
  },
  computed: {},
  watch: {}
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

    span {
      font-size: 24px;
      display: inline-block;
      padding: 0 15px 0 30px;
      text-align: center;
      background: url("/static/img/sj_icon.png") no-repeat right 15px;
      background-size: 9px 8px;
      cursor: pointer;
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
