import { lineHeighToCss, translateFontVariant } from './typography'
import type { TypoInfo } from '../plugin/localGetters'
import type { ColorInfo, CssEntry } from '../share'
import { colorCssFunctions, ColorVariableType, toRGB } from './color'

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

// CSS Name transform
const regSlash = new RegExp(/[\\/]/g)
const ignoreChar = new RegExp(/[^a-zA-Z0-9-\\/]/g)

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

const purifyName = (
  name: string,
  ignoreSpace: CssVariableOption['ignoreSpace'] = true
): string => {
  let transformed = name

  if (ignoreSpace) {
    transformed = transformed.replaceAll(' ', '')
  }

  transformed = transformed.replaceAll(ignoreChar, '-').toLowerCase()
  return transformed
}

const toCssVariable = (name = '', options?: Partial<CssVariableOption>) => {
  const op = Object.assign({ ...defaultCssVariableOption }, options)

  let transformed = purifyName(name, op.ignoreSpace)

  transformed = splitGroup(transformed, op.groupSpecifier).join(op.groupSplit)

  if (op.prefix) {
    transformed = `${op.prefix}-${transformed}`
  }

  return `--${transformed}`
}

// Entry transform
const entryToString = (entry: CssEntry, indent = 2) =>
  entry._isComment
    ? `${' '.repeat(indent)}/* ${entry.value} */`
    : `${' '.repeat(indent)}${entry.name}: ${entry.value};`

// StyleSheet transform
const generateStyleSheet = (entries: CssEntry[]): string => {
  const styles = entries.map((entry) => entryToString(entry)).join('\n')
  return `:root{\n${styles}\n}`
}

const generateClassSheet = (entries: CssEntry[], name: string): string => {
  const styles = entries.map((entry) => entryToString(entry)).join('\n')
  return `.${name} {\n${styles}\n}`
}

// Color transform
const colorToCss = (
  color: ColorInfo,
  func: ColorVariableType = ColorVariableType.rgbBundle,
  cssVariableOptions?: Partial<CssVariableOption>
): CssEntry[] => {
  return colorCssFunctions[func](
    toCssVariable(color.name, cssVariableOptions),
    toRGB(color)
  )
}

// Type transform
const gatherTypoStyles = (font: TypoInfo[number]): CssEntry[] => {
  const styles: CssEntry[] = []

  // font-family
  // doesn't seem right to me
  // figma did not provide fallback mechanism as browser do
  // provide a comment for further processing
  styles.push({
    _isComment: true,
    value: `font-family:${font.fontName.family};`,
  })

  // font-size
  styles.push({
    name: 'font-size',
    value: `${font.fontSize}px`,
  })

  // font-weight, italic
  const variant = translateFontVariant(font.fontName.style)
  styles.push({ name: 'font-weight', value: variant.weight.toString(10) })
  if (variant.italic) {
    styles.push({ name: 'font-style', value: 'italic' })
  }

  // line-height
  const lineHeight = lineHeighToCss(font.lineHeight)
  if (lineHeight) {
    styles.push(lineHeight)
  }

  return styles
}

export {
  toCssVariable,
  splitGroup,
  colorToCss,
  generateStyleSheet,
  entryToString,
  gatherTypoStyles,
  generateClassSheet,
  purifyName,
}
