import { ref } from 'vue'

// by convention, composable function names start with "use"
export function useFlashlight() {
  const toggled = ref(false)
  const disabled = ref(false)
  let track: MediaStreamTrack | null = null

  async function toggleAsync() {
    toggled.value ? await stopAsync() : await startAsync()
  }

  async function startAsync() {
    try {
      if ('mediaDevices' in navigator === false)
        throw 'Устройство не поддерживается'

      disabled.value = true

      const devices = await navigator.mediaDevices.enumerateDevices()
      const [camera] = devices
        .filter((device) => device.kind === 'videoinput')
        .reverse()

      if (!camera) throw 'Камера не найдена'

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: camera.deviceId,
          facingMode: ['user', 'environment'],
        },
      })

      track = stream.getVideoTracks()[0]

      await track.applyConstraints({
        advanced: [{ torch: true }],
      })

      disabled.value = false
      toggled.value = true
    } catch (err) {
      alert(err)
      disabled.value = false
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
  return { toggleAsync, toggled, disabled }
}
