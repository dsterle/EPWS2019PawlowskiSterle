<template>
  <div class="settings">
    <headBar
      headline="Einstellungen"
      page-info-headline="Einstellungen:"
      page-info="Hier können Sie die Einstellungen, bezüglich Darstellung, Audio oder Sprache anpassen."
    ></headBar>
    <div class="content">
      <settingButton
        class="settings-button"
        icon="fas fa-align-left"
        description="Darstellung"
        page="layout"
      ></settingButton>
      <!--      <settingButton icon="fas fa-palette" description="Farben" page="colors"></settingButton>-->
      <settingButton
        class="settings-button"
        icon="fas fa-headphones-alt"
        description="Audio"
        page="audio"
      ></settingButton>
      <settingButton
        class="settings-button"
        icon="fas fa-globe-americas"
        description="Sprache"
        page="language"
      ></settingButton>
    </div>
    <toolBar current-page="settings"></toolBar>
  </div>
</template>

<script>
import settingButton from "../../components/settingButton.vue";
import toolBar from "../../components/toolBar";
import headBar from "../../components/headBar";

export default {
  name: "Settings",
  components: { settingButton, toolBar, headBar },
  data() {
    return {};
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables";
.settings {
  .content {
    padding: $abstand-M;

    .settings-button {
      margin-bottom: $abstand-M;
    }
  }
}
</style>