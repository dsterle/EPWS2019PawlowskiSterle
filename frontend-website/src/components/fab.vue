<template>
  <div class="floating-action-button">
    <img js-icon class="icon" v-bind:src="src" v-bind:alt="alt" v-on:click="clicked" />
  </div>
</template>
    
<script>
export default {
  name: "fab",
  props: ["src", "alt"],
  methods: {
    clicked() {
      this.$emit("fab-clicked");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.floating-action-button {
  z-index: 6;
  background: $accent;
  width: $fab-size;
  height: $fab-size;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.237602),
    0px 0px 14px rgba(0, 0, 0, 0.12);
}

.floating-action-button:active {
  background: $accentDark;
}
</style>