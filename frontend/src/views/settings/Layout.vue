<template>
  <span class="layout">
    <headBar
      headline="Darstellung"
      page-info-headline="Darstellung:"
      page-info="Hier können Sie einstellen, ob der dark mode eingeschaltet sein soll, welche Informationen bei
                        Gemälden angezeigt werden sollen oder die Schriftgröße anpassen. Klicken Sie auf speichern,
                        um Ihre Einstellungen zu speichern."
    ></headBar>
    <div class="content">
      <div class="card darkmode-card">
        <span class="setting headline">Dark Mode</span>
        <i class="fas fa-toggle-on toggleDarkMode" v-on:click="toggle"></i>
      </div>
      <div class="card">
        <span class="setting headline">Diese Kategorien werden Ihnen in der Gemäldeansicht angezeigt</span>
        <ul class="normal-text category-ul">
          <li>
            <label for="kurzbeschreibung">Kurzbeschreibung</label>
            <input
              class="category"
              name="kurzbeschreibung"
              id="kurzbeschreibung"
              type="checkbox"
              checked
            />
          </li>
          <li>
            <label for="provenienz">Provenienz</label>
            <input
              class="category checkbox"
              name="provenienz"
              id="provenienz"
              type="checkbox"
              checked
            />
          </li>
          <li>
            <label for="masse">Maße</label>
            <input class="category" name="masse" id="masse" type="checkbox" checked />
          </li>
          <li>
            <label for="material">Material/Technik</label>
            <input class="category" name="material" id="material" type="checkbox" checked />
          </li>
          <li>
            <label for="beschriftung">Beschriftung</label>
            <input class="category" name="beschriftung" id="beschriftung" type="checkbox" checked />
          </li>
          <li class="last-li">
            <label for="ausstellungsgeschichte">Ausstellungsgeschichte</label>
            <input
              class="category"
              name="ausstellungsgeschichte"
              id="ausstellungsgeschichte"
              type="checkbox"
              checked
            />
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
  </span>
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
    toggle() {
      let toggleIcon = document.querySelector(".toggleDarkMode");
      if (toggleIcon.classList.contains("fa-toggle-on")) {
        toggleIcon.classList.replace("fa-toggle-on", "fa-toggle-off");
      } else {
        toggleIcon.classList.replace("fa-toggle-off", "fa-toggle-on");
      }
    },
    checkLocalStorage() {
      if (localStorage.darkMode) {
        if (localStorage.darkMode === "true")
          document.querySelector(".toggleDarkMode").className =
            "fas fa-toggle-on toggleDarkMode";
        else
          document.querySelector(".toggleDarkMode").className =
            "fas fa-toggle-off toggleDarkMode";
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
      let darkMode = document.querySelector(".fa-toggle-off");

      localStorage.darkMode = darkMode === null;
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

    .card {
      border-radius: 10px;
      background: $dark;
      padding: $card-padding;
      box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
      margin-bottom: $abstand-M;
    }

    .darkmode-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .schrift-card {
      .headline {
        margin-bottom: $abstand-M;
      }
      padding-bottom: $abstand-L;
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
      // font-size: $font-size-M;
    }

    .last-li {
      margin-bottom: 0;
    }
  }

  i {
    font-size: $font-size-XL;
    color: $lighter;
  }

  // .category {
  //   width: $font-size-M;
  //   height: $font-size-M;
  // }

  .slider {
    color: $lighter;
    margin-left: $abstand-L;
    margin-right: $abstand-L;
  }

  .saveButton {
    // position: absolute;
    // right: $abstand-M;
    // bottom: $abstand-L;
    background: $accent;
    padding: $button-padding;
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