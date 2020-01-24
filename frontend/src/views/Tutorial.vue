<template>
  <div class="container">
    <div js-page class="page one active">
      <p class="normal-text">Page One</p>
      <button v-on:click="showSlide(1)">Next</button>
    </div>
    <div js-page class="page two">
      <p class="normal-text">Page Two</p>
      <button v-on:click="showSlide(-1)">Prev</button>
      <button v-on:click="showSlide(1)">Next</button>
    </div>
    <div js-page class="page three">
      <p class="normal-text">Page Three</p>
      <button v-on:click="showSlide(-1)">Nein</button>
      <button v-on:click="showSlide(1)">Ja</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: []
    };
  },
  mounted() {
    this.slides = this.$el.querySelectorAll("[js-page]");
    console.log(this.slides);
  },
  methods: {
    showSlide(n) {
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
    position: absolute;
    opacity: 0;
    // display: none;
  }

  .active {
    opacity: 1;
    // display: block;
  }
}
</style>