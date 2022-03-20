import { useEffect } from 'preact/hooks'
const version = __PLUGIN_VERSION__

const HeaderBlock = () => {
  useEffect(() => {
    console.log('Effect here')
  }, [])

  return (
    <header class="header">
      <span>
        version <code>{version}</code>
      </span>
    </header>
  )
}

export default HeaderBlock
