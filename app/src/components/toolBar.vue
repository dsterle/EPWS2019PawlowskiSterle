<template>
  <div class="toolBar">
    <img
      js-home
      class="active"
      src="../assets/icons/home.svg"
      alt
      @click="$router.push({name: 'waiting', params: {userid: user}});"
    />
    <img
      v-if="!isNaN(currentPainting)"
      js-painting
      src="../assets/icons/painting.svg"
      alt
      @click="$router.push({name: 'painting', params: {userid: user, id: paintingId}})"
    />
    <img v-else
      js-painting
      src="../assets/icons/painting.svg"
      alt
      @click="$router.push({name: 'noPainting', params: {userid: user}})"
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
      settings_icon_accent: require("../assets/icons/settings_accent.svg"),
      currentPainting: localStorage.currentPainting
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
  padding: $abstand-S 0 $abstand-S 0;
  background: $darker;
  color: $lighter;
  z-index: 5;
  height: $app-bar-height;
  // border-top: 2px solid $dark;
  box-shadow: 0px -5px 8px rgba(0, 0, 0, 0.25);

  .inActive {
    opacity: 0.3;
  }
}
</style>