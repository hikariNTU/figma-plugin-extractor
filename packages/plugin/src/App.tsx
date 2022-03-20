import ActionBlock from './components/Action'
import EditorBlock from './components/Editor'
import Header from './components/Header'
import 'preact/debug'
import { useEffect } from 'preact/hooks'

const App = () => {
  useEffect(() => {
    console.log('global')
  }, [])
  return (
    <>
      <Header></Header>
      <ActionBlock></ActionBlock>
      <EditorBlock></EditorBlock>
    </>
  )
}

export default App
