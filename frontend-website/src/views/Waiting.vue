<template>
  <div class="waiting">
    <div class="app-bar-wrapper">
      <a class="back-icon" href="/">
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
<<<<<<< HEAD
      reconnectTimeout: 2000,
      host: "hivemq.dock.moxd.io", // TODO MQTT Server
      port: 8000,
      topic: "ourTopic",// TODO topic
      mqtt: new Paho.MQTT.Client(this.host, this.port, this)
    }
=======
      server: {
        host: "hivemq.dock.moxd.io",
        port: 8000,
        reconnectTimeout: 2000
      },
      topic: {}
    };
>>>>>>> b6954fd59564f2a34a85ecdb9f1dccc1b7e18ed9
  },
  created() {
    // get id from the URL
    // this is the id on the NFC Tag
    this.topic = this.$route.params.id;
  },
  mounted() {
    var client = new Paho.MQTT.Client(
      this.server.host,
      this.server.port,
      "client"
    );

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({ onSuccess: onConnect });

    var this_component = this;

    // called when the client connects
    function onConnect() {
      // Once a connection has been made, the client subscribes the topic
      client.subscribe(this_component.topic);
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    // called when a message arrives
    function onMessageArrived(message) {
      // message contains the id of a painting
      // now a new page will be open with the url <<domain>>/painting/<<message>>
      open("/painting/" + message.payloadString, "_self");
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