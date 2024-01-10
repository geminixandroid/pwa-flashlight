<template>
  <div class="center">
    <button
      class="btn"
      :disabled="disabled"
      @click="toggleAsync"
      :class="{ active: toggled }"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { useFlashlight } from '../logic/flashlight.ts'

const { toggleAsync, toggled, disabled } = useFlashlight()
</script>

<style scoped>
.container {
  height: 100%;
  position: relative;
  background-color: white;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.btn {
  background-color: DodgerBlue;
  border: none;
  display: block;
  height: 300px;
  width: 300px;
  font-size: 48px;
  border-radius: 50%;
  outline: none;
}
.btn:active {
  -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  background: #2c37cf;
  border: solid 2px #203e5f;
}
.btn:hover {
  border: solid 2px #203e5f;
}
.active {
  -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
  background: #e7ffa4;
  border: solid 2px #203e5f;
}
</style>
