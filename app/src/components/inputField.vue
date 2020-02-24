<template>
  <div>
    <!-- wenn this.error true ist, wird die Klasse input-field-error an das input-field gebunden -->
    <div class="wrapper">
      <input
        inputField
        class="hint-text input-field"
        v-bind:name="inputID"
        v-bind:id="inputID"
        v-bind:placeholder="inputPlaceholder"
        v-bind:class="{'input-field-error animated shake':this.error}"
        type="text"
        v-on:focus="setErrorFalse"
        size="4"
        maxlength="4"
      />
      <!-- nur wenn this.error mit einer Meldung gefüllt ist wird das label gezeigt -->
      <label
        v-if="this.error === true"
        v-bind:for="inputID"
        class="error-text input-field-error-msg"
      >Die Nummer konnte nicht gefunden werden</label>
      <label
        v-if="this.error"
        v-bind:for="inputID"
        class="error-text input-field-error-msg animated fadeIn"
      >{{ error }}</label>
      <input
        class="button-submit button-text"
        type="button"
        v-bind:value="buttonText"
        v-on:click="emitEvent"
        v-bind:class="{'button-error':this.error}"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "inputField",
  props: ["formID", "inputID", "input-placeholder", "buttonText", "error"],
  mounted() {},
  methods: {
    emitEvent() {
      let input = document.querySelector(`#${this.inputID}`).value;
      this.$emit("event-clicked", input);
    },
    setErrorFalse() {
      this.error = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.wrapper {
  display: flex;
  justify-content: space-between;

  .input-field:focus {
    border: 1px $accent solid !important;
    transition: 0.5s;
    outline: none;
  }

  .button-submit {
    background: $accent;
    padding: 0 $abstand-XM 0 $abstand-XM;
    border-radius: 5px;
    color: $lighter;
    cursor: pointer;
    transition: 0.5s;
  }

  .input-field {
    padding: $button-padding $abstand-M $button-padding $abstand-M;
    color: white;
    flex-grow: 1;
    flex-shrink: 1;
    margin-right: $abstand-M;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px $light solid;
    transition: 0.5s;
    height: auto;
    margin-bottom: 0;
  }

  .button-error {
    background: $light;
  }

  .input-field-error {
    border: 1px $error solid !important;
  }

  .input-field-error-msg {
    position: absolute;
    left: $abstand-L;
    margin-top: $abstand-XL;
  }

  .visible {
    max-height: 0;
  }
}
</style>