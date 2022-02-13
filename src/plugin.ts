import {
  CssEntry,
  colorToCss,
  gatherTypoStyles,
  generateClassSheet,
  generateStyleSheet,
  getColor,
  getTypography,
  toCssVariable,
} from './utils'

figma.showUI(__html__, {
  title: 'Extract Style (alpha)',
  height: 600,
  width: 800,
})

figma.ui.onmessage = (msg) => {
  if (msg.type === 'getColor') {
    const color = getColor().map((v) => ({
      ...v,
      cssName: toCssVariable(v.name),
    }))
    figma.ui.postMessage({
      type: 'color',
      data: color,
    })
  } else if (msg.type === 'getText') {
    const texts = getTypography().map((v) => ({
      ...v,
      cssName: toCssVariable(v.name),
    }))
    figma.ui.postMessage({
      type: 'typo',
      data: texts,
    })
  } else if (msg.type === 'toCssColor') {
    const colors = getColor()
    const entries: CssEntry[] = []
    colors.forEach((color) => {
      entries.push(...colorToCss(color))
    })
    figma.ui.postMessage({
      type: 'string',
      data: generateStyleSheet(entries),
    })
  } else if (msg.type === 'toCssFont') {
    const styleSheet = getTypography()
      .map((font) => ({
        entries: gatherTypoStyles(font),
        name: toCssVariable(font.name, { prefix: 'xv-' }).slice(2),
      }))
      .map(({ entries, name }) => generateClassSheet(entries, name))
      .join('\n\n')

    figma.ui.postMessage({
      type: 'string',
      data: styleSheet,
    })
  } else {
    figma.closePlugin()
  }
}
