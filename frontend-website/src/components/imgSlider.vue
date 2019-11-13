<template>
  <div class="container">
    <carousel v-bind:per-page="1">
      <slide v-for="image in imgSrc" :key="image">
        <img class="image" v-bind:src="image" alt />
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "imgSlider",
  props: ["imgSrc"],
  components: {
    Carousel,
    Slide
  },
  data: function() {
    return {
      images: 0
    };
  }
};
</script>

<style lang="scss">
.container {
  .image {
    width: 100%;
    height: auto;
  }

  .VueCarousel-dot-container {
    position: absolute;
    // width: 100px;
    // height: auto;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    transform: rotate(180deg);
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
    // margin-top: 0px !important;
  }
}
</style>