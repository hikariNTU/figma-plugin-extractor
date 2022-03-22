import ActionBlock from './components/Action'
import EditorBlock from './components/Editor'
import Header from './components/Header'
import { useEffect } from 'preact/hooks'

const App = () => {
  useEffect(() => {
    console.log('hello effect')
  }, [])

  return (
    <>
      <Header></Header>
      <ActionBlock></ActionBlock>
      <EditorBlock></EditorBlock>
    </>
  )
}

const AppWrapper = () => {
  return <App />
}

export default AppWrapper
