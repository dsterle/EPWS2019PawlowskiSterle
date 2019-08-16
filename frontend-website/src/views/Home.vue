<template>
  <div class="home">
    <div class="home-wrapper">
      <h1 class="headline welcome-text">
        Willkommen im
        <br />Lukas Cranach
        <br />Archiv
      </h1>
      <p class="text note-text">Bitte geben Sie die Nummer von Ihrem Transponder ein</p>
    </div>
    <!-- <h1 class="headline">Headline</h1>
    <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, rem.</p>
    <p class="button-text">Button Text</p>
    <p class="hint-text">Hint Text</p>
    <p class="error-text">Error Text</p>
    <p class="description-text">Description Text</p>-->
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss">
@import "../assets/scss/010-variables.scss";

.home-wrapper {
  padding-left: $abstand-L;
  padding-right: $abstand-L;

  .welcome-text {
    margin-top: $abstand-XXL;
  }

  .note-text {
    margin-top: $abstand-XL;
  }
}
</style>
