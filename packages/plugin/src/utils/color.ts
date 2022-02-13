import { ColorInfo, CssEntry, RGBAList, RGBList } from './type'

export type ColorToCssAttrFunction = (
  name: string,
  rgba: ReturnType<typeof toRGB>
) => CssEntry[]

export enum ColorVariableType {
  rgbaOnly = 'RGBA',
  hexOnly = 'HEX',
  rgbBundle = 'RGB_BUNDLE',
}

export const colorCssFunctions: Record<
  ColorVariableType,
  ColorToCssAttrFunction
> = {
  [ColorVariableType.rgbaOnly]: (name, rgba) => [
    { name, value: rgba.join(', ') },
  ],

  [ColorVariableType.hexOnly]: (name, rgba) => {
    const value = rgba
      .map((number, idx) => {
        const n = idx !== 3 ? number : Math.round(number * 255)
        return n.toString(16).padStart(2, '0')
      })
      .join('')
    return [{ name, value }]
  },

  [ColorVariableType.rgbBundle]: (name, rgba) => [
    { name: `${name}--rgb`, value: rgba.slice(0, 3).join(', ') },
    ...(rgba[3] !== undefined
      ? [
          {
            name: `${name}--a`,
            value: rgba[3].toPrecision(4),
          },
        ]
      : []),
    { name, value: `rgb(var(${name}--rgb), var(${name}--a, 1))` },
  ],
}

export const toRGB = (color: ColorInfo): RGBList | RGBAList => {
  const rgba = [color.rgb.r, color.rgb.g, color.rgb.b].map((v) =>
    Math.round(v * 255)
  ) as RGBList
  if (color.opacity !== undefined && color.opacity !== 1) {
    rgba.push(color.opacity)
  }
  return rgba
}
