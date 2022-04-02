import { TypoInnerStyle } from '../share'

class GlobalOption {
  prefix: string
  fontStyleInclude: TypoInnerStyle[]

  constructor() {
    this.prefix = 'xv'
    this.fontStyleInclude = [
      'font-size',
      'font-style',
      'font-weight',
      'line-height',
    ]
  }
  setPrefix(prefix: string) {
    this.prefix = prefix
  }
}

const globalOption = new GlobalOption()

export { GlobalOption, globalOption }
