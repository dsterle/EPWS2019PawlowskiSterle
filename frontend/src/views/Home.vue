<template>
  <div class="home">
    <div class="welcome-text">
      <h1 class="headline">Willkommen im Lucas Cranach Archiv</h1>
    </div>
    <inputField
      class="inputField"
      inputID="input-transponder"
      inputPlaceholder="Chip Nr"
      buttonText="Start"
      v-bind:error="errorMsg"
      v-on:event-clicked="validateIDs"
    ></inputField>
    <input type="button" value="Tutorial starten" class="button-text tutorialButton" @click="$router.push({name: 'tutorial'})">
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

  .inputField {
    margin-top: $abstand-XL;
  }

  .note-text {
    margin-top: $abstand-XL;
    margin-bottom: 0;
  }

  .tutorialButton {
    background: $accent;
    padding: $abstand-S $abstand-M $abstand-S $abstand-M;
    margin-top: $abstand-XXL;
    border-radius: 5px;
    color: $darker;
    width: 100%;
    cursor: pointer;
    transition: 0.5s;
  }

  ol {
    list-style-type: "decimal";
  }
}
</style>
