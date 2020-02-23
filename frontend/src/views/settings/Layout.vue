<template>
  <label class="layout">
    <headBar
      headline="Darstellung"
      page-info-headline="Darstellung:"
      page-info="Hier können Sie einstellen, ob der dark mode eingeschaltet sein soll, welche Informationen bei
                        Gemälden angezeigt werden sollen oder die Schriftgröße anpassen. Klicken Sie auf speichern,
                        um Ihre Einstellungen zu speichern."
    ></headBar>
    <div class="content">
      <div class="card darkmode-card">
        <p class="setting headline">Dark Mode</p>
        <div class="switch">
          <label>
            <input js-toggle-dark-mode type="checkbox" checked />
            <span class="lever"></span>
          </label>
        </div>
      </div>
      <div class="card">
        <span class="setting headline">Diese Kategorien werden Ihnen in der Gemäldeansicht angezeigt</span>
        <ul class="normal-text category-ul">
          <li>
            <label>
              <input
                class="category"
                name="kurzbeschreibung"
                id="kurzbeschreibung"
                type="checkbox"
                checked
              />
              <span>Kurzbeschreibung</span>
            </label>
          </li>
          <li>
            <label>
              <input class="category" name="provenienz" id="provenienz" type="checkbox" checked />
              <span for="provenienz">Provenienz</span>
            </label>
          </li>
          <li>
            <label>
              <input class="category" name="masse" id="masse" type="checkbox" checked />
              <span for="masse">Maße</span>
            </label>
          </li>
          <li>
            <label>
              <input class="category" name="material" id="material" type="checkbox" checked />
              <span for="material">Material/Technik</span>
            </label>
          </li>
          <li>
            <label>
              <input class="category" name="beschriftung" id="beschriftung" type="checkbox" checked />
              <span for="beschriftung">Beschriftung</span>
            </label>
          </li>
          <li class="last-li">
            <label>
              <input
                class="category"
                name="ausstellungsgeschichte"
                id="ausstellungsgeschichte"
                type="checkbox"
                checked
              />
              <span for="ausstellungsgeschichte">Ausstellungsgeschichte</span>
            </label>
          </li>
        </ul>
      </div>
      <div class="card schrift-card">
        <span class="setting headline">Schriftgröße</span>
        <slider
          class="slider"
          ref="slider"
          v-model="sliderValue"
          :adsorb="true"
          :data="data"
          :marks="true"
          :drag-on-click="true"
        ></slider>
      </div>
      <button class="saveButton button-text" @click="saveSettings">Speichern</button>
    </div>
    <toolBar current-page="settings"></toolBar>
  </label>
</template>

<script>
import headBar from "../../components/headBar";
import toolBar from "../../components/toolBar";
import slider from "vue-slider-component";

export default {
  name: "Layout",
  components: { headBar, toolBar, slider },
  data() {
    return {
      sliderValue: "a",
      data: ["Klein", "Mittel", "Groß"]
    };
  },
  created() {},
  mounted() {
    this.checkLocalStorage();
  },
  methods: {
    checkLocalStorage() {
      if (localStorage.darkMode) {
        if (localStorage.darkMode === "true")
          document.querySelector("[js-toggle-dark-mode]").checked = true;
        else document.querySelector("[js-toggle-dark-mode]").checked = false;
      }
      let categories = document.querySelectorAll(".category");
      let categoriesToShow = localStorage.categoriesToShow;
      for (let i = 0; i < categories.length; i++) {
        if (categoriesToShow)
          categories[i].checked = categoriesToShow.includes(categories[i].name);
        if (categoriesToShow && categoriesToShow.length === 0)
          //wenn das array leer ist, funktioniert includes nicht
          categories[i].checked = false;
      }
      if (localStorage.fontSize) {
        this.sliderValue = localStorage.fontSize;
        this.$refs.slider.setValue(localStorage.fontSize);
      }
    },
    saveSettings() {
      let categories = document.querySelectorAll(".category");
      let darkMode = document.querySelector("[js-toggle-dark-mode]");

      localStorage.darkMode = darkMode.checked;
      let categoriesToShow = [];
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].checked) categoriesToShow.push(categories[i].name);
      }
      localStorage.categoriesToShow = categoriesToShow;
      localStorage.fontSize = this.$refs.slider.getValue();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables";

.layout {
  min-height: 610px;

  .content {
    padding: $abstand-M;
    padding-bottom: $abstand-XXXL;

    // .card {
    //   border-radius: 10px;
    //   background: $dark;
    //   padding: $card-padding;
    //   box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
    //   margin-bottom: $abstand-M;
    // }

    .darkmode-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .schrift-card {
      .headline {
        margin-bottom: $abstand-M;
      }
      padding-bottom: 48px;
    }
  }

  .setting {
    display: flex;
    justify-content: space-between;
    color: $lighter;
  }

  .category-ul {
    margin-top: $abstand-L;

    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: $abstand-M;
      margin-right: $abstand-S;
      color: $lighter;
    }

    .last-li {
      margin-bottom: 0;
    }
  }

  i {
    font-size: $font-size-XL;
    color: $lighter;
  }

  .slider {
    color: $lighter;
    margin-left: $abstand-L;
    margin-right: $abstand-L;
  }

  .saveButton {
    background: $accent;
    padding: $button-padding $abstand-L $button-padding $abstand-L;
    border-radius: 5px;
    border: none;
    color: $lighter;
    box-shadow: 0 14px 14px rgba(0, 0, 0, 0.237602),
      0 0 14px rgba(0, 0, 0, 0.12);
  }
}

//*********************** Following classes are there to style the vue-slider-comonent

.vue-slider-rail {
  height: 2px;
  background-color: $light;
}

.vue-slider-process {
  background-color: $accentDark;
}

.vue-slider-mark-step {
  background-color: $accent;
}

.vue-slider-dot-handle {
  background-color: $accent;
}

.vue-slider-dot-tooltip-inner {
  background-color: $accent;
}

.vue-slider-dot-handle::after {
  background-color: $accentTransparent;
}
</style>