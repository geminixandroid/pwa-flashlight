<template>
  <div class="app" :class="{ whitescreen: whitescreenMode && toggled }">
    <div class="center">
      <button
        class="btn"
        :disabled="disabled"
        :class="{ active: toggled && !whitescreenMode, 'active-white': whitescreenMode && toggled, loading: disabled }"
        :aria-label="toggled ? 'Выключить фонарик' : 'Включить фонарик'"
        @click="toggleAsync"
      >
        <span v-if="disabled" class="spinner" aria-hidden="true" />
        <svg
          v-else
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
        </svg>
      </button>

      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <p v-if="whitescreenMode && toggled" class="hint">Экранный режим</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFlashlight } from '../logic/flashlight'

const { toggleAsync, toggled, disabled, error, whitescreenMode } = useFlashlight()
</script>

<style scoped>
.app {
  position: fixed;
  inset: 0;
  background-color: #111;
  transition: background-color 0.25s ease;
}

.app.whitescreen {
  background-color: #ffffff;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.btn {
  background-color: #1a5299;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.2s, box-shadow 0.2s, color 0.2s, opacity 0.2s;
  outline: none;
}

.btn:hover:not(:disabled) {
  box-shadow: 0 0 0 3px #4a8fd4;
}

.btn:active:not(:disabled) {
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.5);
  background-color: #143f7a;
}

.btn.active {
  background-color: #c8f060;
  color: #1a3a00;
  box-shadow: 0 0 40px rgba(200, 240, 96, 0.55), 0 0 80px rgba(200, 240, 96, 0.25);
}

.btn.active-white {
  background-color: #e0e0e0;
  color: #333;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.icon {
  width: 100px;
  height: 100px;
}

.spinner {
  display: block;
  width: 60px;
  height: 60px;
  border: 5px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #ff6b6b;
  font-size: 15px;
  text-align: center;
  max-width: 280px;
  padding: 12px 16px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 10px;
  margin: 0;
}

.hint {
  color: #888;
  font-size: 13px;
  margin: 0;
}
</style>
