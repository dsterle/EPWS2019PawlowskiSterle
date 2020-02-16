<template>
  <div class="container">
    <div js-page class="page one active">
      <div class="content">
        <firstScreen class="animate fadeI"></firstScreen>
      </div>
      <div class="navigation">
        <div
          class="floating-action-button prev animated bounceIn"
          v-on:click="$router.push({ name: `home` })"
        >
          <img class="icon" :src="icon_arrowBack" alt />
        </div>
        <div class="floating-action-button next animated bounceIn" v-on:click="showSlide(1)">
          <img class="icon" :src="icon_arrowBack" alt />
        </div>
      </div>
    </div>
    <div js-page class="page two">
      <div class="content">
        <secondScreen class="animate fadeI"></secondScreen>
      </div>
      <div class="navigation">
        <div class="floating-action-button prev animated bounceIn" v-on:click="showSlide(-1)">
          <img class="icon" :src="icon_arrowBack" alt />
        </div>
        <div class="floating-action-button next animated bounceIn" v-on:click="showSlide(1)">
          <img class="icon" :src="icon_arrowBack" alt />
        </div>
      </div>
    </div>
    <div js-page class="page three">
      <div class="content">
        <thirdScreen class="animate fadeI"></thirdScreen>
      </div>
      <div class="navigation">
        <div class="floating-action-button prev animated bounceIn" v-on:click="showSlide(-1)">
          <img class="icon" :src="icon_arrowBack" alt />
        </div>
      </div>
    </div>
    <div class="indicator">
      <div class="dot one" v-bind:class="{active: currentSlide === 0}"></div>
      <div class="dot two" v-bind:class="{active: currentSlide === 1}"></div>
      <div class="dot three" v-bind:class="{active: currentSlide === 2}"></div>
    </div>
  </div>
</template>

<script>
import firstScreen from "../components/tutorial-screens/first";
import secondScreen from "../components/tutorial-screens/second";
import thirdScreen from "../components/tutorial-screens/third";

export default {
  components: { firstScreen, secondScreen, thirdScreen },
  data() {
    return {
      currentSlide: 0,
      slides: [],
      icon_arrowBack: require("../assets/icons/arrow_back.svg"),
      icon_arrowForward: require("../assets/icons/arrow_forward.svg")
    };
  },
  mounted() {
    this.slides = this.$el.querySelectorAll("[js-page]");
    console.log(this.slides);
  },
  methods: {
    showSlide(n) {
      console.log("n " + n);
      this.slides[this.currentSlide].classList.remove("active");
      this.currentSlide += n;
      console.log("currentSlide " + this.currentSlide);
      this.slides[this.currentSlide].classList.add("active");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";
@import "../assets/scss/030-typo.scss";

.container {
  height: 100%;

  .page {
    padding: $abstand-XXXL $abstand-L $abstand-L $abstand-L;
    display: none;

    .floating-action-button.prev {
      position: absolute;
      left: $abstand-L;
      bottom: $abstand-L;
      background: $light;
    }

    .floating-action-button.next {
      position: absolute;
      right: $abstand-L;
      bottom: $abstand-L;

      .icon {
        z-index: 6;
        transform: rotate(180deg);
      }
    }
  }

  .page.active {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .indicator {
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
    justify-content: center;
    margin-bottom: $abstand-M;

    .dot {
      width: 10px;
      height: 10px;
      margin: 10px;
      background: #4b4b4b;
      border-radius: 5px;
      transition: 0.3s;
    }

    .active {
      background: white;
    }
  }
}
</style>