export const camelToKebabCase = (camelString: string): string => {
  let kebabString = camelString[0]
  let i = 1
  while (i < camelString.length) {
    const char = camelString[i]
    if (char !== char.toUpperCase()) {
      kebabString = ''.concat(
        kebabString, char
      )
    } else {
      kebabString = ''.concat(
        kebabString, '-', char.toLowerCase()
      )
    }
    i++
  }
  return kebabString
}
