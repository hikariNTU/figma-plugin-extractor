/// <reference types="vite/client" />

declare const __PLUGIN_VERSION__: string

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
