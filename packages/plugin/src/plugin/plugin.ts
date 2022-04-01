import { EVENT } from '../share'
import { getColor, getTypography } from './localGetters'

figma.showUI(__html__, {
  title: 'Figma Plugin Extractor (beta)',
  height: 600,
  width: 800,
})

interface MessageData {
  type: keyof typeof EVENT
  data: unknown
}

figma.ui.onmessage = (msg: MessageData) => {
  switch (msg.type) {
    case EVENT.GET_ALL.key: {
      ;[
        {
          name: 'color',
          payload: getColor(),
        },
        {
          name: 'typo',
          payload: getTypography(),
        },
      ].forEach((data) => {
        figma.ui.postMessage({
          type: 'setData',
          data,
        })
      })
      break
    }
    default:
      break
  }

  figma.notify('Done: ' + EVENT?.[msg.type]?.name)
}
