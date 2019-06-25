<template>
  <div id="app">
    <div class="main">
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive>-->
      <!-- <router-view>
        <activity></activity> 
      </router-view>-->
      <activ-ity></activ-ity>
    </div>
  </div>
</template>

<script>
import activIty from "@/page/activity/activity.vue";
export default {
  name: "App",
  components: {
    activIty
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style>
#app {
  width: 100%;
  height: auto;
}
.main {
  height: auto;
}
</style>
