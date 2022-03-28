import ActionBlock from './components/Action'
import EditorBlock from './components/Editor'
import Header from './components/Header'

import { usePluginData } from './utils/usePluginData'

const App = () => {
  const { Context, contextData, setContextData, setPluginData } =
    usePluginData()

  return (
    <Context.Provider value={contextData}>
      <Header></Header>
      <ActionBlock></ActionBlock>
      <EditorBlock></EditorBlock>
      <div>{JSON.stringify(contextData ?? {})}</div>
    </Context.Provider>
  )
}

const AppWrapper = () => {
  return <App />
}

export default AppWrapper
