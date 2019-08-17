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
  padding: 0px 0px $abstand-S 0px;
  color: $lighter;
  width: 100%;
  border-bottom: 2px $light solid;
  transition: 0.5s;
}

.input-field:focus {
  border-bottom: 2px $accent solid;
  transition: 0.5s;
}

.button-submit {
  width: 100%;
  text-align: right;
  margin-top: $abstand-L;
  padding: 0px 0px 0px 0px;
  border: none;
}
</style>