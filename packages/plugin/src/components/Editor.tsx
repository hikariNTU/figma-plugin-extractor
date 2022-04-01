import { useState } from 'preact/hooks'
import { globalOption } from '../plugin/globalOption'
import {
  colorToCss,
  gatherTypoStyles,
  generateClassSheet,
  generateStyleSheet,
  purifyName,
  splitGroup,
  toCssVariable,
} from '../utils'
import type { TypoInfo } from '../plugin/localGetters'
import { Tabular, TabVariant } from './Tabular'
import type { ColorInfo, CssEntry } from '../share'

type Tabs = 'color' | 'typo' | 'all'

const ScopeMap: Record<Tabs, TabVariant[]> = {
  all: [{ name: 'Raw' }],
  color: [
    { name: 'Raw', transform: (data) => data['color'] },
    {
      name: 'CSS',
      transform: (data) => {
        const colors = data.color as ColorInfo[]
        if (!colors?.length) {
          return
        }
        const entries: CssEntry[] = []
        colors.forEach((color) => {
          entries.push(
            ...colorToCss(color, undefined, { prefix: globalOption.prefix })
          )
        })
        return generateStyleSheet(entries)
      },
    },
    {
      name: 'CSS name map',
      transform: (data) => {
        const colors = data.color as ColorInfo[]
        if (!colors?.length) {
          return
        }
        return colors.map(({ name }) =>
          splitGroup(name).map((v) => purifyName(v))
        )
      },
    },
  ],
  typo: [
    { name: 'Raw', transform: (data) => data['typo'] },
    {
      name: 'CSS',
      transform: (data) =>
        (data?.typo as TypoInfo)
          ?.map?.((font) => ({
            entries: gatherTypoStyles(font),
            name: toCssVariable(font.name, {
              prefix: globalOption.prefix,
            }).slice(2),
          }))
          .map(({ entries, name }) => generateClassSheet(entries, name))
          .join('\n\n'),
    },
  ],
}

const EditorBlock = () => {
  const [scope, setScope] = useState<keyof typeof ScopeMap>('all')

  return (
    <div class="editor-block x-scroll-bar">
      <ul class="editor-tabs">
        {Object.keys(ScopeMap).map((name) => (
          <li
            class={`editor-tab ${scope === name ? 'editor-tab--selected' : ''}`}
            onClick={() => setScope(name as Tabs)}
          >
            {name}
          </li>
        ))}
      </ul>
      <Tabular variants={ScopeMap[scope]} />
    </div>
  )
}
export default EditorBlock
