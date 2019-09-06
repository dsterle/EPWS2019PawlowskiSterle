<template>
  <div class="painting">
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="pause"></fab>
    <img v-bind:src="painting.imgSrc" alt />
    <div class="title-wrapper">
      <h1 class="title-text">{{ painting.title }}</h1>
      <p class="hint-text year">{{ painting.dated }}</p>
    </div>
    <ul class="info-list">
      <li v-for="info in painting.infos" v-bind:key="info.name">
        <accordion
          v-bind:name="info.name"
          v-bind:text="info.inhalt"
          v-bind:current="info.current"
          v-bind:min="info.min"
          v-bind:max="info.max"
          v-bind:currentValue="info.currentValue"
          v-on:play-audio="setCurrent"
          v-on:jump-to="jumpTo"
        ></accordion>
      </li>
    </ul>
  </div>
</template>

<script>
import accordion from "../components/accordion";
import fab from "../components/fab";
import { Howl, Howler } from "howler";
import Vue from "vue";

export default {
  name: "painting",
  components: { accordion, fab },
  data() {
    return {
      id: {},
      painting: {},
      audios: new Array(),
      titleInfo: {
        paused: false,
        audio: {}
      },
      fabIcon: require("../assets/icons/pause.svg"),
      pauseIcon: require("../assets/icons/pause.svg"),
      playIcon: require("../assets/icons/play.svg"),
      currentLoop: {},
      pausedInfo: {}
    };
  },
  mounted() {
    // lade unsere simulierte Datenbank
    let paintings = require("../data/database.js").paintings;
    var _this = this;
    var painting = this.painting;

    // das Gemälde mit der bestimmten ID wird aus der Datenbank herausgesucht und gespeichert
    this.id = parseInt(this.$route.params.id);
    this.painting = paintings.find(painting => {
      return painting.id === this.id;
    });

    // titleInfo ist der Titel des Gemäldes, dieser wird zu Beginn abgespielt und kann nicht erneut ausgewählt werden
    this.titleInfo.audio = new Howl({
      src: [this.painting.audioSrc],
      onend: function() {
        _this.playNext(0);
      }
    });
    this.titleInfo.audio.play();

    // um zu wissen welches Accordion gerade abgespielt wird, wird jedem ein current = false Attribut gegeben
    // außerdem wird jedem Accordion ein Howl gegeben, mit der das Audio manipuliert werden kann

    this.painting.infos.forEach(info => {
      info.current = false;
      info.audio = new Howl({
        src: [info.audioSrc],
        onload: function() {
          _this.setSlider(info);
        },
        onplay: function() {
          clearInterval(_this.currentLoop);
          _this.updateSlider(info);
        },
        onend: function() {
          info.currentValue = 0;
          info.current = false;
          clearInterval(_this.currentLoop);
          _this.playNext(info.id + 1);
        }
      });
    });
  },
  methods: {
    setCurrent(name) {
      // Zuerst werden alle Audiodateien, die
      this.titleInfo.audio.stop();

      var playingInfo = this.getPlayingInfo();

      if (playingInfo) {
        playingInfo.audio.stop();
        playingInfo.current = false;
      }

      this.painting.infos.forEach(info => {
        if (info.name === name) {
          this.rerenderInfo(info);
          clearInterval(this.currentLoop);
          info.current = true;
          info.currentValue = 0;
          // die ausgewählte Audio Information beginnt zu spielen
          info.audio.play();
        } else {
          info.current = false;
          this.fabIcon = this.pauseIcon;
        }
      });
    },
    setSlider(info) {
      // Sobald das Howl geladen wurde, werden in der Info noch weitere Attribute gespeichert,
      // die dem Slider dienen sollen
      info.min = 0;
      info.max = parseInt(info.audio.duration().toFixed(0));
      info.currentValue = 0;

      this.rerenderInfo(info);
    },
    updateSlider(info) {
      var _this = this;
      var playingInfo = this.getPlayingInfo();

      this.currentLoop = setInterval(() => {
        info.currentValue = playingInfo.audio.seek().toFixed(0);
        _this.rerenderInfo(info);
      }, 20);
    },
    pause() {
      var playingInfo = this.getPlayingInfo();

      if (playingInfo) {
        this.fabIcon = this.playIcon;
        playingInfo.audio.pause();
        this.pausedInfo = playingInfo;
        clearInterval(this.currentLoop);
      } else if (this.titleInfo.audio.playing()) {
        this.titleInfo.audio.pause();
        this.fabIcon = this.playIcon;
        this.titleInfo.paused = true;
      } else if (this.titleInfo.paused) {
        this.titleInfo.paused = false;
        this.titleInfo.audio.play();
        this.fabIcon = this.pauseIcon;
      } else {
        this.fabIcon = this.pauseIcon;
        this.updateSlider(this.pausedInfo);
        this.pausedInfo.audio.play();
      }
    },
    playNext(id) {
      var nextInfo = this.painting.infos.find(info => {
        return info.id === id;
      });

      if (nextInfo) {
        // die nächste Audiodatei wird auf current gesetzt
        this.setCurrent(nextInfo.name);
      }
    },
    jumpTo({ name, newValue }) {
      this.painting.infos.forEach(info => {
        if (info.name === name) {
          info.currentValue = newValue;

          this.rerenderInfo(info);
          // springe in der Audiodatei zu der Sekunde newValue
          info.audio.seek(newValue);
        }
      });
    },
    rerenderInfo(info) {
      // TODO hopefully there is a better way to do the key-render technique
      var name = info.name;
      info.name = "";
      info.name = name;
    },
    getPlayingInfo() {
      return this.painting.infos.find(info => {
        return info.audio.playing();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.painting {
  .fab {
    position: fixed;
    margin: 0 $abstand-M $abstand-M 0;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .title-wrapper {
    padding: $abstand-M $abstand-M 0 $abstand-M;

    .year {
      margin: $abstand-S 0 $abstand-S 0;
    }
  }

  .info-list {
    margin-bottom: $abstand-XXXL;
  }
}
</style>