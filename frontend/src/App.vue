<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
    import { Howl, Howler } from "howler";
    import Vue from "vue";
export default {
    components: {Howl, Vue},
    data() {
        return {

        }
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
        localStorage.paintingHistory = JSON.stringify([]);
    }
};
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css");
@import "./src/assets/scss/site.scss";

</style>
