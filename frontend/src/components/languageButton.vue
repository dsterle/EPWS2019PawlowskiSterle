<template>
  <div class="languageButton">
    <li v-bind:id="languageId" v-bind:class="langClass" @click="changeLanguage(languageId)">
        <span>
          {{language}}
        </span>
      <img v-bind:src="langSrc" v-bind:alt="languageId">
    </li>
  </div>
</template>

<script>

    export default {
        name: "languageButton",
        props: ["languageId", "language", "langSrc", "langClass"],
        methods: {
            changeLanguage(id) {
                document.querySelector(".selected").classList.remove("selected");
                document.querySelector("#" + id).classList.add("selected");
                localStorage.language = document.querySelector(".selected").id;
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";

  li {
    display: flex;
    justify-content: space-between;
    padding: $abstand-S $abstand-M $abstand-S $abstand-M;
    color: $lighter;
    font-size: $font-size-L;
    line-height: $font-line-height-L;

    img {
      width: $abstand-XL;
      height: $abstand-L;
    }
  }

  li:active {
    background: $light;
  }

  .selected {
    color: $accent;
  }
</style>