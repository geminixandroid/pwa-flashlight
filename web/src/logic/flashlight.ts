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
  return { toggleAsync, toggled, disabled }
}
