import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import {
  ElementPlusResolver,
  HeadlessUiResolver,
  VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import PurgeIcons from 'vite-plugin-purge-icons'

import vue from '@vitejs/plugin-vue'

const resolve = (p: string) => {
  return path.resolve(__dirname, p)
}

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  envPrefix: ['VITE_', 'TAURI_'],
  plugins: [
    vue({
      reactivityTransform: true
    }),
    AutoImport({
      imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core'],
      resolvers: [ElementPlusResolver(), HeadlessUiResolver()],
    }),
    Components({
      extensions: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        HeadlessUiResolver(),
        VueUseComponentsResolver()
      ],
    }),
    PurgeIcons({
      content: [
        '**/*.html',
        '**/*.js',
        '**/*.jsx',
        '**/*.ts',
        '**/*.tsx',
        '**/*.vue'
      ]
    }),
    Inspect()
  ]
})