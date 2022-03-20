import App from './App'
import { render } from 'preact'
import { EVENT } from './utils'

const renderApp = () => {
  render(App, document.body)
}

const toCodeBlock = (str: string): void => {
  const el = document.getElementById('editor') as HTMLPreElement

  if (el) {
    el.innerText = str
  }
}

;(function () {
  onmessage = (event) => {
    console.log(event.data.pluginMessage)

    switch (event.data?.pluginMessage?.type) {
      case EVENT.JSON.key:
      case 'color':
      case 'typo': {
        toCodeBlock(JSON.stringify(event.data.pluginMessage.data, undefined, 2))
        break
      }
      case EVENT.STRING.key: {
        toCodeBlock(event.data.pluginMessage.data)
        break
      }
      default:
        break
    }
  }

  renderApp()
})()
