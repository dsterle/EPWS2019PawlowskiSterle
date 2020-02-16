<template>
  <div class="floating-action-button" v-on:click="clicked">
    <img js-icon class="icon" v-bind:src="src" v-bind:alt="alt" />
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