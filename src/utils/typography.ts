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
