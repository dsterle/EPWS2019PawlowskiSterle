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
      reconnectTimeout: 2000,
      host: "hivemq.dock.moxd.io", // TODO MQTT Server
      port: 8000,
      topic: "ourTopic",// TODO topic
      mqtt: new Paho.MQTT.Client(this.host, this.port, this)
    }
  },
  methods : {
    onMessageArrived(msg) {
      out_msg = "Message received " + msg.payloadString + "<br>";
      out_msg = out_msg + "Message received Topic " + msg.destinationName;

      console.log(msg.destinationName);
    },

    onFailure() {
      console.log("Connection attempt to host " + this.host + " failed");
      setTimeout(this.MQTTconnect, this.reconnectTimeout);
    },

    onConnectionLost(error) {
      console.log(error);
    },

    onConnect() {
      console.log("connected");
      this.mqtt.subscribe(this.topic);
    },

    MQTTconnect() {
      console.log("connecting to " + this.host + " " + this.port);
      let options = {
        timeout: 3,
        onSuccess: this.onConnect,
        onFailure: this.onFailure,
      };

      this.mqtt.onMessageArrived = onMessageArrived;
      this.mqtt.onConnectionLost = onConnectionLost;
      this.mqtt.connect(options);
    },


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