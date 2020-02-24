<template>
  <div class="painting">
    <div class="maximizedImageBackground minimized"></div>
    <headBar
      v-if="painting.title !== undefined"
      v-bind:headline="painting.title.substring(0, 18) + '...'"
      page-info-headline="Gemäldeansicht:"
      page-info="Hier erhalten sie textuelle und auditive Informationen. Das Bild können Sie (sofern mehr als ein Punkt
                  auf dem Bild zusehen ist) nach links wischen, um alternative Gemäldeansichten zu sehen.
                  Über die Lautsprechericons starten sie eine Audio.
                  Über den violetten Button unten rechts können Sie die Audio pausieren."
    ></headBar>
    <fab
      js-fab
      class="fab animated bounceIn"
      v-bind:src="fabIcon"
      alt="Pause Knopf"
      v-on:fab-clicked="pause"
      v-bind:enabled="anyAudioCurrent"
    ></fab>
    <div class="content">
      <imgSlider class="image animated fadeIn" v-bind:img="painting.img"></imgSlider>
      <!-- <img v-bind:src="painting.imgSrc" alt /> -->
      <div class="title-wrapper animated fadeIn">
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
import inputField from "../components/inputField";

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
    console.log("created");
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
                img {
                  src
                  description
                }
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

    // if (localStorage.autoplay === "true" && this.checkCategoryToPlay() !== null)
    //   this.setCurrent(this.checkCategoryToPlay());
    const MQTTHandler = require("../assets/js/MQTTHandler");
    MQTTHandler.handleMQTTConnection(this, this.topic);
    this.updateHistory();

    this.disableFab();

    if (localStorage.categoriesToShow)
      await _this.checkCategoriesToShow(
        localStorage.categoriesToShow,
        _this.painting.infos
      );

    this.setupPaintingInfos();

    // Wenn autoplay aktiviert ist fängt die erste Info an zu spielen
    if (localStorage.autoplay === "true") {
      this.setCurrent(0);
    }
  },
  destroyed() {
    this.painting.infos.forEach(info => {
      this.resetInfo(info);
    });
  },
  mounted() {
    let _this = this;
    this.currentPainting = parseInt(this.$route.params.id);
    localStorage.currentPainting = parseInt(this.$route.params.id);
  },
  methods: {
    /**
     * updateHistory fügt das aktuelle Painting dem Verlauf hinzu
     */
    updateHistory() {
      let time = new Date();
      time =
        time.getDate() +
        "." +
        time.getMonth() +
        "." +
        time.getFullYear() +
        " " +
        time.getHours() +
        "." +
        time.getMinutes() +
        "." +
        time.getSeconds();
      console.log(this.painting);
      this.history.unshift({
        id: parseInt(this.$route.params.id),
        title: this.painting.title,
        dated: this.painting.dated,
        src: this.painting.img[0].src,
        time: time
      });
      if (this.history.length === 11)
          this.history.pop();
      localStorage.setItem("paintingHistory", JSON.stringify(this.history));
    },
    /**
     * checkCategoriesToShow prüft den localstorage.categoriesToShow darauf hin, ob
     * nur bestimmte Kategorien angezeigt werden sollen
     */
    async checkCategoriesToShow(categoriesToShow, paintingInfos) {
      let _this = this;
      let newInfos = [];
      let index = 0;

      if (categoriesToShow !== null) {
        await paintingInfos.forEach(info => {
          if (localStorage.categoriesToShow.includes(info.name.toLowerCase())) {
            // info.id = index;
            let newInfo = info;
            newInfo.id = index;
            newInfos.push(newInfo);
            index++;
          }
        });
      }
      this.painting.infos = newInfos;
    },
    /**
     * setupPaintingInfos ist dazu da jedes Info-Accordion mit einer Sounddatei zu versehen
     * Es werden Informationen gespeichert, ob die Datei gerade läuft oder pausiert wurde usw.
     */
    setupPaintingInfos() {
      let _this = this;

      // Schleife über jede Info (Accordion)
      _this.painting.infos.forEach(info => {
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
            _this.updateSlider(
              _this.painting.infos[_this.painting.infos.indexOf(info)]
            );
          },
          onend: function() {
            info.currentValue = 0;
            info.current = false;
            clearInterval(_this.currentLoop);
            if (
              _this.painting.infos.indexOf(info) + 1 !==
              _this.painting.infos.length
            ) {
              _this.setCurrent(
                _this.painting.infos[_this.painting.infos.indexOf(info) + 1].id
              );
            }
          },
          onstop: function() {
            // Jedesmal wenn irgendeine Audionachricht gestoppt wird, wird geschaut ob der fab angepasst
            _this.disableFab();
          }
        });
      });
    },
    /**
     * setCurrent ist dazu da eine Info mit der übergebenen id auszuwählen
     */
    setCurrent(id) {
      this.enableFab();

      let _this = this;

      this.painting.infos.forEach(info => {
        if (info.id === id) {
          // Falls die Audioinfo, die angeklickt wurde noch aktiv ist, wird diese zuerst gestoppt
          Vue.prototype.$audioHowls[info.id].stop();
          // Wenn die id übereinstimmt, wird current auf true gesetzt und currentValue auf 0 zurückgesetzt
          clearInterval(_this.currentLoop);
          info.current = true;
          info.currentValue = 0;
          // die ausgewählte Audio Information beginnt zu spielen
          Vue.prototype.$audioHowls[info.id].play();
          this.rerenderInfo(info);
        } else {
          // Wenn die id nicht übereinstimmt, wird die Info resettet
          _this.resetInfo(info);
          _this.rerenderInfo(info);
        }
      });
      // Das fabIcon wird auf Pause zurückgesetzt
      this.fabIcon = this.pauseIcon;
    },
    enableFab() {
      let fab = document.querySelector(".fab");
      if (fab) {
        if (fab.classList.contains("disabled")) {
          fab.classList.remove("disabled");
        }
      }
    },
    disableFab() {
      if (!this.anyAudioCurrent()) {
        let fab = document.querySelector(".fab");
        if (fab) {
          fab.classList.add("disabled");
        }
      }
    },
    /**
     * setSlider dient dazu den Audio-Slider zu setzen
     * max ist die Länge der Audiodatei
     */
    setSlider(info) {
      info.min = 0;
      info.max = parseInt(
        Vue.prototype.$audioHowls[info.id].duration().toFixed(0)
      );
      info.currentValue = 0;

      this.rerenderInfo(info);
    },
    /**
     * updateSlider wird jedes mal ausgeführt, wenn eine Audiodatei anfängt zu spielen
     * Hier fängt ein Loop an, der den value des Audio-Sliders regelmäßig aktualisiert
     */
    updateSlider(info) {
      let _this = this;
      let playingInfo = info;

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
          //Wenn die letzte Audio erreicht ist
        } else if (
          playingInfo.id ===
          _this.painting.infos[_this.painting.infos.length - 1].id
        ) {
          //Um vorzeitiges Beenden der Audio zu verhindern
          setTimeout(function() {
            _this.resetInfo(playingInfo);
          }, 300);
        }
      }, 100);
    },
    /**
     * pause wird ausgeführt, sobald der fab geklickt wurde
     */
    pause() {
      let playingInfo = this.getPlayingInfo();
      let pausedInfo = this.getPausedInfo();

      if (playingInfo) {
        // Die aktuell spielende Info wird pausiert
        this.pauseInfo(playingInfo);
      } else if (pausedInfo) {
        // Die pausierte Info wird wieder abgespielt
        this.playInfo(pausedInfo);
        this.updateSlider(pausedInfo);
      } else {
        // Wenn noch keine Audio angefangen wurde, wird von die erste gestartet
        this.setCurrent(this.painting.infos[0].id);
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
      Vue.prototype.$audioHowls[info.id].stop();
      info.current = false;
      info.paused = false;
      info.currentValue = 0;
    },
    /**
     * getPlayingInfo gibt die Info, die gerade abgespielt wird
     */
    getPlayingInfo() {
      let info;
      for (let i = 0; i < Vue.prototype.$audioHowls.length; i++) {
        if (Vue.prototype.$audioHowls[i] !== undefined)
          if (Vue.prototype.$audioHowls[i].playing()) {
            this.painting.infos.forEach(function(elm) {
              if (i === elm.id) return (info = elm);
            });
          }
      }
      return info;
    },
    /**
     * getPausedInfo gibt die die Info, die aktuell pausiert ist
     * es kann immer nur eine Info gleichzeitig pausiert sein
     */
    getPausedInfo() {
      return this.painting.infos.find(info => {
        return info.paused;
      });
    },
    anyAudioCurrent() {
      let anyAudioCurrent = false;
      // console.log(this.painting.infos);
      this.painting.infos.forEach(info => {
        // console.log(info.current);
        if (info.current === true) {
          anyAudioCurrent = true;
        }
      });
      return anyAudioCurrent;
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
              img {
                src
                description
              }
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
    animation-delay: 200ms;
    transition: 0.3s;
  }

  .content {
    margin-top: $app-bar-height;

    .image {
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
      margin-bottom: $abstand-XXXXL;
    }
  }
}
</style>