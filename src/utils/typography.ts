import { CssEntry } from './type'

export const lineHeighToCss = (line: LineHeight): CssEntry | undefined => {
  switch (line.unit) {
    case 'PIXELS':
      return { name: 'line-height', value: `${line.value}px` }
    case 'PERCENT':
      return { name: 'line-height', value: `${line.value}%` }
    case 'AUTO':
      return
  }
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 */
export const fontWeightLUT: Record<string, number> = {
  hairline: 50,
  'ultra-thin': 50,
  thin: 100,
  'extra-light': 200,
  'ultra-light': 200,
  light: 300,
  normal: 400,
  regular: 400,
  // might fallback to 400, but decide to let style inherit weight
  // undefined: 400,
  medium: 500,
  'semi-bold': 600,
  'demi-bold': 600,
  bold: 700,
  'extra-bold': 800,
  'ultra-bold': 800,
  black: 900,
  heavy: 900,
}

export const translateFontVariant = (
  style: string,
  fallbackWeight: number | undefined = 400
) => {
  const specifiers = style
    .split(/[- ]/)
    .filter((v) => v)
    .map((v) => v.toLowerCase())

  // check whether italic is in the name
  let italic = false
  const italicIndex = specifiers.indexOf('italic')
  if (italicIndex !== -1) {
    specifiers.splice(italicIndex, 1)
    italic = true
  }

  return {
    weight: fontWeightLUT[specifiers.join('-')] ?? fallbackWeight,
    italic,
  }
}
