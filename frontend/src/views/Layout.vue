<template>
  <div class="layout">
    <headBar headline="Layout"></headBar>
    <span class="setting">Dark Mode <i class="fas fa-toggle-on toggleDarkMode" v-on:click="toggle"></i></span>
    <span class="setting">Kategorien anzeigen:</span>
    <ul>
      <li>
        <label for="kurzbeschreibung">Kurzbeschreibung</label>
        <input class="category" name="kurzbeschreibung" id="kurzbeschreibung" type="checkbox" checked>
      </li>
      <li>
        <label for="provenienz">Provenienz</label>
        <input class="category" name="provenienz" id="provenienz" type="checkbox" checked>
      </li>
      <li>
        <label for="masse">Maße</label>
        <input class="category" name="masse" id="masse" type="checkbox" checked>
      </li>
      <li>
        <label for="material">Material/Technik</label>
        <input class="category" name="material" id="material" type="checkbox" checked>
      </li>
      <li>
        <label for="beschriftung">Beschriftung</label>
        <input class="category" name="beschriftung" id="beschriftung" type="checkbox" checked>
      </li>
      <li>
        <label for="ausstellungsgeschichte">Ausstellungsgeschichte</label>
        <input class="category" name="ausstellungsgeschichte" id="ausstellungsgeschichte" type="checkbox" checked>
      </li>
    </ul>
    <button class="saveButton button-text" @click="saveSettings">Speichern</button>
    <toolBar current-page="settings"></toolBar>
  </div>
</template>

<script>
  import headBar from "../components/headBar";
  import toolBar from "../components/toolBar";
  import VueCookies from 'vue-cookies'
  import Vue from "vue";

  Vue.use(VueCookies);
    export default {
        name: "Layout",
        components: {headBar, toolBar},
        data() {
            return {
            }
        },
        created() {

        }, mounted() {
            this.checkCategories();
        },
        methods: {
            toggle() {
                let toggleIcon = document.querySelector(".toggleDarkMode");
                if (toggleIcon.classList.contains("fa-toggle-on")) {
                    toggleIcon.classList.replace("fa-toggle-on", "fa-toggle-off");

                } else {
                    toggleIcon.classList.replace("fa-toggle-off", "fa-toggle-on");
                }
            },
            checkCategories() {
                let categories = document.querySelectorAll(".category");
                let categoriesToShow = Vue.$cookies.get("categoriesToShow");
                for (let i=0; i<categories.length; i++) {
                    if (categoriesToShow !== null)
                      categories[i].checked = categoriesToShow.includes(categories[i].name);
                }
            },
            saveSettings() {
                let categories = document.querySelectorAll(".category");
                let categoriesToShow = [];
                for (let i=0; i<categories.length; i++) {
                    if (categories[i].checked)
                        categoriesToShow.push(categories[i].name);
                }
                Vue.$cookies.set("categoriesToShow", categoriesToShow);
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";

  .layout {
    .setting {
      display: flex;
      justify-content: space-between;
      padding: $abstand-M;
      color: $lighter;
      font-size: $font-size-L;
    }
    li {
      display: flex;
      justify-content: space-between;
      padding: $abstand-S;
      margin-left: $abstand-L;
      margin-right: $abstand-S;
      color: $lighter;
      font-size: $font-size-M;
    }
    i {
      font-size: $font-size-XL;
      color: $lighter;
    }
    .category {
      width: $font-size-M;
      height: $font-size-M;
    }
    .saveButton {
      position: absolute;
      right: $abstand-M;
      bottom: $abstand-XXL;
      background: $accent;
      padding: $abstand-S;
      border-radius: 5px;
      border: none;
      color: $lighter;
      cursor: pointer;
      transition: 0.5s;
    }
  }
</style>