export interface ColorInfo {
  name: string
  desc?: string
  /** range: 0 ~ 1 float number */
  rgb: RGB
  /** range: 0 ~ 1 float number */
  opacity?: number
}

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
