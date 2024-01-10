<template>
  <div class="center">
    <button
      class="btn"
      :disabled="disabled"
      @click="toggleAsync"
      v-bind:class="{ active: toggled }"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toggled = ref(false)
const disabled = ref(false)
let track: MediaStreamTrack | null = null

async function toggleAsync() {
  toggled.value ? await stopAsync() : await startAsync()
}

async function startAsync() {
  disabled.value = true
  const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator
  try {
    if (SUPPORTS_MEDIA_DEVICES) {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter((device) => device.kind === 'videoinput')

      if (cameras.length === 0) {
        throw 'Камера не найдена'
      }

      const camera = cameras.pop()!

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: camera.deviceId,
          facingMode: ['user', 'environment'],
        },
      })

      track = stream.getVideoTracks()[0]

      disabled.value = false
      toggled.value = true

      await track.applyConstraints({
        advanced: [{ torch: true }],
      })
    } else {
      throw 'Устройство не поддерживается'
    }
  } catch (err) {
    alert(err)
  }
}

async function stopAsync() {
  if (track) {
    disabled.value = true
    track.stop()
    disabled.value = false
    toggled.value = false
  }
}
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
