import { getColor, getTypography, toCssVariable } from './utils'

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
    return
  } else if (msg.type === 'getText') {
    const texts = getTypography().map((v) => ({
      ...v,
      cssName: toCssVariable(v.name),
    }))
    figma.ui.postMessage({
      type: 'typo',
      data: texts,
    })
    return
  }
  figma.closePlugin()
}
