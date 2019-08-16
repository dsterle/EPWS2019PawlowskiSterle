<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link>| -->
    <!-- <router-link to="/about">About</router-link> -->
    <h1 class="headline">Headline</h1>
    <p class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, rem.</p>
    <p class="button-text">Button Text</p>
    <p class="hint-text">Hint Text</p>
    <p class="error-text">Error Text</p>
    <p class="description-text">Description Text</p>
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./scss/site.scss";
</style>
