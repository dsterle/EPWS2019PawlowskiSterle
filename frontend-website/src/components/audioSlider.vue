<template>
  <div class="audio-slider">
    <div class="line"></div>
    <div class="current-dot"></div>
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