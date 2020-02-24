<template>
  <div class="settings">
    <headBar
      headline="Einstellungen"
      page-info-headline="Einstellungen:"
      page-info="Hier können Sie die Einstellungen, bezüglich Darstellung, Audio oder Sprache anpassen."
    ></headBar>
    <div class="content">
      <settingButton
        class="settings-button first animated fadeIn"
        icon="fas fa-align-left"
        description="Darstellung"
        v-on:clicked="openLayout"
      ></settingButton>
      <settingButton
        class="settings-button second animated fadeIn"
        icon="fas fa-headphones-alt"
        description="Audio"
        v-on:clicked="openAudio"
      ></settingButton>
      <settingButton
        class="settings-button third animated fadeIn"
        icon="fas fa-globe-americas"
        description="Sprache"
        v-on:clicked="openLanguage"
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
  mounted() {},
  methods: {
    openLayout() {
      this.$router.push({ name: "layout" });
    },
    openAudio() {
      this.$router.push({ name: "audio" });
    },
    openLanguage() {
      this.$router.push({ name: "language" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables";
.settings {
  .content {
    padding: $abstand-M;
    margin-top: $app-bar-height;

    .settings-button {
      margin-bottom: $abstand-M;

      &.first {
      }

      &.second {
        animation-delay: 200ms;
      }

      &.third {
        animation-delay: 400ms;
      }
    }
  }
}
</style>