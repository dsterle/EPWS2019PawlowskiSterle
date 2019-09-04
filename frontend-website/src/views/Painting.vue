<template>
  <div class="painting">
    <fab js-fab class="fab" v-bind:src="fabIcon" alt="Pause Knopf" v-on:fab-clicked="pause"></fab>
    <img v-bind:src="item.imgSrc" alt />
    <div class="content-wrapper">
      <h1 class="title-text">{{ item.title }}</h1>
      <p class="hint-text year">{{ item.dated }}</p>
      <ul class="info-list">
        <li v-for="info in item.infos" v-bind:key="info.name">
          <accordion
            v-bind:name="info.name"
            v-bind:text="info.inhalt"
            v-bind:current="info.current"
            v-on:playAudio="playAudio"
          ></accordion>
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
    playAudio(name) {
      // console.log(name);

      // the attribute current of the info text which was clicked will be set to true
      // this.item.infos.find(info => {
      // return info.name === name;
      // }).current = true;

      // this.item.infos.forEach(info => {
      //   if (info.name === name) {
      //     console.log(name);
      //     info.current = true;
      //     console.log(info.current);
      //   }
      // });

      for (var i = 0; i < this.item.infos.length; i++) {
        if (this.item.infos[i].name === name) {
          console.log("LOOOOOL");
          // ? change key attribute to rerender list
          // TODO there is hopefully a better way to do the key-render technique
          this.item.infos[i].name = "Hi";
          this.item.infos[i].name = name;
          this.item.infos[i].current = true;
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

  .content-wrapper {
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