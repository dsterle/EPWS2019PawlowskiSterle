<template>
  <div
    class="languageButton card"
    v-bind:class="langClass"
    v-on:click="$emit('language-button-clicked', languageId)"
    v-bind:id="languageId"
  >
    <div class="wrapper">
      <p class="headline">{{language}}</p>
      <img class="flag" v-bind:src="langSrc" v-bind:alt="languageId" />
    </div>
  </div>
</template>

<script>
export default {
  name: "languageButton",
  props: ["languageId", "language", "langSrc", "langClass"]
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.languageButton {
  .wrapper {
    display: flex;
    justify-content: space-between;

    .headline {
      transition: 0.3s;
    }

    .flag {
      width: $abstand-XL;
      height: $abstand-L;
    }
  }

  &.selected {
    // border: 1px solid $accent;

    .wrapper {
      .headline {
        color: $accent;
        transition: 0.3s;
      }
    }
  }
}
</style>