import { ref } from 'vue'

export function useFlashlight() {
  const toggled = ref(false)
  const disabled = ref(false)
  let stream: MediaStream | null = null
  let track: MediaStreamTrack | null = null

  async function toggleAsync() {
    toggled.value ? await stopAsync() : await startAsync()
  }

  async function startAsync() {
    try {
      if ('mediaDevices' in navigator === false)
        throw 'Устройство не поддерживается'

      disabled.value = true

      const tempStream = await navigator.mediaDevices.getUserMedia({
        video: true
      })

      tempStream.getTracks().forEach(t => t.stop())

      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices
        .filter(device => device.kind === 'videoinput' && device.deviceId)
        .reverse()

      if (cameras.length === 0) throw 'Камера не найдена'

      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: cameras[0].deviceId },
          facingMode: { ideal: 'environment' }
        }
      })

      track = stream.getVideoTracks()[0]

      if (!track) throw 'Не удалось получить видеотрек'

      try {
        await track.applyConstraints({
          advanced: [{ torch: true }]
        })
      } catch (torchError) {
       throw 'Не удалось включить вспышку'
      }

      disabled.value = false
      toggled.value = true
      
    } catch (err) {
      console.error('Flashlight error:', err)
      alert(typeof err === 'string' ? err : 'Ошибка включения вспышки')
      await stopAsync()
      disabled.value = false
    }
  }

  async function stopAsync() {
    try {
      disabled.value = true
      
      if (track) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: false }]
          }).catch(() => {})
        } catch (e) {}
        
        track.stop()
        track = null
      }
      
      if (stream) {
        stream.getTracks().forEach(t => t.stop())
        stream = null
      }
      
      toggled.value = false
    } finally {
      disabled.value = false
    }
  }

  return { toggleAsync, toggled, disabled }
}