<template>
  <div class="notData">
    <img src="/static/img/noData.png" alt width="80" height="63">
    <p>{{NoDataVal}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NoDataVal: "暂无数据"
    };
  }
  //      props: {
  //        NoDataVal:{}
  //      }
};
</script>

<style scoped="scoped" lang="scss">
.notData {
  /*padding:100px 0;*/
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    vertical-align: middle;
    text-align: center;
    display: inline-block;
  }
  p {
    color: #808080;
    font-size: 16px;
    padding-top: 15px;
  }
}
</style>
