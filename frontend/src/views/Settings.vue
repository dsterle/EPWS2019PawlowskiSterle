<template>
  <div class="settings">
    <headBar headline="Einstellungen"></headBar>
    <div class="content">
      <settingButton icon="fas fa-align-left" description="Darstellung" page="layout"></settingButton>
      <settingButton icon="fas fa-palette" description="Farben" page="colors"></settingButton>
      <settingButton icon="fas fa-headphones-alt" description="Audio" page="audio"></settingButton>
      <settingButton icon="fas fa-globe-americas" description="Sprache" page="language"></settingButton>
    </div>
    <toolBar current-page="settings"></toolBar>
  </div>
</template>

<script>
    import settingButton from "../components/settingButton.vue";
    import toolBar from "../components/toolBar";
    import headBar from "../components/headBar";
    export default {
        name: "Settings",
        components: { settingButton, toolBar, headBar },
        data() {
            return {
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";
  .settings {
    .content {
      width: 90%;
      height: 90%;
    }
  }


</style>