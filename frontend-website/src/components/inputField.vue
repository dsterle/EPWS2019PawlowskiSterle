<template>
  <div>
    <form action class="form">
      <input
        class="input-field"
        v-bind:name="inputId"
        v-bind:id="inputId"
        v-bind:placeholder="inputPlaceholder"
        type="number"
        min="1"
        max="200"
      />
      <label v-bind:for="inputId" class="input-field-error-msg"></label>
      <input
        class="button-submit button-text"
        type="button"
        v-bind:value="buttonText"
        v-on:click="validate(ids)"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "inputField",
  props: ["ausgabe", "input-placeholder", "inputId", "buttonText", "ids"],
  methods: {
    validate: idInputValidation
  }
};

function idInputValidation(ids) {
  let inputField = document.querySelector(".input-field");

  if (inputField.value === "") {
    let errorMsg = document.querySelector(".input-field-error-msg");
    errorMsg.innerHTML = "Bitte geben Sie eine ID ein";
    inputField.classList.add("input-field-error");
  } else if (!ids.includes(inputField.value)) {
    let errorMsg = document.querySelector(".input-field-error-msg");
    errorMsg.innerHTML = "Die angegebene ID existiert nicht";
    inputField.classList.add("input-field-error");
  } else if (ids.includes(inputField.value)) {
    // TODO change localhost to domain
    open("http://localhost:8080/waiting", "_self");
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.input-field {
  margin-top: $abstand-L;
  padding: 0 0 $abstand-S 0;
  color: $lighter;
  width: 100%;
  border-bottom: 1px $lighter solid;
  transition: 0.5s;
}

.input-field:focus {
  border-bottom: 2px $accent solid;
  transition: 0.5s;
  outline: none;
}

.button-submit {
  width: 100%;
  text-align: right;
  margin-top: $abstand-L;
  padding: 0 0 0 0;
  border: none;
  cursor: pointer;
}

.input-field-error {
  border-bottom: 2px $error solid !important;
}

.input-field-error-msg {
  position: absolute;
  left: $abstand-L;
  margin-top: $abstand-XXL;
  font-weight: $regular;
  font-size: $font-size-S;
  color: $error;
}
</style>