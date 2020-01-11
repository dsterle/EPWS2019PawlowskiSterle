<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css");
@import "./src/assets/scss/site.scss";

.app-bar-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  height: $app-bar-height;
  width: 100%;
  align-items: center;
  color: $lighter;
  font-size: $font-size-L;
  background: $accentDark;

  .back-icon {
    margin-left: $abstand-M;
    margin-right: $abstand-M;
  }
}
</style>
