<template>
  <div class="painting">
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="playAudio"></fab>
    <img
      src="http://lucascranach.org/thumbnails/DE_BStGS_1130_FR285E/01_Overall/DE_BStGS_1130_FR285E_2010_Overall.jpg"
      alt
    />
    <div class="content-wrapper">
      <h1 class="title-text">Painting {{ this.item }}</h1>
      <p class="hint-text year">1552</p>
      <accordion v-bind:item="item"></accordion>
      <accordion v-bind:item="item"></accordion>
      <accordion v-bind:item="item"></accordion>
      <accordion v-bind:item="item"></accordion>
      <accordion v-bind:item="item"></accordion>
      <accordion v-bind:item="item"></accordion>
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
      id: -1,
      fabIcon: require("../assets/icons/pause.svg"),
      audioPlaying: true
    };
  },
  beforeCreate() {
    // TODO Do this with fetch API
    console.log(require("../data/database.json"));
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
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