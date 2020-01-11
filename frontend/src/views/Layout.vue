<template>
  <div class="layout">
    <div class="app-bar-wrapper">
      <a class="back-icon" @click="$router.go(-1)">
        <img src="../assets/icons/arrow_back.svg" alt="back" />
      </a>
      <span>Layout</span>
    </div>
    <span class="setting">Dark Mode</span>
    <i class="fas fa-toggle-on toggleDarkMode" v-on:click="toggle"></i>
  </div>
</template>

<script>

    export default {
        name: "Layout",
        components: {},
        methods: {
            toggle() {
                let toggleIcon = document.querySelector(".toggleDarkMode");
                if (toggleIcon.classList.contains("fa-toggle-on")) {
                    toggleIcon.classList.replace("fa-toggle-on", "fa-toggle-off");

                } else {
                    toggleIcon.classList.replace("fa-toggle-off", "fa-toggle-on");
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";

  .layout {
    .setting {
      padding: $abstand-M;
      position: relative;
      top: $abstand-L;
      color: $lighter;
      font-size: $font-size-L;
      width: 100%;
    }
    i {
      font-size: $font-size-L;
      color: $lighter;
      position: absolute;
      margin-top: $abstand-L;
      right: $abstand-L;
    }
  }
</style>