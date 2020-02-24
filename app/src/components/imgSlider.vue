<template>
  <div class="container">
    <carousel v-bind:per-page="1" v-on:change="fun">
      <slide v-for="image in img" :key="image.id" v-on:change="fun">
        <v-zoomer class="zommer">
          <img class="image" v-bind:src="image.src" alt v-on:click="imageClicked" />
        </v-zoomer>
        <div class="infoContainer">
          <p class="imageInfo">{{ image.description }}</p>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Vue from "vue";
import VueZoomer from "vue-zoomer";

Vue.use(VueZoomer);

export default {
  name: "imgSlider",
  props: ["img"],
  components: {
    Carousel,
    Slide
  },
  data: function() {
    return {
      images: 0,
      fullscreen: false
    };
  },
  mounted() {},
  methods: {
    imageClicked() {
      this.$emit("img-clicked");
    }
  },
  methods: {
    fun() {
      console.log("changed");
    },
    imageClicked() {}
  }
};
</script>

<style lang="scss">
@import "../assets/scss/010-variables.scss";

.container {
  border-bottom: 2px solid $light;

  .image {
    width: 100%;
    height: auto;
  }

  .infoContainer {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000 100%);
    animation-delay: 2000ms;

    .imageInfo {
      color: $lighter;
      padding: $abstand-S;
      transition: 0.3s;
    }
  }

  .notDisplayed {
    opacity: 0;
  }

  // modifying the classes of vue-carousel

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
  }

  .VueCarousel-dot--active {
    background-color: #fff !important;
  }
}
</style>