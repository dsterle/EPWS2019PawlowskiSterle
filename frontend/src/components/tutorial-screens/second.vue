<template>
  <div>
    <p
      class="normal-text animated fadeIn"
    >Wenn Sie Informationen zu einem Gemälde lesen oder hören wollen, müssen Sie nur Ihren Chip an das dazugehörige Lesegerät halten</p>
    <div class="illustration-wrapper animated fadeIn">
      <img src="../../assets/illustrations/handwithchip.svg" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables.scss";

.illustration-wrapper {
  display: flex;
  margin-top: $abstand-M;
  animation-delay: 200ms;
}
</style>