import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "PWA Flashlight",
        short_name: "PWA Flashlight",
        description: "PWA Flashlight",
        start_url: "./index.html",
        display: "standalone",
        icons: [
          {
            src: "img/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "img/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "img/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "img/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "img/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "img/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "img/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "img/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            label: "Homescreen of PWA Flashlight"
          },
          {
            src: "img/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            label: "Homescreen of PWA Flashlight",
            form_factor: "wide"
          }
        ],
        background_color: "#000000",
        theme_color: "#4DBA87"
      }
    })
  ],
})
