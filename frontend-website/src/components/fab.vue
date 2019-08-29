<template>
  <div class="floating-action-button">
    <img class="icon" v.bind:src="this.src" alt="Pause Button" />
  </div>
</template>
    
<script>
export default {
  name: "fab",
  props: { src }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.floating-action-button {
  background: $accent;
  width: $fab-size;
  height: $fab-size;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 0 $abstand-M $abstand-M 0;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.237602),
    0px 0px 14px rgba(0, 0, 0, 0.12);
}
</style>