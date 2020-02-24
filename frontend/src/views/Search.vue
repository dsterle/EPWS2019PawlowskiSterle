<template>
  <div class="search">
    <head-bar headline="Suche"></head-bar>
    <div class="wrapper">
      <input
        type="search"
        class="searchInput animated bounceIn"
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
      paintingList: [
        {
          id: 1,
          objectName: "FR006",
          inventarnummer: "CH_SORW_1925-1b",
          title: "Bildnis des Johannes Cuspinian",
          imgSrc: [
            "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_c1995_Overall-001.jpg",
            "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_2008-11_Overall.jpg",
            "http://lucascranach.org/thumbnails/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_image-date-unknown_Overall-002.jpg"
          ],
          dated: 1502,
          infos: [
            {
              id: 0,
              name: "Kurzbeschreibung",
              inhalt:
                "Brustbildnis des Historiographen Dr. Johannes Cuspinian (eigentlich Spiessheimer)\nTeil eines Diptychons (Gegenstück zum Bildnis der Anna Cuspinian)",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-1/2-Kurzbeschreibung.mp3"
            },
            {
              id: 1,
              name: "Provenienz",
              inhalt:
                "Sammlung Charles I, König von England\n- Familie Locker-Lampson, England \n- Baron of Sandys, England\n- Kunsthandel  A. -G., Luzern, Julius Böhler gall.\n- 1925 durch Reinhart erworben",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-1/3-Provenienz.mp3"
            },
            {
              id: 2,
              name: "Maße",
              inhalt:
                "Maße Bildträger: 60,3 x 45,5 x 0,45-0,55 cm (Format nahezu original)",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-1/4-Maße.mp3"
            },
            {
              id: 3,
              name: "Material/Technik",
              inhalt: "Malerei auf Fichtenholz (Picea sp.)",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-1/5-MaterialTechnik.mp3"
            },
            {
              id: 4,
              name: "Beschriftung",
              inhalt:
                "Ein gemaltes Allianzwappen der Familien Spiessheimer (latinisiert Cuspinianus) und Putsch auf der Rückseite fragmentarisch erhalten",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-1/6-Beschriftung.mp3"
            },
            {
              id: 5,
              name: "Ausstellungsgeschichte",
              inhalt:
                "Bern 1939-1940, Nr. 62-63, Taf. III\nZürich 1940-1941, Nr. 39-40, Taf. XI-XII\nWinterthur 1955, Nr. 42-43, Taf. V.\nKronach 1994, Nr. 118",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-1/7-Ausstellungsgeschichte.mp3"
            }
          ]
        },
        {
          id: 2,
          objectName: "FR007",
          inventarnummer: "CH_SORW_1925-1a",
          title: "Bildnis der Anna Cuspinian",
          imgSrc: [
            "http://lucascranach.org/thumbnails/CH_SORW_1925-1a_FR007/01_Overall/CH_SORW_1925-1a_FR007_1998-11_Overall.jpg",
            "http://lucascranach.org/thumbnails/CH_SORW_1925-1a_FR007/01_Overall/CH_SORW_1925-1a_FR007_1998-11_Overall-001.jpg"
          ],
          dated: 1502,
          infos: [
            {
              id: 0,
              name: "Kurzbeschreibung",
              inhalt:
                "Brustbildnis der Frau des Historiographen Dr. Johannes Cuspinian (Spiessheimer)\nTeil eines Diptychons (Gegenstück zum Bildnis des Johannes Cuspinian)",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-2/2-Kurzbeschreibung.mp3"
            },
            {
              id: 1,
              name: "Provenienz",
              inhalt:
                "Sammlung Charles I, König von England\n- Familie Locker-Lampson, England \n- Baron of Sandys, England\n- Kunsthandel  A. -G., Luzern, Julius Böhler gall.\n- 1925 durch Reinhart erworben",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-2/3-Provenienz.mp3"
            },
            {
              id: 2,
              name: "Maße",
              inhalt:
                "Maße Bildträger: 60,2-60,1 x 45,5-45 x 0,45-0,55 cm (Format nahezu original)",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-2/4-Maße.mp3"
            },
            {
              id: 3,
              name: "Material/Technik",
              inhalt: "Malerei auf Fichtenholz (Picea sp.)",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-2/5-MaterialTechnik.mp3"
            },
            {
              id: 4,
              name: "Ausstellungsgeschichte",
              inhalt:
                "Bern 1939-1940, Nr. 62-63, Taf. III\nZürich 1940-1941, Nr. 39-40, Taf. XI-XII\nWinterthur 1955, Nr. 42-43, Taf. V.\nKronach 1994, Nr. 118",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-2/6-Ausstellungsgeschichte.mp3"
            }
          ]
        },
        {
          id: 3,
          objectName: "FR001",
          inventarnummer: "AT_KHM_GG6905",
          title: 'Kreuzigung Christi, sog. "Schottenkreuzigung"',
          imgSrc: [
            "http://lucascranach.org/thumbnails/AT_KHM_GG6905_FR001/01_Overall/AT_KHM_GG6905_FR001_Image-date-unknown_Overall-001.jpg"
          ],
          dated: 1501,
          infos: [
            {
              id: 0,
              name: "Kurzbeschreibung",
              inhalt:
                "Vielfigurige Kreuzigung in felsiger Landschaft, das Kreuz in der Bildmitte, aus einem rohen, nur grob behauenen Baumstamm gebildet, der Körper Christi blutüberströmt und stark von den Spuren der Passion gezeichnet, links und rechts von den beiden, ebenfalls auf rohen Baumstämmen gekreuzigten  Schächern flankiert. Die Assistenzfiguren am Fuß des Kreuzes sind in zwei Gruppen geteilt, links die trauernden Frauen um Maria mit Johannes, ganz am linken Bildrand eine bäuerlich gekleidete Figur, rechts eine Gruppe von drei auffallend gekleideten Reitern.\n\n[Karl Schütz, 2005]",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-3/2-Kurzbeschreibung.mp3"
            },
            {
              id: 1,
              name: "Provenienz",
              inhalt:
                'Erstmals nachweisbar um 1800, handschriftliches Inventar des Schottenstiftes, sub Nr. 24 als Lucas van Leyden\n- Schottenstift Wien (Inventar von 1842 als Lucas van Leyden, siehe: [Dörnhöffer 1904, Sp. 188]\n- Erwerbung des Kunsthistorischen Museums, Wien 1934\n\nDokumente [Archiv der Gemäldegalerie, KHM]:\n- Gal. Akt Z.17/1934: Stix an die Zentralstelle für Denkmalschutz am 23.10.1934: Prälat Peichl hat am Vortag angerufen und mitgeteilt, dass das Schottenstift vorerst nicht genötigt wäre, die Schottenkreuzigung zu verkaufen; Stix versicherte ihm, sollte es demnächst doch nötig werden, so würde das KHM einen angemessenen Preis zahlen, denn es liegt ein "bedeutendes öffentliches Interesse vor, dass dieses Bild, welches auf eine ganz besondere Weise mit Oesterreich verbunden ist, nicht in das Ausland gelange."\n- Gal. Akt Z.20/1934: (vgl. Zl. 25 u. 30 / ex 1932, Zl. 2, 5 u. 9 / ex 1934, Z. 33 /1933, Zl. 17 / 1934, Tausch XXIII) Pro Memoria 23.11.1934, Stix: Staatssekretär Dr. Pernter stimmt Erwerbung der Schottenkreuzigung zu, aus zwei Fonds finanziert um 90.910 Schilling. An Dr. Peichl, Abt-Koadjutor, 24.11.1934: Zentralstelle für Denkmalschutz bewilligt Verkauf ans KHM. Buchner (Bayr. Staatsgemäldesammlungen) an Buschbeck, 13.11.1934: "Ich habe gehört, dass die Cranach-Kreuzigung des Wiener Schottenstiftes locker sein soll." Sollte es das KHM nicht erwerben, würde sich die Alte Pinakothek darum bemühen.\n\n[Alice Hoppe-Harnoncourt, 2010]',
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-3/3-Provenienz.mp3"
            },
            {
              id: 2,
              name: "Maße",
              inhalt:
                "Maße Bildträger: 58,4 (oben) - 58,1 (unten) x 45,1(links) - 45.8 (rechts) x 2,5 - 2,6 cm \n(3-4 mm Aufdoppelung, Gesamtstärke max. 9 mm. Das originale Bildformat ist weitgehend erhalten)\n[Kunsthistorisches Museum, revised 2010]",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-3/4-Maße.mp3"
            },
            {
              id: 3,
              name: "Material/Technik",
              inhalt:
                "Malerei auf Lindenholz (Tilia sp.)\n[Klein, Bericht 2013]\n[P. Klein, Bericht von 1980]",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-3/5-MaterialTechnik.mp3"
            },
            {
              id: 4,
              name: "Ausstellungsgeschichte",
              inhalt:
                "Wien 1935\nBerlin 1937, Nr. 1 \nMünchen 1938, Nr. 388\nWien 1939, Nr. 180\nAmsterdam 1947, Nr. 39\nParis 1947\nStockholm 1948, Nr. 169\nKopenhagen 1948, Nr. 43\nArt Treasures from Vienna, 1949, ill. 8, Nr. 42\nWien 1950\nOslo 1952, Nr. 36\nGraz 1953, Nr. 23; \nSt. Florian 1965, Nr. 25 \nWien 1972, Nr. 1; \nKronach 1994, Nr. 110\nJerusalem 1996\nWiener Neustadt 2000, Nr. 101 \nTokyo, Kyoto 2002/2003, Nr. 2 \nFrankfurt, London 2007/2008, Nr. 2\nBrüssel 2010/11, Nr. 5\n\n\nDokumente:\n- Gal. Akt Z.3/1935: Unterlagen zur Cranach-Ausstellung in Wien, mit Bitte um Leihgaben von der Albertina, ÖNB (2 Ausgaben des Missale Pataviense) und Akademie sowie Fotografien von zeitgleichen Werken in ausländischen Sammlungen.\n- Gal. Akt Z.1/1936: Jahresbericht, S. 2 \"Ausstellung 'der junge Cranach'. Die Erwerbung des frühesten Gemäldes [...], bot die Möglichkeit, eine kleine Ausstellung über den jungen Cranach, also der in Oesterreich entstandenen Frühwerke des Meisters zu veranstalten. Die beiden Originale der Galerie wurden in einem Raum mit den beiden Gemälden der Akademiegalerie vereint und die Graphik, teils in Originalen der Albertina, teils in Faksimilereproduktionen, daneben ausgestellt. Von außerhalb Oesterreichs existierenden Gemälden und Zeichnungen wurden Photographien ausgestellt.\"\n\n[Alice Hoppe-Harnoncourt, 2010]",
              audioSrc:
                "https://raw.githubusercontent.com/dsterle/EPWS2019PawlowskiSterle/za-FrontendBackend-Database/audiofiles/painting-3/6-Ausstellungsgeschichte.mp3"
            }
          ]
        }
      ],
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
    // result.data.forEach(function (elm) {
    //     _this.paintingList.push(elm);
    // });
    // console.log(_this.paintingList)
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