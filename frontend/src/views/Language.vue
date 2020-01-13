<template>
  <div class="language">
    <headBar headline="Sprache"></headBar>
    <div class="content">
      <ul class="languageList">
        <li id="german">
        <span>
<!--          <i class="fas fa-check"></i>Deutsch-->
          Deutsch
        </span>
          <img src="../assets/flags/german.png" alt="german">
        </li>
        <li id="bEnglish">
        <span>
          Br. English
        </span>
          <img src="../assets/flags/british-english.png" alt="british-english">
        </li>
        <li id="aEnglish">
        <span>
          Am. English
        </span>
          <img src="../assets/flags/american-english.png" alt="american-english">
        </li>
        <li id="french">
        <span>
          Français
        </span>
          <img src="../assets/flags/french.png" alt="french">
        </li>
      </ul>
    </div>
    <toolBar current-page="settings"></toolBar>
  </div>
</template>

<script>
    import headBar from "../components/headBar";
    import toolBar from "../components/toolBar";
    import VueCookies from 'vue-cookies'
    import Vue from "vue";

    Vue.use(VueCookies);
    export default {
        name: "Language",
        components: {headBar, toolBar}
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";

  .language {
    .languageList {
      li {
        display: flex;
        justify-content: space-between;
        margin: $abstand-L $abstand-M $abstand-M $abstand-M;
        color: $lighter;
        font-size: $font-size-L;
        line-height: $font-line-height-L;

        img {
          width: $abstand-XL;
          height: $abstand-L;
        }
      }
    }
  }

</style>