import { useContext, useLayoutEffect, useState } from 'preact/hooks'
import { usePluginData } from '../utils/usePluginData'
import { CopyTextButton } from './CopyTextButton'

export interface TabVariant {
  name: string
  transform?: (data: any) => any
}

const Tabular = ({ variants = [] }: { variants: TabVariant[] }) => {
  const [selected, setSelected] = useState(variants[0]?.name)
  const currentVariant = variants.find((v) => v?.name === selected)
  const { Context } = usePluginData()
  const data = useContext(Context)
  const transformedData = currentVariant?.transform
    ? currentVariant.transform(data)
    : data
  const displayText =
    typeof transformedData === 'object'
      ? JSON.stringify(transformedData, undefined, 2)
      : transformedData

  useLayoutEffect(() => {
    setSelected(variants[0]?.name)
  }, [variants])

  return (
    <section class="tabular">
      <ul class="tab-group">
        {variants.map((v) => (
          <li
            class={`tab-group-li ${
              v?.name === selected ? 'tab-group-li--selected' : ''
            }`}
            onClick={() => setSelected(v.name)}
          >
            {v.name}
          </li>
        ))}
      </ul>
      <pre class="tab-group-code x-scroll-bar">
        <CopyTextButton value={displayText} />
        <code id="editor">{displayText}</code>
      </pre>
    </section>
  )
}

export { Tabular }
