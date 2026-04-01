import { ref } from 'vue'

export function useFlashlight() {
  const toggled = ref(false)
  const disabled = ref(false)
  const error = ref<string | null>(null)
  const whitescreenMode = ref(false)

  let stream: MediaStream | null = null
  let track: MediaStreamTrack | null = null
  let wakeLock: WakeLockSentinel | null = null

  async function acquireWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen')
      }
    } catch {
      // Wake Lock is not critical — silently ignore
    }
  }

  async function releaseWakeLock() {
    if (wakeLock) {
      await wakeLock.release().catch(() => {})
      wakeLock = null
    }
  }

  async function toggleAsync() {
    error.value = null
    toggled.value ? await stopAsync() : await startAsync()
  }

  async function startAsync() {
    try {
      if (!('mediaDevices' in navigator)) throw 'Устройство не поддерживается'

      disabled.value = true
      whitescreenMode.value = false

      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
      })

      track = stream.getVideoTracks()[0]
      if (!track) throw 'Не удалось получить видеотрек'

      try {
        await track.applyConstraints({ advanced: [{ torch: true } as MediaTrackConstraintSet] })
      } catch {
        // Torch not supported — fall back to white screen mode
        track.stop()
        track = null
        stream.getTracks().forEach(t => t.stop())
        stream = null
        whitescreenMode.value = true
      }

      await acquireWakeLock()
      toggled.value = true
      disabled.value = false
    } catch (err) {
      console.error('Flashlight error:', err)
      error.value = typeof err === 'string' ? err : 'Ошибка включения вспышки'
      await stopAsync()
      disabled.value = false
    }
  }

  async function stopAsync() {
    try {
      disabled.value = true

      await releaseWakeLock()

      if (track) {
        await track.applyConstraints({ advanced: [{ torch: false } as MediaTrackConstraintSet] }).catch(() => {})
        track.stop()
        track = null
      }

      if (stream) {
        stream.getTracks().forEach(t => t.stop())
        stream = null
      }

      whitescreenMode.value = false
      toggled.value = false
    } finally {
      disabled.value = false
    }
  }

  return { toggleAsync, toggled, disabled, error, whitescreenMode }
}
