<template>
  <div class="painting">
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="playAudio"></fab>
    <img
      src="http://lucascranach.org/thumbnails/DE_BStGS_1130_FR285E/01_Overall/DE_BStGS_1130_FR285E_2010_Overall.jpg"
      alt
    />
    <div class="content-wrapper">
      <h1 class="title-text">Painting {{ $route.params.id }}</h1>
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
      item: {
        title: "Kurzbeschreibung",
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      fabIcon: require("../assets/icons/pause.svg"),
      audioPlaying: true
    };
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