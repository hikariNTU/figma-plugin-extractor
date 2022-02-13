export const pick = <T extends object, K extends (keyof T)[]>(
  obj: T,
  keys: K = [] as unknown as K
): Pick<T, K[number]> => {
  return Object.assign(
    {},
    ...keys.map((key) => ({
      [key]: obj[key],
    }))
  )
}
