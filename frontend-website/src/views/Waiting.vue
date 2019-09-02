<template>
  <div class="waiting">
    <div class="app-bar-wrapper">
      <a class="back-icon" href="/">
        <img src="../assets/icons/arrow_back.svg" />
      </a>
    </div>
    <div class="content-wrapper">
      <p class="hint-text note-text">Halten Sie Ihren Transponder vor ein Gemälde...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "waiting",
  components: {},
  data() {
    return {
      id: {}
    };
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    // TODO subscribe from MQTT Broker
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.app-bar-wrapper {
  display: flex;
  height: $app-bar-height;
  width: 100%;
  align-items: center;

  .back-icon {
    margin-left: $abstand-M;
  }
}

.content-wrapper {
  width: 100%;
  height: 80vh;
  display: flex;
  margin-top: -$abstand-L;
  align-items: center;
  justify-content: center;

  .note-text {
    width: 80%;
    position: relative;
    text-align: center;
  }
}
</style>