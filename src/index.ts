export default {}
import App from './App'
import { render } from 'preact'

const renderApp = () => {
  const app = document.getElementById('app')
  console.log(app, 'render')
  if (app) {
    render(App(), app)
  }
}

;(function () {
  ;['cancel', 'getColor', 'getText'].forEach((name) => {
    const el = document.getElementById(name)
    if (el) {
      el.onclick = () => {
        parent.postMessage({ pluginMessage: { type: name } }, '*')
      }
    }
  })

  onmessage = (event) => {
    console.log(event.data.pluginMessage)
    switch (event.data?.pluginMessage?.type) {
      case 'color':
      case 'typo': {
        const el = document.getElementById('editor') as HTMLTextAreaElement

        if (el) {
          el.value = JSON.stringify(event.data.pluginMessage.data, undefined, 2)
        }
        break
      }
      default:
        break
    }
  }

  renderApp()
})()
