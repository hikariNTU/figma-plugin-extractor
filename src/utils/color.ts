export interface ColorInfo {
  name: string
  desc?: string
  /** range: 0 ~ 1 float number */
  rgb: RGB
  /** range: 0 ~ 1 float number */
  opacity?: number
}

/** 0~255 integer */
export type Color8Bit = number

/** 0~1 float */
export type OpacityFloat = number
export type RGBList = [Color8Bit, Color8Bit, Color8Bit]
export type RGBAList = [...RGBList, OpacityFloat]

/**
 * Retrieve all used local color in figma file.
 * @returns Color info if paint type is solid
 */
export const getColor = (): ColorInfo[] => {
  const paints = figma.getLocalPaintStyles()

  const allColor = paints
    .filter((p) => p.paints?.[0].type === 'SOLID')
    .map((paintStyle) => {
      const color = paintStyle.paints[0] as SolidPaint

      return {
        name: paintStyle.name,
        desc: paintStyle.description,
        rgb: { ...color.color },
        opacity: color.opacity,
      }
    })

  return allColor
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
