<template>
  <div class="setting">
    <a @click="$router.replace({name: page})">
      <span class="setting-description">
        <i v-bind:class="icon"></i>
        {{description}}
        <i class="fas fa-chevron-right"></i>
      </span>
    </a>
  </div>
</template>

<script>
    export default {
        name: "settingButton",
        props: ["description", "page", "icon"],
        mounted() {

        }, created() {

        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";
  .setting {
    padding: $abstand-M;
    width: 100%;
    font-size: $font-size-L;
    color: $lighter;
    border-bottom: 1px solid $light;
    span {
      i {
        margin-right: $abstand-M;
      }
      .fa-chevron-right {
        position: absolute;
        right: $abstand-S;
      }
    }
  }
</style>