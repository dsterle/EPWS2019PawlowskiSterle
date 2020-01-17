<template>
  <div class="tutorial">
    <headBar headline="Einführung"></headBar>
    <imgSlider class="tutorialPages" v-bind:imgSrc="tutorials"></imgSlider>
  </div>
</template>

<script>
    import headBar from "../components/headBar";
    import imgSlider from "../components/imgSlider";
    import VueCookies from 'vue-cookies'
    import Vue from "vue";
    export default {
        name: "Tutorial",
        components: {headBar, imgSlider,  VueCookies, Vue},
        data() {
            return {
                tutorials: [
                    "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_c1995_Overall-001.jpg",
                    "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_2008-11_Overall.jpg",
                    "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_image-date-unknown_Overall-002.jpg"
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";
  .tutorialPages{

  }
</style>