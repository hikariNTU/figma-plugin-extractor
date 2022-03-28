/// <reference types="vite/client" />
/// <reference types="@figma/plugin-typings" />

declare const __PLUGIN_VERSION__: string

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
