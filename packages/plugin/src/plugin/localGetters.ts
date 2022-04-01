/**
 * This file contain how we retrieve data from figma api in plugin
 */

import type { ColorInfo } from '../share'

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

export type TypographyPreserve = keyof Pick<
  TextStyle,
  | 'fontName'
  | 'letterSpacing'
  | 'lineHeight'
  | 'paragraphIndent'
  | 'paragraphSpacing'
  | 'textCase'
  | 'textDecoration'
  | 'fontSize'
>

export const defaultTypoPreserve: TypographyPreserve[] = [
  'fontSize',
  'lineHeight',
  'letterSpacing',
]

export const getTypography = () => {
  const texts = figma.getLocalTextStyles()

  const allTypos = texts.map((text) => {
    const {
      fontSize,
      name,
      letterSpacing,
      lineHeight,
      textCase,
      textDecoration,
      description,
      fontName,
      paragraphSpacing,
      paragraphIndent,
      type,
    } = text

    return {
      fontSize,
      name,
      letterSpacing,
      lineHeight,
      textCase,
      textDecoration,
      description,
      fontName,
      paragraphSpacing,
      paragraphIndent,
      type,
    }
  })

  return allTypos
}

export type TypoInfo = ReturnType<typeof getTypography>
