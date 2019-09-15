<template>
  <div class="waiting">
    <div class="app-bar-wrapper">
      <a class="back-icon" @click="$router.go(-1)">
        <img src="../assets/icons/arrow_back.svg" />
      </a>
    </div>
    <div class="content-wrapper">
      <p class="hint-text note-text">Halten Sie Ihren Transponder vor ein Gemälde...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "waiting",
  components: {},
  data() {
    return {
      server: {
        host: "hivemq.dock.moxd.io",
        port: 8000,
        reconnectTimeout: 10000
      },
      topic: {}
    };
  },
  created() {
    // Speichere die ID in der URL als topic
    this.topic = this.$route.params.id;
  },
  mounted() {
    // Erstelle einen MQTT-Client mit den jeweiligen Angaben für den Server
    var client = new Paho.MQTT.Client(
      this.server.host,
      this.server.port,
      "client"
    );

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({ onSuccess: onConnect });

    var this_component = this;

    // Wird aufgerufen, wenn sich der Client verbindet
    function onConnect() {
      client.subscribe(this_component.topic);
      console.log("subscricbed: " + this_component.topic);
    }

    // Wird aufgerufen, wenn die Verbindung veloren geht
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    // Wird aufgerufen, wenn die Nachricht ankommt
    function onMessageArrived(message) {
      console.log("message: " + message.payloadString)
      // Die Nachricht beinhaltet die userid, mit der sich der Nutzer angemeldet hat
      // und die empfangene Nachricht: die Gemälde ID, des Gemäldes das geöffnet werden soll
      var userid = this_component.topic;
      //this_component.$router.push({ path: `/user/${userid}/painting/${message.payloadString}`});
        this_component.$router.push({name: 'painting', params: {userid: userid, id: message.payloadString}})
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

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