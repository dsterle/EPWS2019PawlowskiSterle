<template>
  <div class="container">
    <p class="normal-text animated fadeIn">Möchten Sie, dass ich Ihnen die Informationen vorlese?</p>
    <div class="illustration-wrapper">
      <img class="person one animated fadeIn" src="../../assets/illustrations/person_one.png" alt />
      <img class="person two animated fadeIn" src="../../assets/illustrations/person_two.png" alt />
    </div>
    <div class="button-wrapper">
      <div class="button --grey animated bounceIn" @click="answer(false)">
        <p class="button-text">Nein</p>
      </div>
      <div class="button --normal animated bounceIn" @click="answer(true)">
        <p class="button-text">Ja</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        answer(response) {
            localStorage.autoplay = response;
            this.$router.push({ name: 'waiting', params: {userid: this.$route.params.userid}});
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/010-variables.scss";

.container {
  .illustration-wrapper {
    .person {
      width: 50%;
      max-width: 180px;
      height: auto;
      margin-top: $abstand-XL;
    }

    .person.one {
      animation-delay: 100ms;
    }

    .person.two {
      animation-delay: 300ms;
    }
  }
  .button-wrapper {
    width: 100%;
    justify-content: space-between;
    // margin-top: $abstand-L;
    display: flex;

    .button {
      display: flex;
      justify-content: center;
      width: 40%;
      background: $accent;
      padding: $button-padding 0;
      border-radius: 5px;
      color: $lighter;
      cursor: pointer;
      transition: 0.5s;
      box-shadow: 0 14px 14px rgba(0, 0, 0, 0.237602),
        0 0 14px rgba(0, 0, 0, 0.12);
    }

    .button.--grey {
      background: $light;
      animation-delay: 200ms;
    }

    .button.--normal {
      animation-delay: 400ms;
    }
  }
}
</style>