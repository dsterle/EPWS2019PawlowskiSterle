<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
    import { Howl, Howler } from "howler";
    import Vue from "vue";
export default {
    components: {Howl, Vue},
    data() {
        return {

        }
    },
    created() {
        Vue.prototype.$audioHowls = []
    }
};
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css");
@import "./src/assets/scss/site.scss";

</style>
