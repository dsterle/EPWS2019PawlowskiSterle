<template>
  <div class="waiting">
    <headBar
      headline="Home"
      page-info-headline="Willkommen:"
      page-info="In der Toolbar unten können Sie zwischen der Home-Seite, Suche, aktuelles Gemälde, Verlauf und
                          den Einstellungen wechseln."
    ></headBar>
    <div class="content">
      <p class="hint-text note-text">Halten Sie Ihren Chip vor ein Gemälde...</p>
    </div>
    <toolBar current-page="home"></toolBar>
  </div>
</template>

<script>
// import handleMQTTConnection from "../assets/js/handleMQTTConnection";
import toolBar from "../components/toolBar.vue";
import headBar from "../components/headBar";

export default {
  name: "waiting",
  components: { toolBar, headBar },
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
    MQTTHandler.handleMQTTConnection(this, this.topic, "waitingClient");
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
  margin-top: $app-bar-height;
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
</style>