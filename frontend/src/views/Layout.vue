<template>
  <div class="layout">
    <headBar headline="Layout"></headBar>
    <span class="setting">Dark Mode</span>
    <i class="fas fa-toggle-on toggleDarkMode" v-on:click="toggle"></i>
  </div>
</template>

<script>
  import headBar from "../components/headBar";
    export default {
        name: "Layout",
        components: {headBar},
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
      font-size: $font-size-XL;
      color: $lighter;
      position: absolute;
      margin-top: $abstand-L;
      right: $abstand-L;
    }
  }
</style>