<template>
  <div class="language">
    <headBar
      headline="Sprache"
      page-info-headline="Sprache:"
      page-info="Hier können Sie die Sprache einstellen, diese wird automatisch gespeichert."
    ></headBar>
    <div class="content">
      <ul class="languageList">
        <li>
          <language-button
            language="Deutsch"
            language-id="german"
            :lang-src="require('../../assets/flags/german.png')"
            lang-class="selected"
          ></language-button>
        </li>
        <li>
          <language-button
            language="Br. English"
            language-id="bEnglish"
            :lang-src="require('../../assets/flags/british-english.png')"
          ></language-button>
        </li>
        <li>
          <language-button
            language="Am. English"
            language-id="aEnglish"
            :lang-src="require('../../assets/flags/american-english.png')"
          ></language-button>
        </li>
        <li>
          <language-button
            language="Français"
            language-id="french"
            :lang-src="require('../../assets/flags/french.png')"
          ></language-button>
        </li>
      </ul>
    </div>
    <toolBar current-page="settings"></toolBar>
  </div>
</template>

<script>
import headBar from "../../components/headBar";
import toolBar from "../../components/toolBar";
import languageButton from "../../components/languageButton";

export default {
  name: "Language",
  components: { headBar, toolBar, languageButton },
  methods: {
    changeLanguage(id) {
      document.querySelector(".selected").classList.remove("selected");
      document.querySelector("#" + id).classList.add("selected");
      localStorage.language = document.querySelector(".selected").id;
    }
  },
  mounted() {
    if (localStorage.language) {
      this.changeLanguage(localStorage.language);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables";

.language {
  .content {
    padding: $abstand-M;
    padding-bottom: $abstand-XXXL;
  }

  .selected {
    color: $accent;
  }
}
</style>