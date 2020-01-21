<template>
  <div class="noPainting">
    <headBar headline="Kein Gemälde"></headBar>
    <div class="content-wrapper">
      <p class="hint-text note-text">Es scheint, als hätten Sie noch kein Gemälde besucht.</p>
    </div>
    <toolBar current-page="painting"></toolBar>
  </div>
</template>

<script>
  import toolBar from "../components/toolBar.vue";
  import headBar from "../components/headBar.vue";
    export default {
        name: "NoPainting",
        components: {toolBar, headBar}
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";

  .noPainting {
    .content-wrapper {
      width: 100%;
      height: 80vh;
      display: flex;
      margin-top: -$abstand-L;
      align-items: center;
      justify-content: center;

      .note-text {
        width: 80%;
        position: relative;
        text-align: center;
      }
    }
  }

</style>