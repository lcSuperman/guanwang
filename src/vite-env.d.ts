/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ViewTransition {
  finished: Promise<void>
}

interface Document {
  startViewTransition?: (callback?: () => void | Promise<void>) => ViewTransition
}
