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
      fabIcon: require("../assets/icons/pause.svg"),
      audioTitle: {}
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

    // audioTitle ist der Titel des Gemäldes, dieser wird zu Beginn abgespielt und kann nicht erneut ausgewählt werden
    this.audioTitle = new Howl({
      src: [this.painting.audioSrc],
      onend: function() {
        _this.playNext(0);
      }
    });
    this.audioTitle.play();

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
          _this.updateSlider(info);
        },
        onend: function() {
          _this.playNext(info.id + 1);
        }
      });
    });
  },
  methods: {
    setCurrent(name) {
      this.painting.infos.forEach(info => {
        if (info.name === name) {
          // ? change key attribute to rerender list
          // TODO there is hopefully a better way to do the key-render technique
          info.name = "";
          info.name = name;
          info.current = true;
          // die ausgewählte Audio Information beginnt zu spielen
          info.audio.play();
        } else {
          // jedes andere Audio wird gestoppt und current wird wieder auf false gesetzt
          this.audioTitle.stop();
          info.audio.stop();
          info.current = false;
        }
      });
    },
    setSlider(info) {
      // Sobald das Howl geladen wurde, werden in der Info noch weitere Attribute gespeichert,
      // die dem Slider dienen sollen
      info.min = 0;
      info.max = parseInt(info.audio.duration().toFixed(0));
      info.currentValue = 0;

      // TODO there is hopefully a better way to do the key-render technique
      // TODO try this with Vue.set(array, index, newValue)
      var name = info.name;
      info.name = "";
      info.name = name;
    },
    updateSlider(info) {
      var loop = setInterval(() => {
        if (info.currentValue < info.max) {
          info.currentValue++;
        }
        // TODO there is hopefully a better way to do the key-render technique
        var name = info.name;
        info.name = "...";
        info.name = name;

        if (!info.audio.playing()) {
          // wenn das Audio nicht mehr spielt, wird currentValue wieder auf 0 gesetzt und current = false
          // die setInterval-Methode wird beendet
          info.currentValue = 0;
          info.current = false;
          clearInterval(loop);
        }
      }, 1000);
    },
    pause() {
      if (this.audioPlaying) {
        this.fabIcon = require("../assets/icons/play.svg");
      } else {
        this.fabIcon = require("../assets/icons/pause.svg");
      }
      this.audioPlaying = !this.audioPlaying;
    },
    playNext(id) {
      var nextInfo = this.painting.infos.find(element => {
        return element.id === id;
      });

      if (nextInfo) {
        // die nächste Audiodatei wird auf current gesetzt
        this.setCurrent(nextInfo.name);
      }
    },
    jumpTo({ name, newValue }) {
      this.painting.infos.forEach(info => {
        if (info.name === name) {
          // ? change key attribute to rerender list
          // TODO there is hopefully a better way to do the key-render technique
          info.currentValue = newValue;
          info.name = "";
          info.name = name;
          info.current = true;
          // springe in der Audiodatei zu der Sekunde newValue
          info.audio.seek(newValue);
        }
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