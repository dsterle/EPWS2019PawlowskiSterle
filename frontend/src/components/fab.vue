<template>
  <div class="floating-action-button" v-on:click="clicked">
    <img js-icon class="icon" v-bind:src="src" v-bind:alt="alt" />
  </div>
</template>
    
<script>
export default {
  name: "fab",
  props: ["src", "alt", "enabled"],
  methods: {
    clicked() {
      let fab = document.querySelector(".floating-action-button");
      // Der fab kann nur geklickt werden, wenn er NICHT disabled ist
      if (!fab.classList.contains("disabled")) {
        this.$emit("fab-clicked");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.disabled {
  display: none;
  background: $light;
  transition: 0.3s;
}
</style>