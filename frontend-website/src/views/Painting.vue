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
          v-on:playAudio="setCurrent"
        ></accordion>
      </li>
    </ul>
  </div>
</template>

<script>
import accordion from "../components/accordion";
import fab from "../components/fab";
import { Howl, Howler } from "howler";

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
  created() {
    // lade unsere simulierte Datenbank
    let paintings = require("../data/database.js").paintings;
    // das Gemälde mit der bestimmten ID wird aus der Datenbank herausgesucht und gespeichert
    this.id = parseInt(this.$route.params.id);
    this.painting = paintings.find(painting => {
      return painting.id === this.id;
    });

    // audioTitle ist der Titel des Gemäldes, dieser wird zu Beginn abgespielt und kann nicht erneut ausgewählt werden
    this.audioTitle = new Howl({
      src: [this.painting.audioSrc]
    });
    this.audioTitle.play();

    // um zu wissen welches Accordion gerade abgespielt wird, wird jedem ein current = false Attribut gegeben
    // außerdem wird jedem Accordion ein Howl gegeben, mit der das Audio manipuliert werden kann
    this.painting.infos.forEach(info => {
      info.current = false;
      info.audio = new Howl({
        src: [info.audioSrc]
      });
    });
  },
  methods: {
    setCurrent(name) {
      // for (var i = 0; i < this.painting.infos.length; i++) {
      //   if (this.painting.infos[i].name === name) {
      //     // ? change key attribute to rerender list
      //     // TODO there is hopefully a better way to do the key-render technique
      //     this.painting.infos[i].name = "update-list";
      //     this.painting.infos[i].name = name;
      //     this.painting.infos[i].current = true;
      //     // di jeweilige Audiodatei wird abgespielt
      //     this.painting.infos[i].audio.play();
      //   } else {
      //     // jedes andere Audio wird gestoppt
      //     this.audioTitle.stop();
      //     this.painting.infos[i].audio.stop();
      //     this.painting.infos[i].current = false;
      //   }
      // }

      this.painting.infos.forEach(info => {
        if (info.name === name) {
          // ? change key attribute to rerender list
          // TODO there is hopefully a better way to do the key-render technique
          info.name = "";
          info.name = name;
          info.current = true;
          info.audio.play();
        } else {
          // jedes andere Audio wird gestoppt und current wird wieder auf false gesetzt
          this.audioTitle.stop();
          info.audio.stop();
          info.current = false;
        }
      });
    },
    updateSlider() {},
    pause() {
      // this.painting.infos[0].name = "hi";
      if (this.audioPlaying) {
        this.fabIcon = require("../assets/icons/play.svg");
      } else {
        this.fabIcon = require("../assets/icons/pause.svg");
      }
      this.audioPlaying = !this.audioPlaying;
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