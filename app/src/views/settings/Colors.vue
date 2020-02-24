<template>
  <div class="colors">
    <headBar headline="Farben"></headBar>
    <div class="content">
      <span class="setting">Primärfarbe <i class="fas fa-square" id="primaryColor"></i></span>
      <span class="setting">Sekundärfarbe <i class="fas fa-square" id="secondaryColor"></i></span>
      <span class="setting">Tertiärfarbe <i class="fas fa-square" id="tertiaryColor"></i></span>

    </div>
    <toolBar current-page="settings"></toolBar>
  </div>
</template>

<script>
    import headBar from "../../components/headBar";
    import toolBar from "../../components/toolBar";
    import VueCookies from 'vue-cookies';
    import Vue from "vue";

    Vue.use(VueCookies);
    export default {
        name: "Colors",
        components: {headBar, toolBar}
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/010-variables";

  .colors {
    .setting {
      display: flex;
      justify-content: space-between;
      padding: $abstand-M;
      color: $lighter;
      font-size: $font-size-L;
      line-height: $font-line-height-L;

      i {
        border: solid 2px $lighter;
        border-radius: 5px;
        padding: $abstand-XS;
      }
    }

    #primaryColor {
      color: $darker;
    }

    #secondaryColor {
      color: $accent;
    }

    #tertiaryColor {
      color: $lighter;
    }
  }
</style>