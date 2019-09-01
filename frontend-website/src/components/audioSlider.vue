<template>
  <div class="audio-slider">
    <div v-if="current" class="line"></div>
    <div v-if="current" class="current-dot"></div>
  </div>
</template>

<script>
export default {
  name: "audioSlider",
  props: ["current"]
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.audio-slider {
  display: flex;
  align-items: center;

  .line {
    width: 50%;
    height: 1px;
    background: $accent;
  }

  .current-dot {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: $accent;
  }
}
</style>