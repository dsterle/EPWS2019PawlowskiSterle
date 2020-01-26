<template>
  <div class="container">
    <p
      class="headline"
    >Möchten Sie, dass ich Ihnen die Informationen vorlese, damit SIe Ihr Handy in der Hosentasche lassen können?</p>
    <div class="button-wrapper">
      <div class="button --grey">
        <p class="button-text">Nein</p>
      </div>
      <div class="button">
        <p class="button-text">Ja</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables.scss";

.container {
  .button-wrapper {
    width: 100%;
    justify-content: space-between;
    margin-top: $abstand-L;
    display: flex;

    .button {
      display: flex;
      justify-content: center;
      width: 40%;
      background: $accent;
      padding: $abstand-M 0;
      border-radius: 5px;
      color: $lighter;
      cursor: pointer;
      transition: 0.5s;
      box-shadow: 0 14px 14px rgba(0, 0, 0, 0.237602),
        0 0 14px rgba(0, 0, 0, 0.12);
    }

    .button.--grey {
      background: $light;
    }
  }
}
</style>