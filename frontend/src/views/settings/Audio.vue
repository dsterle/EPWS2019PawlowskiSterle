<template>
  <span class="audio">
    <headBar headline="Audio"></headBar>
    <div class="content">
      <div class="card card-autoplay">
        <p class="setting headline">
          Autoplay
          <!-- <i class="fas fa-toggle-on toggleAutoplay" v-on:click="toggle"></i> -->
        </p>
        <div class="switch">
          <label>
            <input js-toggle-autoplay type="checkbox" checked />
            <span class="lever"></span>
          </label>
        </div>
      </div>
      <div class="card">
        <p class="setting headline">Lautstärke</p>
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
      </div>
      <div class="card">
        <p class="setting headline">Geschwindigkeit</p>
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
      </div>
      <button class="saveButton button-text" @click="saveSettings">Speichern</button>
    </div>
    <toolBar current-page="settings"></toolBar>
  </span>
</template>

<script>
import headBar from "../../components/headBar";
import toolBar from "../../components/toolBar";
import slider from "vue-slider-component";
import { Howl, Howler } from "howler";
import Vue from "vue";

export default {
  name: "Audio",
  components: { headBar, toolBar, slider, Vue, Howl },
  data() {
    return {
      soundValue: 1,
      speedValue: 1
    };
  },
  mounted() {
    this.checkLocalStorage();
  },
  methods: {
    saveSettings() {
      let autoplay = document.querySelector("[js-toggle-autoplay]");
      localStorage.autoplay = autoplay.checked;
      localStorage.volume = this.$refs.volumeSlider.getValue();
      localStorage.audioSpeed = this.$refs.speedSlider.getValue();
    },
    checkLocalStorage() {
      if (localStorage.autoplay) {
        if (localStorage.autoplay === "true")
          document.querySelector("[js-toggle-autoplay]").checked = true;
        else document.querySelector("[js-toggle-autoplay]").checked = false;
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
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables";

.audio {
  .content {
    padding: $abstand-M;
    padding-bottom: $abstand-XXXL;

    .card-autoplay {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .setting {
    display: flex;
    justify-content: space-between;
    
    // padding: $abstand-M;
    color: $lighter;
    font-size: $font-size-L;
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
    padding: 0 !important;
    margin-top: $abstand-M;
  }
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
</style>