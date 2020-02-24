<template>
  <div class="history">
    <headBar headline="Verlauf"
    page-info-headline="Verlauf:"
    page-info="Hier können Sie auf die letzten Gemälde zugreifen, die Sie sich angeschaut haben. Die Anzahl der Einträge
                ist auf 10 begrenzt."></headBar>
    <div class="content">
      <ul>
        <li v-for="painting in paintingHistory" v-bind:key="painting.id">
          <painting-with-infos
            v-bind:src="painting.src"
            v-bind:alt="painting.title"
            v-bind:name="painting.title"
            v-bind:dated="painting.dated"
            v-bind:painting-id="painting.id"
            v-bind:time="painting.time + ' Uhr'"
          ></painting-with-infos>
        </li>
      </ul>
    </div>
    <toolBar current-page="home"></toolBar>
  </div>
</template>

<script>
import headBar from "../components/headBar";
import toolBar from "../components/toolBar";
import Vue from "vue";
import paintingWithInfos from "../components/paintingWithInfos";

export default {
  name: "history",
  components: { headBar, toolBar, Vue, paintingWithInfos },
  data() {
    return {
      paintingHistory: localStorage.paintingHistory
        ? JSON.parse(localStorage.paintingHistory)
        : []
    };
  },
  created() {
    console.log(JSON.parse(localStorage.paintingHistory));
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.content {
  margin-top: $app-bar-height;
  margin-bottom: $app-bar-height;
}
</style>