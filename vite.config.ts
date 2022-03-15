import * as path from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

const resolve = (p :string) => {
  return path.resolve(__dirname, p)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  plugins: [vue()]
})
