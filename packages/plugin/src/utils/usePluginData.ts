import { useState } from 'preact/hooks'
import { createContext } from 'preact'

const Context = createContext({})

const usePluginData = () => {
  const [contextData, setContextData] = useState(() => ({}))

  const setPluginData = (type: string, data: unknown) => {
    setContextData((prev) => Object.assign({}, prev, { [type]: data }))
    console.log('set', { type, data })
  }

  return {
    Context,
    contextData,
    setContextData,
    setPluginData,
  }
}

export { usePluginData }
