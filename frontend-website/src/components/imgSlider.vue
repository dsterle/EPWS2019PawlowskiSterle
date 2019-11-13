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
    display: flex;
    justify-content: center;
    align-items: flex-end;
    right: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  }

  .VueCarousel-dot {
    background-color: #7f7f7f !important;
    // vertical-align: bottom !important;
  }

  .VueCarousel-dot--active {
    background-color: #fff !important;
    // vertical-align: bottom !important;
  }
}
</style>