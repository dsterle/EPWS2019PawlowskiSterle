<template>
  <div>
    <form action>
      <input
        class="input-field"
        v-bind:name="inputId"
        v-bind:id="inputId"
        v-bind:placeholder="inputPlaceholder"
      />
      <input class="button-submit button-text" type="button" v-bind:value="buttonText" />
    </form>
  </div>
</template>

<script>
export default {
  name: "inputField",
  props: ["ausgabe", "input-placeholder", "inputId", "buttonText"]
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.input-field {
  margin-top: $abstand-L;
  font-family: $font;
  font-weight: $regular;
  font-size: $font-size-M;
  background: none;
  border: none;
  padding: 0px 0px $abstand-S 0px;
  color: $lighter;
  width: 100%;
  border-bottom: 2px $light solid;
}

.button-submit {
  margin-top: $abstand-L;
  background: none;
  padding: 0px 0px 0px 0px;
  border: none;
}
</style>