<template>
  <div class="waiting">
    <headBar
      headline="Home"
      page-info-headline="Willkommen:"
      page-info="Hier können Sie auf Ihren Verlauf zugreifen oder manuell nach einem bestimmten Gemälde in unserem Archiv suchen.
                  In der Toolbar unten können Sie zwischen der Home-Seite, Ihrem aktuellen Gemälde und den Einstellungen wechseln."
    ></headBar>
    <div class="content">
      <div class="text-wrapper">
        <p class="hint-text note-text">Halten Sie Ihren Chip vor ein Gemälde...</p>
      </div>
      <div class="button-wrapper">
        <settingbutton
          v-on:clicked="historyClicked"
          class="setting-button first animated fadeIn"
          description="Ihr Verlauf"
        ></settingbutton>
        <settingbutton
          v-on:clicked="sucheClicked"
          class="setting-button second animated fadeIn"
          description="Gemälde suchen"
        ></settingbutton>
        <toolBar current-page="home"></toolBar>
      </div>
    </div>
  </div>
</template>

<script>
import toolBar from "../components/toolBar.vue";
import headBar from "../components/headBar";
import settingbutton from "../components/settingButton";

export default {
  name: "waiting",
  components: { toolBar, headBar, settingbutton },
  data() {
    return {
      topic: {}
    };
  },
  created() {
    // Speichere die ID in der URL als topic
    this.topic = this.$route.params.userid;
  },
  mounted() {
    const MQTTHandler = require("../assets/js/MQTTHandler");
    MQTTHandler.handleMQTTConnection(this, this.topic);
  },
  methods: {
    historyClicked() {
      this.$router.push({ name: "history", params: { userid: this.topic } });
    },
    sucheClicked() {
      this.$router.push({ name: "search", params: { userid: this.topic } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.settings-icon {
  position: absolute;
  right: $abstand-M;
}

.content {
  margin-top: $abstand-XXXXL;
  width: 100%;
  // height: 80vh;
  // display: flex;
  // margin-top: $abstand-L;
  // align-items: center;
  // justify-content: center;

  .text-wrapper {
    display: flex;
    justify-content: center;

    .note-text {
      width: 80%;
      position: relative;
      text-align: center;
    }
  }

  .button-wrapper {
    padding: 0 $abstand-M $abstand-XXL $abstand-M;
    margin-top: $abstand-XXXL;

    .setting-button {
      margin-bottom: $abstand-M;
    }
  }

  .setting-button {
    &.second {
      animation-delay: 200ms;
    }
  }
}
</style>