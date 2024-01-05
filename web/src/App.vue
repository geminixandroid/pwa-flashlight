<template>
  <div id="app">
    <PwaFlashlight/>
  </div>
</template>

<script>
import PwaFlashlight from './components/PwaFlashlight.vue'

export default {
  name: 'app',
  components: {
    PwaFlashlight
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
