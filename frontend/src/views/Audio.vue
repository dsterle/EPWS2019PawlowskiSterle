<template>
  <div class="audio">
    <headBar headline="Audio"></headBar>
    <div class="content">
      <span class="setting">Autoplay
        <i class="fas fa-toggle-on toggleDarkMode" v-on:click="toggle"></i>
      </span>
      <span class="setting">Lautstärke</span>
      <slider
              class="slider"
              v-model="soundValue"
              :interval="2"
              :drag-on-click="true"
              :contained="true"
      ></slider>
      <span class="setting">Geschwindigkeit</span>
      <slider
              class="slider"
              v-model="speedValue"
              :adsorb="true"
              :data="data"
              :drag-on-click="true"
              :contained="true"
      ></slider>
      <button class="saveButton button-text" @click="saveSettings">Speichern</button>
    </div>
    <toolBar current-page="settings"></toolBar>
  </div>
</template>

<script>
    import headBar from "../components/headBar";
    import toolBar from "../components/toolBar";
    import slider from "vue-slider-component";
    import VueCookies from 'vue-cookies'
    import Vue from "vue";

    Vue.use(VueCookies);
    export default {
        name: "Audio",
        components: {headBar, toolBar, slider},
        data() {
            return {
                soundValue: 50,
                speedValue: 1,
                data: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
            }
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
            saveSettings() {
                // let categories = document.querySelectorAll(".category");
                // let categoriesToShow = [];
                // for (let i=0; i<categories.length; i++) {
                //     if (categories[i].checked)
                //         categoriesToShow.push(categories[i].name);
                // }
                // Vue.$cookies.set("categoriesToShow", categoriesToShow);
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables.scss";
  @import "../../node_modules/vue-slider-component/theme/material.css";

  .audio {
    .setting {
      display: flex;
      justify-content: space-between;
      padding: $abstand-M;
      color: $lighter;
      font-size: $font-size-L;
    }

    i {
      font-size: $font-size-XL;
      color: $lighter;
    }

    .saveButton {
      position: absolute;
      right: $abstand-M;
      bottom: $abstand-L;
      background: $accent;
      padding: $abstand-S;
      border-radius: 5px;
      border: none;
      color: $lighter;
    }

    .slider {
      color: $lighter;
      margin-left: $abstand-L;
      margin-right: $abstand-L;
    }
  }

</style>