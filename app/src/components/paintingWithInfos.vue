<template>
  <div class="paintingWithInfos" @click="$router.push({name: 'painting', params: {userid: user, id: paintingId}})">
    <img v-bind:src="src" v-bind:alt="alt">
    <div>
      <ul class="infos">
        <li class="title">{{name}}</li>
        <li class="title">{{dated}}</li>
      </ul>
      <span class="timeStamp">{{time}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "paintingWithInfos",
        props: ["src", "alt", "name", "dated", "paintingId", "time"],
        data() {
            return {
                user: {}
            }
        },
        created() {
            this.user = this.$route.params.userid;
        }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/010-variables";
  .paintingWithInfos {
    display: flex;
    margin: $abstand-M $abstand-S $abstand-S $abstand-S;

    img {
      height: 130px;
      min-width: 120px;
      max-width: 120px;
    }

    .infos {
      height: 105px;
      overflow: auto;
    }

    .title {
      color: $lighter;
      font-size: $font-size-M;
      margin-left: $abstand-S;
      line-height: $font-line-height-M;
      max-height: 55px;
    }

    .timeStamp {
      color: $middleLight;
      font-size: $font-size-S;
      font-style: italic;
      margin-left: $abstand-S;
      line-height: $font-line-height-M;
    }
  }

</style>