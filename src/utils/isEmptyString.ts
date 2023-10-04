export const isEmptyString = (val: string): boolean => {
  return /^\s*$/.test(val)
}
