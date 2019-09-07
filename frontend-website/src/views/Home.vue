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
      let input = parseInt(data);

      if (this.paintingIDs.includes(input)) {
        open("cranach_erweiterte_interaktion/waiting/" + input, "_self");
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
    margin-bottom: 0px;
  }
}
</style>
