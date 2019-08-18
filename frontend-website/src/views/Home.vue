<template>
  <div class="home">
    <div class="home-wrapper">
      <h1 class="headline welcome-text">
        Willkommen im
        <br />Lukas Cranach
        <br />Archiv
      </h1>
      <p class="text note-text">Bitte geben Sie die Nummer von Ihrem Transponder ein</p>
      <inputField inputId="input-transponder" inputPlaceholder="Nummer..." buttonText="Ok" ids="[100, 101, 102]"></inputField>
    </div>
  </div>
</template>

<script>
import inputField from "../components/inputField.vue";

export default {
  name: "home",
  components: {
    inputField
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
