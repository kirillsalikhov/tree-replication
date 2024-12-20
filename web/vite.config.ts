import { defineConfig } from 'vite'
import RailsPlugin from 'vite-plugin-rails'
import ReactPlugin from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    RailsPlugin(),
    ReactPlugin()
  ],
})
