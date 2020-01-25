<template>
  <div class="container">
    <div js-page class="page one active">
      <p class="normal-text">Page One</p>
      <img class="next" v-on:click="showSlide(1)" :src="icon_arrowBack" alt />
    </div>
    <div js-page class="page two">
      <p class="normal-text">Page Two</p>
      <img class="prev" v-on:click="showSlide(-1)" :src="icon_arrowBack" alt />
      <img class="next" v-on:click="showSlide(1)" :src="icon_arrowBack" alt />
    </div>
    <div js-page class="page three">
      <p class="normal-text">Page Three</p>
      <img class="prev" v-on:click="showSlide(-1)" :src="icon_arrowBack" alt />
      <div>Nein</div>
      <div>Ja</div>
    </div>
    <div class="indicator">
      <div class="dot one current"></div>
      <div class="dot two current"></div>
      <div class="dot three current"></div>
    </div>
  </div>
</template>

<script>
export default {
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
  .page {
    width: 100%;
    height: 100%;
    position: absolute;
    // opacity: 0;
    display: none;

    .prev {
      float: left;
    }

    .next {
      float: right;
      transform: rotate(180deg);
    }
  }

  .page.active {
    // opacity: 1;
    display: block;
  }
}
</style>