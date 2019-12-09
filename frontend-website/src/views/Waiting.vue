<template>
  <div class="waiting">
    <div class="app-bar-wrapper">
      <a class="back-icon" @click="$router.go(-1)">
        <img src="../assets/icons/arrow_back.svg" alt="back" />
      </a>
    </div>
    <div class="content-wrapper">
      <p class="hint-text note-text">Halten Sie Ihren Transponder vor ein Gemälde...</p>
    </div>
  </div>
</template>

<script>
// import handleMQTTConnection from "../assets/js/handleMQTTConnection";

export default {
  name: "waiting",
  components: {},
  data() {
    return {
      topic: {}
    };
  },
  created() {
    // Speichere die ID in der URL als topic
    this.topic = this.$route.params.id;
  },
  mounted() {
    const MQTTHandler = require("../assets/js/MQTTHandler");
    MQTTHandler.handleMQTTConnection(this, this.topic, "waitingClient");

    /// TEST ///
    /*
    this.$router.push(
      {
        name: "painting",
        params: { userid: 100, id: 2 }
      },
      () => {
        this_component.$router.go(0);
      }
    );
    */
    /// TEST ///
  }
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/site.scss";

.app-bar-wrapper {
  display: flex;
  height: $app-bar-height;
  width: 100%;
  align-items: center;

  .back-icon {
    margin-left: $abstand-M;
  }
}

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
</style>