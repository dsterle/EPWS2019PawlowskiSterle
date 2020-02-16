<template>
  <div class="painting">
    <headBar
      v-if="painting.title !== undefined"
      v-bind:headline="painting.title.substring(0, 18) + '...'"
    ></headBar>
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="pause"></fab>
    <imgSlider class="image" v-bind:imgSrc="painting.imgSrc"></imgSlider>
    <!-- <img v-bind:src="painting.imgSrc" alt /> -->
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
    <toolBar current-page="painting"></toolBar>
  </div>
</template>

<script>
import accordion from "../components/accordion";
import fab from "../components/fab";
import { Howl, Howler } from "howler";
import Vue from "vue";
import imgSlider from "../components/imgSlider";
import axios from "axios";
import https from "https";
import headBar from "../components/headBar";
import toolBar from "../components/toolBar";

export default {
  name: "painting",
  components: { accordion, fab, imgSlider, headBar, toolBar },
  data() {
    return {
      id: 0,
      // Das aktuelle Gemälde
      painting: {},
      fabIcon: require("../assets/icons/pause.svg"),
      pauseIcon: require("../assets/icons/pause.svg"),
      playIcon: require("../assets/icons/play.svg"),
      // currentLoop beinhaltet eine setInterval-Methode, die sich um die
      // Aktualisierung des Audio-SLiders kümmert
      currentLoop: {},
      topic: {},
      history: []
    };
  },
  async created() {
    if (localStorage.paintingHistory) {
        this.history = JSON.parse(localStorage.paintingHistory);
    } else
        this.history = [];
    this.topic = this.$route.params.userid;
    this.id = parseInt(this.$route.params.id);

    let _this = this;
    let result = await axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      data: {
        query: `
            {
              painting(id: ${this.id}) {
                title
                imgSrc
                dated
                infos {
                  id
                  name
                  inhalt
                  audioSrc
                }
              }
            }
          `
      }
    });
    this.painting = result.data.data.painting;
    for (let i = 0; i < Vue.prototype.$audioHowls.length; i++) {
      if (Vue.prototype.$audioHowls[i] !== undefined) {
        console.log("abgefangen");
        return;
      }
    }
    this.setupPaintingInfos();
    if (localStorage.autoplay === "true")
      this.setCurrent(0);
    const MQTTHandler = require("../assets/js/MQTTHandler");
    MQTTHandler.handleMQTTConnection(this, this.topic, "paintingClient");
      this.updateHistory();
  },
  mounted() {
    let _this = this;
    //quick&dirty lösung: checkCategoriesToShow muss nach setupPaintingInfos ausgeführt werden
    //TODO bessere Lösung
    setTimeout(function () {
        //Wenn das Layout angepasst wurde, sollen nur bestimmte Kategorien angezeigt werden
        if (localStorage.categoriesToShow)
            _this.checkCategoriesToShow(
                localStorage.categoriesToShow,
                _this.painting.infos
            );
    }, 300);
    this.currentPainting = parseInt(this.$route.params.id);
    localStorage.currentPainting = parseInt(this.$route.params.id);
  },
  methods: {
      /**
       * updateHistory fügt das aktuelle Painting dem Verlauf hinzu
       */
      updateHistory() {
          let time = new Date();
          time = time.getDate() + "." + time.getMonth() + "." + time.getFullYear() + " " +
                  time.getHours() + "." + time.getMinutes() + "." + time.getSeconds()
          this.history.unshift({
              id: parseInt(this.$route.params.id),
              title: this.painting.title,
              dated: this.painting.dated,
              imgSrc: this.painting.imgSrc[0],
              time: time
          });
          localStorage.setItem("paintingHistory", JSON.stringify(this.history));
      },
      /**
       * checkCategoriesToShow prüft den localstorage.categoriesToShow darauf hin, ob
       * nur bestimmte Kategorien angezeigt werden sollen
       */
    checkCategoriesToShow(categoriesToShow, paintingInfos) {
      let _this = this;
      let newInfos = [];
      if (categoriesToShow !== null) {
        categoriesToShow = categoriesToShow.split(",");
        for (let i = 0; i < categoriesToShow.length; i++) {
          switch (categoriesToShow[i]) {
            case "kurzbeschreibung":
              newInfos.push(paintingInfos[0]);
              break;
            case "provenienz":
              newInfos.push(paintingInfos[1]);
              break;
            case "masse":
              newInfos.push(paintingInfos[2]);
              break;
            case "material":
              newInfos.push(paintingInfos[3]);
              break;
            case "beschriftung":
              newInfos.push(paintingInfos[4]);
              break;
            case "ausstellungsgeschichte":
              newInfos.push(paintingInfos[5]);
              break;
          }
        }
        _this.painting.infos = newInfos;
      }
    },
    /**
     * setupPaintingInfos ist dazu da jedes Info-Accordion mit einer Sounddatei zu versehen
     * Es werden Informationen gespeichert, ob die Datei gerade läuft oder pausiert wurde usw.
     */
    setupPaintingInfos() {
      let _this = this;
      let counter = 0;

      // Schleife über jede Info (Accordion)
      this.painting.infos.forEach(info => {
        // current zeigt an, ob die Info ausgewählt ist (kann währenddessen auch pausiert sein)
        info.current = false;
        // paused zeigt an, ob die Info pausiert ist
        info.paused = false;
        Vue.prototype.$audioHowls[info.id] = new Howl({
          src: [info.audioSrc],
          volume: localStorage.volume ? localStorage.volume : 1,
          rate: localStorage.audioSpeed ? localStorage.audioSpeed : 1,
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
        info.audio = Vue.prototype.$audioHowls[info.id];
      });
    },
    /**
     * setCurrent ist dazu da eine Info mit der übergebenen id auszuwählen
     */
    setCurrent(id) {
      let _this = this;

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
      let _this = this;
      let playingInfo = this.getPlayingInfo();

      this.currentLoop = setInterval(() => {
        // let currentValue = parseInt(playingInfo.audio.seek().toFixed(0));
        let currentValue = parseInt(
          Vue.prototype.$audioHowls[playingInfo.id].seek().toFixed(0)
        );
        localStorage.audioSliderPostition = currentValue;
        // Wenn die Audiodatei am Ende ist wird der Slider nicht bis zum rechten Rand bewegt,
        // da sonst die gesamte Seite etwas größer wird
        if (currentValue !== playingInfo.max) {
          // info.currentValue = currentValue;
          playingInfo.currentValue = currentValue;
          // _this.rerenderInfo(info);
          _this.rerenderInfo(playingInfo);
        }
      }, 100);
    },
    /**
     * pause wird ausgeführt, sobald der fab geklickt wurde
     */
    pause() {
      let playingInfo = this.getPlayingInfo();

      if (playingInfo) {
        // Die aktuell spielende Info wird pausiert
        this.pauseInfo(playingInfo);
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
      // info.audio.pause();
      Vue.prototype.$audioHowls[info.id].pause();
      this.fabIcon = this.playIcon;
      clearInterval(this.currentLoop);
    },
    /**
     * playInfo dient dazu eine Info, die pausiert war, wieder abzuspielen
     */
    playInfo(info) {
      // Hier wird das audio-Object der Info weitergespielt und das Icon für den fab gesetzt
      info.paused = false;
      // info.audio.play();
      Vue.prototype.$audioHowls[info.id].play();
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
          // info.audio.seek(newValue);
          Vue.prototype.$audioHowls[info.id].seek(newValue);
        }
      });
    },
    /**
     * rerenderInfo dient dazu die Liste der Accordions neu zu rendern
     * name ist hierbei ein key-Attribut und sobald dieses verändert wurde, wird die
     * gesamte Info-Liste aktualisiert
     */
    rerenderInfo(info) {
      let name = info.name;
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
      // return this.painting.infos.find(info => {
      //   return info.audio.playing();
      // });
      for (let i = 0; i < Vue.prototype.$audioHowls.length; i++) {
        if (Vue.prototype.$audioHowls[i] !== undefined)
          if (Vue.prototype.$audioHowls[i].playing())
            return this.painting.infos[i];
      }
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
  async beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path) {
      this.id = parseInt(to.params.id);

      let result = await axios({
        method: "POST",
        url: "http://localhost:4000/graphql",
        data: {
          query: `
          {
            painting(id: ${this.id}) {
              title
              imgSrc
              dated
              infos {
                id
                name
                inhalt
                audioSrc
              }
            }
          }
        `
        }
      });
      this.painting = result.data.data.painting;
      this.$router.go(0);
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
  .fab {
    position: fixed;
    right: 0;
    bottom: $abstand-XL;
    margin: 0 $abstand-M $abstand-M 0;
  }

  .image {
    margin-top: $abstand-S;
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