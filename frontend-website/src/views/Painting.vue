<template>
  <div class="painting">
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="pause"></fab>
    <img v-bind:src="item.imgSrc" alt />
    <div class="title-wrapper">
      <h1 class="title-text">{{ item.title }}</h1>
      <p class="hint-text year">{{ item.dated }}</p>
    </div>
    <ul class="info-list">
      <li v-for="info in item.infos" v-bind:key="info.name">
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

export default {
  name: "painting",
  components: { accordion, fab },
  data() {
    return {
      id: {},
      item: {},
      audios: new Array(),
      fabIcon: require("../assets/icons/pause.svg")
    };
  },
  created() {
    // TODO Do this with fetch API
    let data = require("../data/database.json").gemälde;
    this.id = parseInt(this.$route.params.id);
    this.item = data.find(painting => {
      return painting.id === this.id;
    });

    // to know which audio is current add a current attribute to every accordion
    this.item.infos.forEach(element => {
      element.current = false;
    });
  },
  mounted() {
    // every audioSrc will be stored in an Array
    this.audios.push(this.item.audioSrc);
    this.item.infos.forEach(info => {
      this.audios.push(info.audioSrc);
    });
  },
  methods: {
    setCurrent(name) {
      for (var i = 0; i < this.item.infos.length; i++) {
        if (this.item.infos[i].name === name) {
          // ? change key attribute to rerender list
          // TODO there is hopefully a better way to do the key-render technique
          this.item.infos[i].name = "updateList";
          this.item.infos[i].name = name;
          this.item.infos[i].current = true;
        } else {
          this.item.infos[i].current = false;
        }
      }
    },
    pause() {
      // this.item.infos[0].name = "hi";
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