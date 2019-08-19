<template>
  <div class="accordion">
    <button class="accordion-button" v-on:click="open">Kurzbeschreibung</button>
    <p class="description-text accordion-text" js-accordion="text">{{ item.text }}</p>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    open() {
      // $el gives the DOM elements of this
      var text = this.$el.querySelector("[js-accordion=text]");

      if (text.style.maxHeight) {
        // accordion is open
        text.style.maxHeight = null;
      } else {
        // accordion is closed
        text.style.maxHeight = text.scrollHeight + "px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.accordion {
  .accordion-button {
    width: 100%;
    text-align: left;
    height: $accordion-height;
  }
  .accordion-text {
    max-height: 0;
    overflow: hidden;
    transition: 0.3s;
  }
}
</style>