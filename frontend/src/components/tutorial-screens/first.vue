<template>
  <div>
    <p class="headline animated fadeIn">Guten Tag!</p>
    <p class="normal-text animated fadeIn">Ich bin Ihr Museums-Assistent</p>
    <div class="illustration-wrapper animated fadeIn">
      <img class="illustration" src="../../assets/illustrations/wavinghand.svg" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables.scss";

.illustration-wrapper {
  width: 100%;
  margin-top: $abstand-XXXL;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-delay: 200ms;

  .illustration {
  }
}
</style>