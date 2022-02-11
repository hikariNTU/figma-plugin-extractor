export interface CssVariableOption {
  /**
   * prefixing variable before all name.
   *
   * eg: `prefix: 'ex'`, name: `red`, value: `#F00`
   *
   * transformed: var: `--ex-red: #F00`
   **/
  prefix: string
  /** default `--` */
  groupSplit: string
  /** ignore spaces, default true */
  ignoreSpace: boolean
}

const regSlash = new RegExp(/[\\/]/g)
const ignoreChar = new RegExp(/[^a-zA-Z0-9-]/g)

const defaultCssVariableOption: CssVariableOption = {
  prefix: '',
  groupSplit: '--',
  ignoreSpace: true,
}

const toCssVariable = (name = '', options?: Partial<CssVariableOption>) => {
  const op = Object.assign({ ...defaultCssVariableOption }, options)
  let transformed = name

  if (op.ignoreSpace) {
    transformed = transformed.replaceAll(' ', '')
  }

  transformed = transformed
    .replaceAll(regSlash, op.groupSplit)
    .replaceAll(ignoreChar, '-')
    .toLowerCase()

  if (op.prefix) {
    transformed = `${op.prefix}-${transformed}`
  }

  return `--${transformed}`
}

export { toCssVariable }
