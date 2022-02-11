import { resolve } from 'path'
import { build } from 'vite'

build({
  build: {
    emptyOutDir: false,
    target: 'es6',
    lib: {
      entry: resolve(__dirname, '../src/plugin.ts'),
      fileName: () => 'plugin.js',
      formats: ['es'],
    },
  },
})
