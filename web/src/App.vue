<template>
  <PwaFlashlight />
</template>

<script setup lang="ts">
import PwaFlashlight from './components/PwaFlashlight.vue'
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  background-color: #111;
}
</style>
