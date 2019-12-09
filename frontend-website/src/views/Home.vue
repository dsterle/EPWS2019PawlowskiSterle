<template>
  <div class="home">
    <div class="welcome-text">
      <h1 class="headline">Willkommen im Lucas Cranach Archiv</h1>
    </div>
    <input class="qrScan button-text" type="button" value="Scan QR-Code" v-on:click="startQRScanner">
    <inputField
      class="inputField"
      inputID="input-transponder"
      inputPlaceholder="Chip Nr"
      buttonText="Ok"
      v-bind:error="errorMsg"
      v-on:event-clicked="validateIDs"
    ></inputField>
    <qrcode-drop-zone @decode="onDecode" @init="logErrors" v-if="qrCodeScan">
      <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit" class="qrCodeScanner">
<!--        <div class="loading-indicator" v-if="loading">-->
<!--          Loading...-->
<!--        </div>-->
      </qrcode-stream>
    </qrcode-drop-zone>

  </div>
</template>

<script>
import inputField from "../components/inputField.vue";
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: "home",
  components: {inputField, QrcodeStream },
  data() {
    return {
      paintingIDs: [100, 101, 102],
      errorMsg: false,
      qrResult: '',
      loading: true,
      qrCodeScan: false
    };
  },
  methods: {
    startQRScanner() {
        this.qrCodeScan = true
    },
    onDecode(result) {
        this.qrResult = result;
        this.$router.push({ path: `waiting/${result}` });
    },
      onInit (promise) {
          promise.then().catch (error => {
              if (error.name === 'NotAllowedError') {
                  this.errorMsg = "ERROR: you need to grant camera access permisson"
              } else if (error.name === 'NotFoundError') {
                  this.errorMsg = "ERROR: no camera on this device"
              } else if (error.name === 'NotSupportedError') {
                  this.errorMsg = "ERROR: secure context required (HTTPS, localhost)"
              } else if (error.name === 'NotReadableError') {
                  this.errorMsg = "ERROR: is the camera already in use?"
              } else if (error.name === 'OverconstrainedError') {
                  this.errorMsg = "ERROR: installed cameras are not suitable"
              } else if (error.name === 'StreamApiNotSupportedError') {
                  this.errorMsg = "ERROR: Stream API is not supported in this browser"
              } else {
                  this.errorMsg = "UNKNOWN ERROR: " + error.message
              }
          }).finally(() => {
              this.loading = false
          })
      },
    logErrors(promise) {
        promise.catch(console.error)
    },
    validateIDs(data) {
      if (this.paintingIDs.includes(parseInt(data))) {
        this.$router.push({ path: `waiting/${data}` });
      } else if (document.querySelector(".input-field").value === "") {
        this.errorMsg = "Bitte geben Sie eine Nummer ein";
      } else {
        this.errorMsg = "Die Nummer konnte nicht gefunden werden";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/site.scss";

.home {
  padding-left: $abstand-L;
  padding-right: $abstand-L;

  .welcome-text {
    width: 80%;
    margin-top: $abstand-XXL;
  }

  .inputField {
    margin-top: $abstand-M;
  }

  .note-text {
    margin-top: $abstand-XL;
    margin-bottom: 0;
  }

  ol {
    list-style-type: "decimal";
  }

  .qrCodeScanner {
    margin-top: $abstand-M;
  }

  .loading-indicator {
    font-size: 30px;
  }

  .qrScan {
    background: $accent;
    margin-top: $abstand-XL;
    padding: $abstand-S $abstand-M $abstand-S $abstand-M;
    border-radius: 5px;
    color: $darker !important;
    cursor: pointer;
    transition: 0.5s;
  }
}
</style>
