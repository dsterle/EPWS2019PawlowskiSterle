<template>
  <div class="history">
    <headBar headline="Verlauf"></headBar>
    <ul>
      <li v-for="painting in paintingHistory" v-bind:key="painting.id">
        <painting-with-infos
                v-bind:src="painting.imgSrc"
                v-bind:alt="painting.title"
                v-bind:name="painting.title"
                v-bind:dated="painting.dated"
                v-bind:painting-id="painting.id"
                v-bind:time="painting.time">
        </painting-with-infos>
      </li>
    </ul>
    <toolBar current-page="history"></toolBar>
  </div>
</template>

<script>
    import headBar from "../components/headBar";
    import toolBar from "../components/toolBar";
    import Vue from "vue";
    import paintingWithInfos from "../components/paintingWithInfos";

    export default {
        name: "history",
        components: {headBar, toolBar, Vue, paintingWithInfos},
        data() {
            return {
              paintingHistory: localStorage.paintingHistory ? JSON.parse(localStorage.paintingHistory) : []
            }
        },
        created() {
            console.log(JSON.parse(localStorage.paintingHistory))
        }
    }
</script>

<style lang="scss" scoped>

</style>