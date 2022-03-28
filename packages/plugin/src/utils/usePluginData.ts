import { useEffect, useState } from 'preact/hooks'
import { createContext } from 'preact'
import { EVENT } from './constant'

const usePluginData = () => {
  const [contextData, setContextData] = useState(() => ({}))
  const [listener, setListener] = useState<(ev: MessageEvent) => void>()
  const Context = createContext(contextData)

  const setPluginData = (type: string, data: unknown) => {
    setContextData((prev) => Object.assign({}, prev, { [type]: data }))
    console.log('set', { type, data })
  }

  useEffect(() => {
    const currentListener = (event: MessageEvent) => {
      console.log(event.data)
      if (!event?.data?.pluginMessage) {
        return
      }
      setPluginData(
        event.data.pluginMessage?.type,
        event.data.pluginMessage?.data
      )
    }

    window.addEventListener('message', currentListener)
  }, [])

  return {
    Context,
    contextData,
    setContextData,
    setPluginData,
  }
}

export { usePluginData }
