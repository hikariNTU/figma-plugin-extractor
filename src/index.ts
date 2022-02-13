import App from './App'
import { render } from 'preact'

const renderApp = () => {
  render(App(), document.body)
}

;(function () {
  onmessage = (event) => {
    console.log(event.data.pluginMessage)
    switch (event.data?.pluginMessage?.type) {
      case 'json':
      case 'color':
      case 'typo': {
        const el = document.getElementById('editor') as HTMLTextAreaElement

        if (el) {
          el.value = JSON.stringify(event.data.pluginMessage.data, undefined, 2)
        }
        break
      }
      case 'string': {
        const el = document.getElementById('editor') as HTMLTextAreaElement

        if (el) {
          el.value = event.data.pluginMessage.data
        }
        break
      }
      default:
        break
    }
  }

  renderApp()
})()
