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
    } = text
    return {
      fontSize,
      name,
      letterSpacing,
      lineHeight,
      textCase,
      textDecoration,
    }
  })

  return allTypos
}
