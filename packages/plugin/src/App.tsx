import { useEffect } from 'preact/hooks'
import ActionBlock from './components/Action'
import EditorBlock from './components/Editor'
import Header from './components/Header'
import { EVENT } from './share'
import { useEvent } from './utils/useEvent'

import { usePluginData } from './utils/usePluginData'

const App = () => {
  const { Context, contextData, setPluginData } = usePluginData()

  useEffect(() => {
    const evHandler = (event: MessageEvent) => {
      console.log(event.data.pluginMessage)

      switch (event.data?.pluginMessage?.type) {
        case 'setData':
          setPluginData(
            event.data.pluginMessage.data.name,
            event.data.pluginMessage.data.payload
          )
          break
        default:
          break
      }
    }
    window.addEventListener('message', evHandler)
    return () => window.removeEventListener('message', evHandler)
  }, [setPluginData])

  useEffect(() => {
    useEvent(EVENT.GET_ALL.key).eventHandler()
  }, [])

  return (
    <Context.Provider value={contextData}>
      <Header></Header>
      <EditorBlock></EditorBlock>
      <ActionBlock></ActionBlock>
    </Context.Provider>
  )
}

const AppWrapper = () => {
  return <App />
}

export default AppWrapper
