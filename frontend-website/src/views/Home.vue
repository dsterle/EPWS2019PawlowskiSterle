<template>
  <div class="home">
    <div class="welcome-text">
      <h1 class="headline">Willkommen im Lucas Cranach Archiv</h1>
    </div>
    <p class="normal-text note-text">Bitte geben Sie die Nummer von Ihrem Transponder ein</p>
    <inputField
      inputID="input-transponder"
      inputPlaceholder="Nummer..."
      buttonText="Ok"
      v-bind:error="errorMsg"
      v-on:event-clicked="validateIDs"
    ></inputField>
    <!--<input type="button" class="docs-button" value="Docs" @click="$router.push({ name: 'documentation'})">-->
    <div class="installPrompt">
      <img src="../../public/thumbnail/testicon-256x256.png" alt="icon">
      <span id="addToHomeScreen">Zum Startbildschirm hinzufügen</span>
    </div>
  </div>
</template>

<script>
import inputField from "../components/inputField.vue";

export default {
  name: "home",
  components: { inputField },
  data() {
    return {
      paintingIDs: [100, 101, 102],
      errorMsg: false
    };
  },
  methods: {
    validateIDs(data) {
      if (this.paintingIDs.includes(parseInt(data))) {
        this.$router.push({ path: `waiting/${data}` });
      } else if (document.querySelector(".input-field").value === "") {
        this.errorMsg = "Bitte geben Sie eine Nummer ein";
      } else {
        this.errorMsg = "Die Nummer konnte nicht gefunden werden";
      }
    },
    saveBeforeInstallPromptEvent() {

    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.home {
  padding-left: $abstand-L;
  padding-right: $abstand-L;

  .welcome-text {
    width: 80%;
    margin-top: $abstand-XXL;
  }

  .note-text {
    margin-top: $abstand-XL;
    margin-bottom: 0;
  }

  ol {
    list-style-type: "decimal";
  }

  .docs-button {
    color: $accent;
    font-size: $font-size-S;
    background: none;
    border: none;
    position: absolute;
    bottom: 45px;
    padding: 0;
  }

  .installPrompt {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: white;

    img {
      margin-left: 10px;
      width: 50px;
      height: 50px;
    }

    span {
      position: absolute;
      padding: 10px;
      margin-left: 10px;
      font-size: $font-size-M;
      color: $accentDark;
    }
  }
}
</style>
