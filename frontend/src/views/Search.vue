<template>
  <div class="search">
    <head-bar headline="Suche"></head-bar>
    <div class="wrapper">
      <input
        type="search input-field"
        class="searchInput animated fadeIn"
        placeholder="Tippe um zu suchen..."
      />
    </div>
    <ul>
      <li class="animated fadeIn" v-for="painting in paintingMatch" v-bind:key="painting.title">
        <painting-with-infos
          v-bind:src="painting.imgSrc[0]"
          v-bind:alt="painting.title"
          v-bind:name="painting.title"
          v-bind:painting-id="painting.id"
        ></painting-with-infos>
      </li>
    </ul>
    <toolBar current-page="search"></toolBar>
  </div>
</template>

<script>
import toolBar from "../components/toolBar.vue";
import headBar from "../components/headBar";
import axios from "axios";
import paintingWithInfos from "../components/paintingWithInfos";

export default {
  name: "Search",
  components: { toolBar, headBar, paintingWithInfos },
  data() {
    return {
      id: 0,
      paintingMatch: []
    };
  },
  async created() {
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
    this.addSearchListener();
  },
  methods: {
    findPaintingsByTitle(title) {
      title = title.toUpperCase();
      let findings = [];
      this.paintingList.forEach(function(elm) {
        let elmTitle = elm.title.toUpperCase();
        if (elmTitle.substring(0, title.length) === title) findings.push(elm);
      });
      return findings;
    },
    findPaintingsByDate(date) {
      let findings = [];
      this.paintingList.forEach(function(elm) {
        let datedString = elm.dated.toString();
        if (datedString.substring(0, date.length) === date) findings.push(elm);
      });
      return findings;
    },
    addSearchListener() {
      let _this = this;
      let searchInput = document.querySelector(".searchInput");
      searchInput.addEventListener("input", function() {
        if (!isNaN(parseInt(searchInput.value)))
          _this.paintingMatch = _this.findPaintingsByDate(searchInput.value);
        else if (searchInput.value !== "")
          _this.paintingMatch = _this.findPaintingsByTitle(searchInput.value);
        else _this.paintingMatch = [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";
@import "../assets/scss/030-typo.scss";

.wrapper {
  display: flex;
  justify-content: center;
  margin-top: $app-bar-height;
}

.input-field {
  padding: $button-padding $abstand-M $button-padding $abstand-M;
  color: white;
  flex-grow: 1;
  flex-shrink: 1;
  margin-right: $abstand-M;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px $light solid;
  transition: 0.5s;
  height: auto;
  margin-bottom: 0;
}

.searchInput {
  position: relative;
  width: 100%;
  margin: $abstand-M;
  padding: $button-padding $abstand-M $button-padding $abstand-M;
  color: white;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px $light solid;
  transition: 0.5s;
}
.searchInput:focus {
  border: 1px $accent solid;
  transition: 0.5s;
  outline: none;
}
</style>