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
      console.log(this);
    }
  }
};

window.onscroll = function () {
  let fab = document.querySelector(".floating-action-button");
  if (fab.classList.contains("floating-action-button-hidden")) {
    fab.classList.remove("floating-action-button-hidden");
  }
  setTimeout(function () {
    fab.classList.add("floating-action-button-hidden");
  }, 2000);
}

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
  right: 0;
  bottom: 0;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.237602),
    0px 0px 14px rgba(0, 0, 0, 0.12);
}

.floating-action-button:active {
  background: $accentDark;
}

.floating-action-button-hidden {
  visibility: hidden;
}
</style>