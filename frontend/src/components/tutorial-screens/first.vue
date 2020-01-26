<template>
  <div>
    <p class="headline">Guten Tag!</p>
    <p class="headline">Ich bin Ihr Museums-Assistent</p>
    <div class="illustration-wrapper">
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
}
</style>