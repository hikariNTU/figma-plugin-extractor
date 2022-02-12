import { toRGB } from '.'
import { ColorInfo } from './color'

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

export type ColorToCssAttrFunction = (
  name: string,
  rgba: ReturnType<typeof toRGB>
) => string[]

export enum ColorVariableType {
  rgbaOnly = 'RGBA',
  hexOnly = 'HEX',
  rgbBundle = 'RGB_BUNDLE',
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

const colorCssFunctions: Record<ColorVariableType, ColorToCssAttrFunction> = {
  [ColorVariableType.rgbaOnly]: (name, rgba) => [`${name}: ${rgba.join(', ')}`],
  [ColorVariableType.hexOnly]: (name, rgba) => {
    const attr = rgba
      .map((number, idx) => {
        const n = idx !== 3 ? number : Math.round(number * 255)
        return n.toString(16).padStart(2, '0')
      })
      .join('')
    return [`${name}: ${attr}`]
  },
  [ColorVariableType.rgbBundle]: (name, rgba) => [
    `${name}--rgb: ${rgba.slice(0, 3).join(', ')}`,
    ...(rgba[3] !== undefined ? [`${name}--opacity: ${rgba[3]}`] : []),
    `${name}: rgb(var(${name}--rgb), var(${name}--opacity, 1))`,
  ],
}

const colorToCss = (
  color: ColorInfo,
  func: ColorVariableType = ColorVariableType.rgbBundle
): string[] => {
  return colorCssFunctions[func](toCssVariable(color.name), toRGB(color))
}

export { toCssVariable, splitGroup, colorToCss }
