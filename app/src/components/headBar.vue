<template>
  <div class="headBar">
    <a class="back-icon" @click="$router.go(-1)">
      <img src="../assets/icons/arrow_back.svg" alt="back" />
    </a>
    <span>{{headline}}</span>
    <i class="fas fa-info-circle pageInfoButton" @click="displayPageInfo"></i>
    <div class="pageInfo notDisplayed animated fadeInDown">
      <div class="corner"></div>
      <h1 class="headline">{{pageInfoHeadline}}</h1>
      <span class="normal-text">{{pageInfo}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "headBar",
  props: ["headline", "pageInfoHeadline", "pageInfo"],
  methods: {
    displayPageInfo() {
      let pageInfo = document.querySelector(".pageInfo");
      if (pageInfo.classList.contains("notDisplayed"))
        pageInfo.classList.replace("notDisplayed", "displayed");
      else pageInfo.classList.replace("displayed", "notDisplayed");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.headBar {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  z-index: 100;
  height: $app-bar-height;
  width: 100%;
  align-items: center;
  color: $lighter;
  font-size: $font-size-L;
  font-weight: $weight-semibold;
  background: $darker;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);

  .pageInfo {
    position: absolute;
    left: $abstand-S;
    right: $abstand-S;
    top: $abstand-XL;
    padding: $abstand-S;
    border-radius: 10px;
    background: $evenDarker;
    box-shadow: 0 0 10px 2px $light;
    z-index: 10;

    .corner {
      position: absolute;
      top: -15px;
      right: $abstand-M;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 15px solid $evenDarker;
      opacity: 0.8;
    }

    h1 {
      margin-bottom: $abstand-S;
    }

    span {
      text-align: center;
    }
    transition: 0.3s;
  }

  .back-icon {
    margin-left: $abstand-M;
    margin-right: $abstand-M;
  }

  .pageInfoButton {
    position: absolute;
    right: $abstand-M;
  }

  .notDisplayed {
    display: none;
    opacity: 0;
  }

  .displayed {
    opacity: 0.9;
  }
}
</style>