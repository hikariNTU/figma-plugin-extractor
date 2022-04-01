const version = __PLUGIN_VERSION__

const HeaderBlock = () => {
  return (
    <header class="header">
      <span>
        version <code>{version}</code>
      </span>
    </header>
  )
}

export default HeaderBlock
