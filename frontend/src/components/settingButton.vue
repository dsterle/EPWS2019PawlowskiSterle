<template>
  <div class="setting" @click="$router.push({name: page})">
    <div class="left">
      <i v-bind:class="icon"></i>
      <p class="text button-text setting-description">{{description}}</p>
    </div>
    <i class="fas fa-chevron-right"></i>
  </div>
</template>

<script>
export default {
  name: "settingButton",
  props: ["description", "page", "icon"],
  mounted() {},
  created() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.setting {
  padding: $card-padding;
  background: $dark;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.5);

  .left {
    align-items: center;
    display: flex;

    .text {
      margin-left: $abstand-M;
    }
  }
}
</style>