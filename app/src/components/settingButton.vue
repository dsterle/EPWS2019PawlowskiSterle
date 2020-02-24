<template>
  <div class="setting" v-on:click="$emit('clicked')">
    <div class="left">
      <i class="icon" v-bind:class="icon"></i>
      <p class="text headline setting-description">{{description}}</p>
    </div>
    <!-- <i class="icon fas fa-chevron-right"></i> -->
    <img class="icon-right" src="../assets/icons/arrow_down.svg" alt />
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
  border-radius: 10px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);

  .left {
    align-items: center;
    display: flex;

    .text {
      margin-left: $abstand-M;
    }
  }
}

.icon {
  color: $lighter;
  font-size: $font-size-L;
  margin-right: $abstand-S;
}

.icon-right {
  transform: rotate(-90deg);
  width: $abstand-L;
}
</style>