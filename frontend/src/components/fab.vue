<template>
  <div class="floating-action-button">
    <img js-icon class="icon" v-bind:src="src" v-bind:alt="alt" v-on:click="clicked" />
  </div>
</template>
    
<script>
export default {
  name: "fab",
  props: ["src", "alt"],
  methods: {
    clicked() {
      this.$emit("fab-clicked");
    }
  }
};
</script>

<style lang="scss">
</style>