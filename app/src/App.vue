<template>
  <div id="app">
    <!-- <fullscreen @change="fullscreenChange"> -->
    <router-view />
    <!-- </fullscreen> -->
    <!-- <button type="button" @click="toggle">Fullscreen</button> -->
  </div>
</template>

<script>
import { Howl, Howler } from "howler";
import Vue from "vue";
// import fullscreen from "vue-fullscreen";
// Vue.use(fullscreen);

export default {
  components: { Howl, Vue },
  data() {
    return {};
  },
  created() {
    Vue.prototype.$audioHowls = [];
    // localStorage.paintingHistory = JSON.stringify([
    //     {
    //         id: 1,
    //         title: "Bildnis des Johannes Cuspinian",
    //         dated: 1502,
    //         imgSrc: "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_c1995_Overall-001.jpg"
    //     },
    //     {
    //         id: 2,
    //         title: "Bildnis des Johannes Cuspinian",
    //         dated: 1502,
    //         imgSrc: "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_c1995_Overall-001.jpg"
    //     }]);
    //localStorage.paintingHistory = JSON.stringify([]);
  },
  methods: {
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    toggle() {
      this.$refs["fullscreen"].toggle(); // recommended
    }
  }
};
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css");
@import "./src/assets/scss/site.scss";
</style>
