export type CssEntry = {
  /** define entry as comment, value will be surround by comment block */
  _isComment?: boolean
  /** Css style or css variable name */
  name?: string
  value: string
}

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

export type TypoInnerStyle =
  | 'font-size'
  | 'font-family'
  | 'font-weight'
  | 'font-style'
  | 'line-height'
