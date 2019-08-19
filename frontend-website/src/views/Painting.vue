<template>
  <div class="painting">
    <img
      src="http://lucascranach.org/thumbnails/DE_BStGS_1130_FR285E/01_Overall/DE_BStGS_1130_FR285E_2010_Overall.jpg"
      alt
    />
    <div class="content-wrapper">
      <h1 class="painting-title">The Crucifixion of Christ, the so-called Schottenkreuzigung</h1>
      <p class="hint-text year">1552</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "painting",
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/010-variables.scss";

img {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  padding: $abstand-M $abstand-M 0 $abstand-M;

  .year {
    margin-top: $abstand-S;
  }
}
</style>