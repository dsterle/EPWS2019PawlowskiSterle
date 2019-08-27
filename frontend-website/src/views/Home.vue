<template>
  <div class="home">
    <div class="home-wrapper">
      <h1 class="headline welcome-text">
        Willkommen im
        <br />Lukas Cranach
        <br />Archiv
      </h1>
      <p class="normal-text note-text">Bitte geben Sie die Nummer von Ihrem Transponder ein</p>
      <inputField
        inputID="input-transponder"
        inputPlaceholder="Nummer..."
        buttonText="Ok"
        v-bind:error="transponderNotFound"
        v-on:event-clicked="validateIDs"
      ></inputField>
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
      transponderNotFound: false
    };
  },
  methods: {
    validateIDs(data) {
      let input = parseInt(data);

      if (this.paintingIDs.includes(input)) {
        open("/waiting", "_self");
      } else {
        this.transponderNotFound = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.home-wrapper {
  padding-left: $abstand-L;
  padding-right: $abstand-L;

  .welcome-text {
    margin-top: $abstand-XXL;
  }

  .note-text {
    margin-top: $abstand-XL;
    margin-bottom: 0px;
  }
}
</style>
