<template>
  <div class="accordion">
    <div class="accordion-head">
      <div class="icon-wrapper">
        <img
          class="icon"
          src="../assets/icons/arrow_down.svg"
          alt="arrow down"
          v-on:click="open"
          js-accordion="icon"
        />
      </div>
      <input
        type="button"
        class="text accordion-title"
        value="Kurzbeschreibung"
        js-accordion="title"
        v-on:click="playAudio"
      />
    </div>
    <p class="description-text accordion-text" js-accordion="text">{{ item.text }}</p>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    open() {
      // $el gives the DOM elements of this
      var text = this.$el.querySelector("[js-accordion=text]");
      var icon = this.$el.querySelector("[js-accordion=icon]");

      if (text.style.maxHeight) {
        // accordion is open
        icon.classList.remove("turn-icon");
        text.classList.remove("visible");
        text.style.maxHeight = null;
      } else {
        // accordion is closed
        icon.classList.add("turn-icon");
        text.classList.add("visible");
        text.style.maxHeight = text.scrollHeight + "px";
      }
    },
    playAudio() {
      // TODO implement
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

.accordion {
  .accordion-head {
    display: flex;
    width: 100%;
    height: 1rem * 3;

    .icon-wrapper {
      display: flex;
      width: $icon-wrapper-width;
    }

    .accordion-title {
      padding: 0;
    }
  }
  .accordion-text {
    max-height: 0;
    overflow: hidden;
    transition: 0.3s;
  }
}

.visible {
  margin: $abstand-S $abstand-S $abstand-L $icon-wrapper-width;
}

.icon {
  transition: 0.3s;
}

.turn-icon {
  // transition: 0.3s;
  transform: rotate(180deg);
}

.currentAudio {
  color: $accent;
}
</style>