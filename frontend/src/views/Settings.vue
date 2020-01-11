<template>
  <div class="settings">
    <div class="app-bar-wrapper">
      <a class="back-icon" @click="$router.go(-1)">
        <img src="../assets/icons/arrow_back.svg" alt="back" />
      </a>
      <span>Einstellungen</span>
    </div>
    <div class="content">
      <settingButton icon="fas fa-align-left" description="Layout" page="layout"></settingButton>
      <settingButton icon="fas fa-palette" description="Farben" page="#"></settingButton>
      <settingButton icon="fas fa-headphones-alt" description="Modi" page="#"></settingButton>
      <settingButton icon="fas fa-globe-americas" description="Sprache" page="#"></settingButton>
    </div>
  </div>
</template>

<script>
    import settingButton from "../components/settingButton.vue";

    export default {
        name: "Settings",
        components: { settingButton },
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
      margin-top: $abstand-S;
    }
  }


</style>