<template>
  <div class="container">
    <carousel v-bind:per-page="1">
      <slide v-for="image in imgSrc" :key="image">
        <img class="image" v-bind:src="image" alt v-on:click="imageClicked" />
        <div class="flexContainer">
          <div class="imageInfo notDisplayed animated bounceIn">
            <span>test</span>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Zooming from 'zooming';

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
  },
    mounted() {
        // new Zooming({
        //     bgColor: "rgb(24, 25, 26)"
        // }).listen('img');
    },
    methods: {
        imageClicked() {
            this.$emit("img-clicked");
        }
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
    z-index: 100000000;
  }

  .flexContainer {
    display: flex;
    justify-content: center;
  }

  .imageInfo {
    position: absolute;
    top: $abstand-XL;
    padding: $abstand-S;
    border-radius: 10px;
    background: $evenDarker;
    box-shadow: 0 0 10px 2px $light;
    span {
      color: $lighter;
      text-align: center;
    }
    transition: 0.3s;
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