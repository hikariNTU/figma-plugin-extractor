export interface CssVariableOption {
  /**
   * prefixing variable before all name.
   *
   * eg: `prefix: 'ex'`, name: `red`, value: `#F00`
   *
   * transformed: var: `--ex-red: #F00`
   **/
  prefix: string
  /** Group logic, figma use backward slash `/`, extend to both slash by default */
  groupSpecifier: RegExp | string
  /** default `--` */
  groupSplit: string
  /** ignore all spaces as none, default true. Figma tend to add meaningless space around group */
  ignoreSpace: boolean
}

const regSlash = new RegExp(/[\\/]/g)
const ignoreChar = new RegExp(/[^a-zA-Z0-9-]/g)

const defaultCssVariableOption: CssVariableOption = {
  prefix: '',
  groupSpecifier: regSlash,
  groupSplit: '--',
  ignoreSpace: true,
}

const splitGroup = (
  name = '',
  specifier = defaultCssVariableOption.groupSpecifier
) => name.split(specifier)

const toCssVariable = (name = '', options?: Partial<CssVariableOption>) => {
  const op = Object.assign({ ...defaultCssVariableOption }, options)
  let transformed = name

  if (op.ignoreSpace) {
    transformed = transformed.replaceAll(' ', '')
  }

  transformed = splitGroup(transformed, op.groupSpecifier)
    .map((s) => s.replaceAll(ignoreChar, '-').toLowerCase())
    .join(op.groupSplit)

  if (op.prefix) {
    transformed = `${op.prefix}-${transformed}`
  }

  return `--${transformed}`
}

export { toCssVariable, splitGroup }
