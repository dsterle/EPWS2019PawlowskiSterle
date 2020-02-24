<template>
  <div class="search">
    <head-bar headline="Suche"
              page-info-headline="Gemäldesuche:"
              page-info="Hier können Sie manuell nach einem bestimmten Gemälde in unserem Archiv suchen. Geben Sie dazu einfach
                          den Titel des Gemäldes ein und tippen auf 'Ok'. Sie können das Eingabefeld auch leer lassen und auf 'Ok'
                          tippen, um alle verfügbaren Gemälde anzeigen zu lassen."></head-bar>
    <div class="wrapper">
      <input
        type="search input-field"
        class="searchInput animated fadeIn"
        placeholder="Titel z.B. Bildnis des Johannes Cuspinian"
      />
      <input type="submit" value="Ok" class="button-submit button-text" @click="findPaintingsByTitle">
    </div>
    <ul>
      <li class="animated fadeIn" v-for="painting in paintingMatch" v-bind:key="painting.title">
        <painting-with-infos
          v-bind:src="painting.img[0].src"
          v-bind:alt="painting.title"
          v-bind:name="painting.title"
          v-bind:painting-id="painting.id"
          v-bind:dated="painting.dated"
        ></painting-with-infos>
      </li>
    </ul>
    <toolBar current-page="home"></toolBar>
  </div>
</template>

<script>
import toolBar from "../components/toolBar.vue";
import headBar from "../components/headBar";
import axios from "axios";
import paintingWithInfos from "../components/paintingWithInfos";
import inputField from "../components/inputField";

export default {
  name: "Search",
  components: { toolBar, headBar, paintingWithInfos, inputField },
  data() {
    return {
      paintingMatch: [],
      paintingList: [],
      searchValue: ""
    };
  },
  async created() {

  },
  methods: {
    async findPaintingsByTitle() {
        let title = document.querySelector(".searchInput").value;
        let result = await axios({
            method: "POST",
            url: "http://localhost:4000/graphql",
            data: {
                query: `
            {
              paintings(title: "${title}") {
                id
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

      this.paintingList = result.data.data.paintings;
      console.log(this.paintingList[0])
      // this.paintingList.forEach(function(elm) {
      //   let elmTitle = elm.title.toUpperCase();
      //   if (elmTitle.substring(0, title.length) === title) findings.push(elm);
      // });
      return this.paintingMatch = this.paintingList;
    },
    findPaintingsByDate() {
      let date = document.querySelector(".searchInput").value;
      let findings = [];
      this.paintingList.forEach(function(elm) {
        let datedString = elm.dated.toString();
        if (datedString.substring(0, date.length) === date) findings.push(elm);
      });
      return this.paintingMatch = findings;
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
  margin: $abstand-XL $abstand-S 0 $abstand-S;
}

.button-submit {
  background: $accent;
  padding: $button-padding $abstand-M $button-padding $abstand-M;
  height: $app-bar-height;
  border-radius: 5px;
  color: $lighter;
  margin-left: $abstand-S;
}

.searchInput {
  position: relative;
  height: $app-bar-height;
  width: 100%;
  padding: $button-padding $abstand-M $button-padding $abstand-M;
  color: $lighter;
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