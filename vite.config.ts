import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [viteSingleFile()],
  define: {
    __PLUGIN_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  server: {
    port: 3333,
  },
  build: {
    cssCodeSplit: false,
    target: ['es6'],
  },
})
