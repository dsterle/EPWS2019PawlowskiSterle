<template>
  <div class="accordion">
    <div class="accordion-head">
      <div class="left">
        <div class="icon-wrapper" v-on:click="open">
          <img
            class="icon"
            src="../assets/icons/arrow_down.svg"
            alt="arrow down"
            js-accordion="icon"
          />
        </div>
        <input
          type="button"
          class="normal-text accordion-title"
          v-bind:value="name"
          js-accordion="title"
          v-bind:class="{'currentAudio':current}"
          v-on:click="open"
        />
      </div>
      <img
        class="speaker-icon"
        src="../assets/icons/speaker.svg"
        alt="Lautsprecher Icon"
        v-on:click="$emit('play-audio', id)"
      />
    </div>
    <slider
      audio-slider
      class="slider"
      v-if="current"
      v-bind:value="currentValue"
      v-bind:min="0"
      v-bind:max="max"
      v-on:change="jumpTo"
    ></slider>
    <div class="accordion-content">
      <p class="description-text accordion-text invisible" js-accordion="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import slider from "vue-slider-component";

export default {
  name: "accordion",
  components: { slider },
  props: ["id", "name", "text", "current", "min", "max", "currentValue"],
  data() {
    return {
      value: 0
    };
  },
  methods: {
    open() {
      // $el gives the DOM elements of this
      const text = this.$el.querySelector("[js-accordion=text]");
      const icon = this.$el.querySelector("[js-accordion=icon]");

      if (text.style.maxHeight) {
        //* accordion is open and should be closed
        icon.classList.remove("turn-icon");
        text.classList.remove("helper-description-padding");
        text.style.maxHeight = null;
      } else {
        //* accordion is closed and should be opened
        icon.classList.add("turn-icon");
        text.classList.add("helper-description-padding");
        text.style.maxHeight = text.scrollHeight + "px";
      }
    },
    jumpTo(newValue) {
      this.$emit("jump-to", {
        name: this.$props.name,
        newValue: newValue
      });
    }
  },
  computed: {
    getCurrentValue() {}
  }
};
</script>

<style lang="scss">
@import "../assets/scss/010-variables.scss";

.accordion {
  .accordion-head {
    padding-left: $abstand-M;
    padding-right: $abstand-M;

    display: flex;
    height: 1rem * 3;
    justify-content: space-between;

    .left {
      display: flex;

      .icon-wrapper {
        display: flex;
        align-items: center;
        width: $icon-wrapper-width;

        .icon {
          transition: 0.3s;
          width: $abstand-L;
        }
      }

      .accordion-title {
        padding: 0;
      }
    }

    .speaker-icon {
      margin-right: 10px;
    }
  }

  .accordion-content {
    padding-left: $abstand-M;
    padding-right: $abstand-M;

    .accordion-text {
      padding-left: $icon-wrapper-width;
      padding-right: $abstand-S;
      max-height: 0;
      overflow: hidden;
      transition: 0.3s;
    }
  }
}

.invisible {
  max-height: 0;
}

.turn-icon {
  transform: rotate(180deg);
}

.helper-description-padding {
  // margin-top: $abstand-XS;
  margin-top: $abstand-S;
  margin-bottom: $abstand-M;
}

.currentAudio {
  color: $accent;
}
</style>