<template>
  <div class="paintingWithInfos" @click="$router.push({name: 'painting', params: {userid: user, id: paintingId}})">
    <img v-bind:src="src" v-bind:alt="alt">
    <ul>
      <li class="title">{{name}}</li>
      <li class="title">{{dated}}</li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "paintingWithInfos",
        props: ["src", "alt", "name", "dated", "paintingId"],
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
      width: 120px;
    }

    .title {
      color: $lighter;
      font-size: $font-size-M;
      margin-left: $abstand-S;
      line-height: $font-line-height-M;
    }
  }

</style>