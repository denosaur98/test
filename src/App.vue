<template>
  <div class="app">
    <RouterView />
    <SpaceshipList/>
</div>
</template>

<script setup>
import SpaceshipList from '/src/components/SpaceshipList';


</script>

<style>
@font-face {
  font-family: Inter;
  src: url('/src/assets/Inter.ttf');
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter;
}
</style>
