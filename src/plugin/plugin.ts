import {
  CssEntry,
  colorToCss,
  gatherTypoStyles,
  generateClassSheet,
  generateStyleSheet,
  getColor,
  getTypography,
  toCssVariable,
  splitGroup,
  purifyName,
  EVENT,
} from '../utils'

import { globalOption } from './globalOption'

figma.showUI(__html__, {
  title: 'Extract Style (alpha)',
  height: 600,
  width: 800,
})

const toEditor = (data: unknown, isString = false) => {
  figma.ui.postMessage({
    type: isString ? EVENT.STRING.key : EVENT.JSON.key,
    data,
  })
}

interface MessageData {
  type: keyof typeof EVENT
  data: unknown
}

figma.ui.onmessage = (msg: MessageData) => {
  switch (msg.type) {
    case EVENT.COLOR_DATA.key: {
      const color = getColor().map((v) => ({
        ...v,
        cssName: toCssVariable(v.name),
      }))
      toEditor(color)
      break
    }
    case EVENT.TYPO_DATA.key: {
      const texts = getTypography().map((v) => ({
        ...v,
        cssName: toCssVariable(v.name),
      }))
      toEditor(texts)
      break
    }
    case EVENT.COLOR_CSS.key: {
      const colors = getColor()
      const entries: CssEntry[] = []
      colors.forEach((color) => {
        entries.push(
          ...colorToCss(color, undefined, { prefix: globalOption.prefix })
        )
      })
      toEditor(generateStyleSheet(entries), true)
      break
    }
    case EVENT.TYPO_CSS.key: {
      const styleSheet = getTypography()
        .map((font) => ({
          entries: gatherTypoStyles(font),
          name: toCssVariable(font.name, { prefix: globalOption.prefix }).slice(
            2
          ),
        }))
        .map(({ entries, name }) => generateClassSheet(entries, name))
        .join('\n\n')
      toEditor(styleSheet, true)
      break
    }
    case EVENT.COLOR_CSS_MAP.key: {
      const colors = getColor().map(({ name }) =>
        splitGroup(name).map((v) => purifyName(v))
      )
      toEditor(colors)
      break
    }
    default:
      figma.closePlugin()
  }

  figma.notify('Done: ' + EVENT?.[msg.type]?.name)
}
