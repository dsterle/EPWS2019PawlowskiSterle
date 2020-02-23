<template>
  <div class="home animated fadeIn">
    <div>
      <h1 class="welcome-text">Willkommen im Lucas Cranach Archiv</h1>
    </div>
    <p
      class="normal-text hinweis"
    >Bitte geben Sie die Nummer des Chips ein, den Sie an der Rezeption bekommen haben</p>
    <inputField
      class="inputField"
      inputID="input-transponder"
      inputPlaceholder="Chip Nr"
      buttonText="Start"
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
      if (this.paintingIDs.includes(parseInt(data))) {
        this.$router.push({ path: `user/${data}/tutorial` });
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

  .hinweis {
    margin-top: $abstand-L;
  }

  .inputField {
    margin-top: $abstand-XL;
  }

  .note-text {
    margin-top: $abstand-XL;
    margin-bottom: 0;
  }

  // .tutorialButton {
  //   background: none;
  //   padding: $abstand-S $abstand-M $abstand-S $abstand-M;
  //   margin-top: $abstand-XXL;
  //   border-radius: 5px;
  //   border: 2px solid $accent;
  //   color: $accent;
  //   width: 100%;
  //   cursor: pointer;
  //   transition: 0.5s;
  // }

  ol {
    list-style-type: "decimal";
  }
}
</style>
