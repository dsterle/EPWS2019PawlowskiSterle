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
    <img src="../assets/icons/home.svg" alt />
    <img src="../assets/icons/painting.svg" alt />
    <img src="../assets/icons/settings.svg" alt />
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
      currentPageAvailable: localStorage.currentPainting
    };
  },
  methods: {
    changeIcon(currentPage) {
      if (document.querySelector(".currentPage") !== null)
        document.querySelector(".currentPage").classList.remove("currentPage");
      switch (currentPage) {
        case "home":
          document.querySelector(".fa-home").classList.add("currentPage");
          break;
        case "search":
          document.querySelector(".fa-search").classList.add("currentPage");
          break;
        case "painting":
          document.querySelector(".fa-image").classList.add("currentPage");
          break;
        case "history":
          document.querySelector(".fa-history").classList.add("currentPage");
          break;
        case "settings":
          document.querySelector(".fa-cog").classList.add("currentPage");
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
  // border-top: 2px solid $light;
  box-shadow: 0px -5px 8px rgba(0, 0, 0, 0.5);

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