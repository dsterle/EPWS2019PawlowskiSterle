<template>
  <div class="painting">
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="playAudio"></fab>
    <img v-bind:src="item.imgSrc" alt />
    <div class="content-wrapper">
      <h1 class="title-text">{{ item.title }}</h1>
      <p class="hint-text year">{{ item.dated }}</p>
      <ul>
        <li v-bind:key="info.name" v-for="info in item.infos">
          <accordion v-bind:title="info.name" v-bind:text="info.inhalt"></accordion>
        </li>
      </ul>
    </div>
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
      item: {},
      id: {},
      fabIcon: require("../assets/icons/pause.svg"),
      audioPlaying: true,
      audio: {}
    };
  },
  created() {
    // TODO Do this with fetch API
    // fetch("../data/database.json")
    // .then(data => data.json)
    // .then(item => console.log("item " + item));
    let data = require("../data/database.json").gemälde;
    this.id = parseInt(this.$route.params.id);
    this.item = data.find(painting => {
      return painting.id === this.id;
    });
  },
  methods: {
    playAudio() {
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

  .content-wrapper {
    padding: $abstand-M $abstand-M 0 $abstand-M;

    .year {
      margin: $abstand-S 0 $abstand-S 0;
    }
  }
}
</style>