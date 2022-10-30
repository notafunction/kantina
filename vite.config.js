import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'
import path from 'path'

export default defineConfig({
  plugins: [reactPlugin(), macrosPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
