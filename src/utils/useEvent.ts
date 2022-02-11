const useEvent = (name: string) => {
  return {
    eventHandler: () => {
      parent.postMessage({ pluginMessage: { type: name } }, '*')
    },
  }
}

export { useEvent }
