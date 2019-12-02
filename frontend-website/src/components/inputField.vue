<template>
  <form>
    <form action>
      <!-- wenn this.error true ist, wird die Klasse input-field-error an das input-field gebunden -->
      <div class="wrapper">
        <input
          class="hint-text input-field"
          v-bind:name="inputID"
          v-bind:id="inputID"
          v-bind:placeholder="inputPlaceholder"
          v-bind:class="{'input-field-error':this.error}"
          type="number"
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
          class="error-text input-field-error-msg"
        >{{ error }}</label>
        <input
          class="button-submit button-text"
          type="button"
          v-bind:value="buttonText"
          v-on:click="emitEvent"
        />
      </div>
    </form>
  </form>
</template>

<script>
export default {
  name: "inputField",
  props: ["formID", "inputID", "input-placeholder", "buttonText", "error"],
  methods: {
    emitEvent() {
      let input = document.querySelector(`#${this.inputID}`).value;
      this.$emit("event-clicked", input);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.wrapper {
  display: flex;
  justify-content: space-between;

  .input-field {
    padding: $abstand-S $abstand-M $abstand-S $abstand-M;
    color: $lighter;
    flex-grow: 1;
    margin-right: $abstand-M;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px rgba(255, 255, 255, 0.5) solid;
    transition: 0.5s;
  }

  .input-field:focus {
    border: 1px $accent solid;
    transition: 0.5s;
    outline: none;
  }

  .button-submit {
    padding: 0 $abstand-M 0 $abstand-M;
    border-radius: 5px;
    border: 1px rgba(255, 255, 255, 0.5) solid;
    cursor: pointer;
  }

  .input-field-error {
    border-bottom: 2px $error solid !important;
  }

  .input-field-error-msg {
    position: absolute;
    left: $abstand-L;
    margin-top: $abstand-XXL;
  }

  .visible {
    max-height: 0;
  }
}
</style>