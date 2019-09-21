<template>
  <div class="painting">
    <div class="app-bar-wrapper">
      <a class="back-icon" @click="$router.push({path: `/`})">
        <img src="../assets/icons/arrow_back.svg" />
      </a>
    </div>
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="pause"></fab>
    <img v-bind:src="painting.imgSrc" alt />
    <div class="title-wrapper">
      <h1 class="title-text">{{ painting.title }}</h1>
      <p class="hint-text year">{{ painting.dated }}</p>
    </div>
    <ul class="info-list">
      <li v-for="info in painting.infos" v-bind:key="info.name">
        <accordion
          v-bind:id="info.id"
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
      // Das aktuelle Gemälde
      painting: {},
      // Der Titel des Gemäldes
      titleInfo: {
        paused: false,
        audio: {}
      },
      fabIcon: require("../assets/icons/pause.svg"),
      pauseIcon: require("../assets/icons/pause.svg"),
      playIcon: require("../assets/icons/play.svg"),
      // currentLoop beinhaltet eine setInterval-Methode, die sich um die
      // Aktualisierung des Audio-SLiders kümmert
      currentLoop: {},
      topic: {}
    };
  },
  created() {
    this.topic = this.$route.params.userid;

    // titleInfo ist der Titel des Gemäldes, dieser wird zu Beginn abgespielt und kann nicht erneut ausgewählt werden
    this.titleInfo.audio = new Howl({
      src: [this.painting.audioSrc],
      onend: function() {
        this.setCurrent(0);
      }
    });
    this.titleInfo.audio.play();
  },
  mounted() {
    var this_component = this;

    // Lade unsere simulierte Datenbank
    let paintings = require("../data/database.js").paintings;
    var _this = this;
    var painting = this.painting;

    // Das Gemälde mit der bestimmten ID wird aus der Datenbank herausgesucht und gespeichert
    this.id = parseInt(this.$route.params.id);
    this.painting = paintings.find(painting => {
      return painting.id === this.id;
    });

    // Schleife über jede Info (Accordion)
    this.painting.infos.forEach(info => {
      // current zeigt an, ob die Info ausgewählt ist (kann währenddessen auch pausiert sein)
      info.current = false;
      // paused zeigt an, ob die Info pausiert ist
      info.paused = false;
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
          _this.setCurrent(info.id + 1);
        }
      });
    });

    this.setPositionOfFab();
    var MQTTHandler = require("../assets/js/MQTTHandler");
    // MQTTHandler.handleMQTTConnection(this.server.host);
    MQTTHandler.handleMQTTConnection(this, this.topic, "paintingClient");
  },
  methods: {
    /**
     * Problem: Wenn der fab zur rechten und unteren Seite ein margin hat, schiebt er
     * sich im Laufe des Abspielens der Audiodatei hin und her
     * (manchmal wird der Screen größer)
     * Deswegen werden in dieser Methode die Maße des Screens ermittelt und dem fab ein
     * linkes und rechtes margin gegeben
     * Am Ende soll der fab in der unteren rechten Ecke des Screens zu finden sein
     */
    setPositionOfFab() {
      var fab = this.$el.querySelector("[js-fab]");

      var fabSize = 56;
      var margin = 16;

      const marginLeft = screen.width - fabSize - margin;
      const marginTop = screen.height - fabSize - margin;

      fab.style.marginLeft = marginLeft + "px";
      fab.style.marginTop = marginTop + "px";
    },
    setCurrent(id) {
      /**
       * setCurrent ist dazu da eine Info mit der übergebenen id auszuwählen
       */

      // Falls der Titel noch gesprochen wird, wird dieser gestoppt
      this.titleInfo.audio.stop();
      var _this = this;

      this.painting.infos.forEach(info => {
        if (info.id === id) {
          // Falls die Audioinfo, die angeklickt wurde noch aktiv ist, wird diese zuerst gestoppt
          info.audio.stop();
          // Wenn die id übereinstimmt, wird current auf true gesetzt und currentValue auf 0 zurückgesetzt
          clearInterval(_this.currentLoop);
          info.current = true;
          info.currentValue = 0;
          // die ausgewählte Audio Information beginnt zu spielen
          this.rerenderInfo(info);
          info.audio.play();
        } else {
          // Wenn die id nicht übereinstimmt, wird die Info resettet
          _this.resetInfo(info);
          _this.rerenderInfo(info);
        }
      });
      // Das fabIcon wird auf Pause zurückgesetzt
      this.fabIcon = this.pauseIcon;
    },
    /**
     * setSlider dient dazu den Audio-Slider zu setzen
     * max ist die Länge der Audiodatei
     */
    setSlider(info) {
      info.min = 0;
      info.max = parseInt(info.audio.duration().toFixed(0));
      info.currentValue = 0;

      this.rerenderInfo(info);
    },
    /**
     * updateSlider wird jedes mal ausgeführt, wenn eine Audiodatei anfängt zu spielen
     * Hier fängt ein Loop an, der den value des Audio-Sliders regelmäßig aktualisiert
     */
    updateSlider(info) {
      var _this = this;
      var playingInfo = this.getPlayingInfo();

      this.currentLoop = setInterval(() => {
        info.currentValue = parseInt(playingInfo.audio.seek().toFixed(0));
        _this.rerenderInfo(info);
      }, 100);
    },
    /**
     * pause wird ausgeführt, sobald der fab geklickt wurde
     */
    pause() {
      var playingInfo = this.getPlayingInfo();

      if (playingInfo) {
        // Die aktuell spielende Info wird pausiert
        this.pauseInfo(playingInfo);
      } else if (this.titleInfo.audio.playing()) {
        // Der Titel wird pausiert
        this.pauseInfo(this.titleInfo);
      } else if (this.titleInfo.paused) {
        // Der Titel wird wieder abgespielt
        this.playInfo(this.titleInfo);
      } else {
        // Die pausierte Info wird wieder abgespielt
        this.playInfo(this.getPausedInfo());
        this.updateSlider(this.getPausedInfo());
      }
    },
    /**
     * pauseInfo dient dazu eine Info zu pausieren
     */
    pauseInfo(info) {
      // Die übergebene Info wird pausiert, dazu wird der currentLoop, der für den AUdio-Slider verantwortlich ist beendet
      info.paused = true;
      info.audio.pause();
      this.fabIcon = this.playIcon;
      clearInterval(this.currentLoop);
    },
    /**
     * playInfo dient dazu eine Info, die pausiert war, wieder abzuspielen
     */
    playInfo(info) {
      // Hier wird das audio-Object der Info weitergespielt und das Icon für den fab gesetzt
      info.paused = false;
      info.audio.play();
      this.fabIcon = this.pauseIcon;
    },
    /**
     * jumpTo wird ausgeführt wenn der Benutzer den Audio-Slider zu einer anderen Position zieht
     * name ist der Name des Accordions
     * newValue ist die neue value zu der gesprungen werden soll
     */
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
    /**
     * rerenderInfo dient dazu die Liste der Accordions neu zu rendern
     * name ist hierbei ein key-Attribut und sobald dieses verändert wurde, wird die
     * gesamte Info-Liste aktualisiert
     */
    rerenderInfo(info) {
      // TODO hopefully there is a better way to do the key-render technique
      var name = info.name;
      info.name = "";
      info.name = name;
    },
    /**
     * resetInfo setzt die Attribute der übergebenen Info zurück
     */
    resetInfo(info) {
      info.audio.stop();
      info.current = false;
      info.paused = false;
      info.currentValue = 0;
    },
    /**
     * getPlayingInfo gibt die Info, die gerade abgespielt wird
     */
    getPlayingInfo() {
      return this.painting.infos.find(info => {
        return info.audio.playing();
      });
    },
    /**
     * getPausedInfo gibt die die Info, die aktuell pausiert ist
     * es kann immer nur eine Info gleichzeitig pausiert sein
     */
    getPausedInfo() {
      return this.painting.infos.find(info => {
        return info.paused;
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path) {
      let paintings = require("../data/database.js").paintings;
      let painting = this.painting;
      this.id = parseInt(to.params.id);
      this.painting = paintings.find(painting => {
        return painting.id === this.id;
      });
      next();
    } else {
      next(false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.painting {
  .app-bar-wrapper {
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
    position: fixed;
    display: flex;
    height: $app-bar-height;
    width: 100%;
    align-items: center;
    z-index: 2;

    .back-icon {
      margin-left: $abstand-M;
    }
  }

  .fab {
    position: fixed;
    // margin: 0 $abstand-M $abstand-M 0;
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