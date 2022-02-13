import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

build({
  build: {
    emptyOutDir: false,
    target: 'es6',
    lib: {
      entry: resolve(__dirname, '../src/plugin/plugin.ts'),
      fileName: () => 'plugin.js',
      formats: ['es'],
    },
  },
})
