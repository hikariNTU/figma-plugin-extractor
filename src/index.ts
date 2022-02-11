import App from './App'
import { render } from 'preact'

const renderApp = () => {
  render(App(), document.body)
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
