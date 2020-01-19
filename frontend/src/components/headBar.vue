<template>
  <div class="headBar">
    <a class="back-icon" @click="$router.go(-1)">
      <img src="../assets/icons/arrow_back.svg" alt="back" />
    </a>
    <span>{{headline}}</span>
    <i class="fas fa-info-circle pageInfo"></i>
  </div>
</template>

<script>
    export default {
        name: "headBar",
        props: ["headline"]
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";

  .headBar {
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    height: $app-bar-height;
    width: 100%;
    align-items: center;
    color: $lighter;
    font-size: $font-size-L;
    font-weight: $weight-semibold;
    background: $evenDarker;

    .back-icon {
      margin-left: $abstand-M;
      margin-right: $abstand-M;
    }

    .pageInfo {
      position: absolute;
      right: $abstand-M;
    }

  }
</style>