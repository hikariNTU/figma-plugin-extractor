import { getColor } from './utils'

figma.showUI(__html__, {
  title: 'Extract Style (alpha)',
  height: 600,
  width: 800,
})

figma.ui.onmessage = (msg) => {
  if (msg.type === 'getColor') {
    const color = getColor()
    console.log(color)
    figma.ui.postMessage({
      type: 'color',
      data: color,
    })
    return
  }
  figma.closePlugin()
}
