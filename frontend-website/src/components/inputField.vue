<template>
  <div>
    <form action>
      <!-- wenn this.error true ist, wird die Klasse input-field-error an das input-field gebunden -->
      <input
        class="hint-text input-field"
        v-bind:name="inputID"
        v-bind:id="inputID"
        v-bind:placeholder="inputPlaceholder"
        v-bind:class="{'input-field-error':this.error}"
        type="number"
      />
      <!-- nur wenn this.error true ist wird das label gezeigt -->
      <label
        v-if="this.error === true"
        v-bind:for="inputID"
        class="error-text input-field-error-msg"
      >Die Nummer konnte nicht gefunden werden</label>
      <label
        v-if="this.error === 'noInput'"
        v-bind:for="inputID"
        class="error-text input-field-error-msg"
      >Bitte geben Sie eine Nummer ein</label>
      <div class="button-wrapper">
        <input
          class="button-submit button-text"
          type="button"
          v-bind:value="buttonText"
          v-on:click="emitEvent"
        />
      </div>
    </form>
  </div>
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

.input-field {
  margin-top: $abstand-L;
  padding: 0 0 $abstand-S 0;
  color: $lighter;
  width: 100%;
  border-bottom: 1px rgba(255, 255, 255, 0.5) solid;
  transition: 0.5s;
}

.input-field:focus {
  border-bottom: 2px $accent solid;
  transition: 0.5s;
  outline: none;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;

  .button-submit {
    text-align: right;
    margin-top: $abstand-L;
    padding: 0 0 0 0;
    border: none;
    cursor: pointer;
  }
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
  max-height: 0px;
}
</style>