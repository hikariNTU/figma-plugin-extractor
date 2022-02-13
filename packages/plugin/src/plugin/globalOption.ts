class GlobalOption {
  prefix = 'xv'

  setPrefix(prefix: string) {
    this.prefix = prefix
  }
}

const globalOption = new GlobalOption()

export { GlobalOption, globalOption }
