<template>
  <div class="toolBar">
    <!-- <i class="fas fa-home" @click="$router.push({name: 'waiting', params: {userid: user}})"></i> -->
    <!-- <i class="fas fa-search" @click="$router.push({name: 'search'})"></i> -->
    <!-- <i
      v-if="!isNaN(currentPageAvailable)"
      class="fas fa-image"
      @click="$router.push({name: 'painting', params: {userid: user, id: paintingId}})"
    ></i>-->
    <!-- <i
      v-else
      class="fas fa-image"
      @click="$router.push({name: 'noPainting', params: {userid: user}})"
    ></i>-->
    <!-- <i class="fas fa-history" @click="$router.push({name: 'history', params: {userid: user}})"></i> -->
    <!-- <i class="fas fa-cog" @click="$router.push({name: 'settings', params: {userid: user}})"></i> -->

    <img
      js-home
      class="active"
      src="../assets/icons/home.svg"
      alt
      @click="$router.push({name: 'waiting', params: {userid: user}})"
    />
    <img
      js-painting
      src="../assets/icons/painting.svg"
      alt
      @click="$router.push({name: 'painting', params: {userid: user, id: paintingId}})"
    />
    <img
      js-settings
      src="../assets/icons/settings.svg"
      alt
      @click="$router.push({name: 'settings', params: {userid: user}})"
    />
  </div>
</template>

<script>
export default {
  name: "appBar",
  props: ["currentPage"],
  data() {
    return {
      user: {},
      paintingId: {},
      currentPageAvailable: localStorage.currentPainting,
      home_icon: require("../assets/icons/home.svg"),
      home_icon_accent: require("../assets/icons/home_accent.svg"),
      painting_icon: require("../assets/icons/painting.svg"),
      painting_icon_accent: require("../assets/icons/painting_accent.svg"),
      settings_icon: require("../assets/icons/settings.svg"),
      settings_icon_accent: require("../assets/icons/settings_accent.svg")
    };
  },
  methods: {
    changeIcon(currentPage) {
      if (document.querySelector(".currentPage") !== null)
        document.querySelector(".currentPage").classList.remove("currentPage");
      switch (currentPage) {
        case "home":
          document.querySelector("[js-home]").src = this.home_icon_accent;
          break;
        case "painting":
          document.querySelector(
            "[js-painting]"
          ).src = this.painting_icon_accent;
          break;
        case "settings":
          document.querySelector(
            "[js-settings]"
          ).src = this.settings_icon_accent;
          break;
      }
    }
  },
  created() {
    this.user = this.$route.params.userid;
  },
  mounted() {
    this.paintingId = localStorage.currentPainting;
    this.changeIcon(this.currentPage);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.toolBar {
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: $abstand-M 0 $abstand-M 0;
  background: $darker;
  color: $lighter;
  z-index: 5;
  box-shadow: 0px -5px 8px rgba(0, 0, 0, 0.5);

  // .home-icon {
  //   width: auto;
  //   height: auto;
  //   background: url("../assets/icons/home.svg");
  // }

  i {
    font-size: $font-size-XL;
  }

  .currentPage {
    color: $accent;
  }

  .inActive {
    opacity: 0.3;
  }
}
</style>