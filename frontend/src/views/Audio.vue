<template>
  <div class="audio" >
    <headBar headline="Audio"
             pageInfoHeadline="Audio:"
             pageInfo="Hier können Sie einstellen, mit welcher Geschwindigkeit und Lautstärke die Audios der Gemälde
                        abgespielt werden. Außerdem können Sie einstellen, ob die Audios bei Aufruf eines Gemäldes automatisch
                        abgespielt werden sollen. Klicken Sie auf speichern, um Ihre Einstellungen zu speichern."></headBar>
    <div class="content">
      <span class="setting">Autoplay
        <i class="fas fa-toggle-on toggleAutoplay" v-on:click="toggle"></i>
      </span>
      <span class="setting">Lautstärke</span>
      <slider
              class="slider"
              ref="volumeSlider"
              v-model="soundValue"
              :value="soundValue"
              :adsorb="true"
              :interval="1"
              :max="9"
              :drag-on-click="true"
              :contained="true"
      ></slider>
      <span class="setting">Geschwindigkeit</span>
      <slider
              class="slider"
              ref="speedSlider"
              v-model="speedValue"
              :value="speedValue"
              :adsorb="true"
              :interval="0.1"
              :max="2"
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
    import { Howl, Howler } from "howler";
    import Vue from "vue";

    export default {
        name: "Audio",
        components: {headBar, toolBar, slider, Vue, Howl},
        data() {
            return {
                soundValue: 1,
                speedValue: 1,
            }
        },
        mounted() {
            this.checkLocalStorage();
        },
        methods: {
            toggle() {
                let toggleIcon = document.querySelector(".toggleAutoplay");
                if (toggleIcon.classList.contains("fa-toggle-on")) {
                    toggleIcon.classList.replace("fa-toggle-on", "fa-toggle-off");
                } else {
                    toggleIcon.classList.replace("fa-toggle-off", "fa-toggle-on");
                }
            },
            saveSettings() {
                let autoplay = document.querySelector(".fa-toggle-off");
                localStorage.autoplay = autoplay === null;
                localStorage.volume = this.$refs.volumeSlider.getValue();
                localStorage.audioSpeed = this.$refs.speedSlider.getValue();
            },
            checkLocalStorage() {
                if (localStorage.autoplay) {
                    if (localStorage.autoplay === "true")
                        document.querySelector(".toggleAutoplay").className = "fas fa-toggle-on toggleAutoplay";
                    else
                        document.querySelector(".toggleAutoplay").className = "fas fa-toggle-off toggleAutoplay";
                }
                if (localStorage.volume) {
                  this.soundValue = parseInt(localStorage.volume);
                  this.$refs.volumeSlider.setValue(parseFloat(localStorage.volume));
                }
                if (localStorage.audioSpeed) {
                    this.speedValue = parseFloat(localStorage.audioSpeed);
                    this.$refs.speedSlider.setValue(parseFloat(localStorage.audioSpeed));
                }

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
      background: $accent;
      padding: $abstand-S;
      margin-top: $abstand-M;
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

  //*********************** Following classes are there to style the vue-slider-comonent

  .vue-slider-rail {
    height: 2px;
    background-color: $light;
  }

  .vue-slider-process {
    background-color: $accentDark;
  }

  .vue-slider-mark-step {
    background-color: $accent;
  }

  .vue-slider-dot-handle {
    background-color: $accent;
  }

  .vue-slider-dot-tooltip-inner {
    background-color: $accent;
  }

  .vue-slider-dot-handle::after {
    background-color: $accentTransparent;
  }

</style>