import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [],
  // base: './',
  define: {
    __PLUGIN_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  // resolve: {
  // },
  server: {
    port: 3333,
  },
  build: {
    cssCodeSplit: true,
    target: ['es6'],
  },
})
