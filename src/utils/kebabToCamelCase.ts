export const kebabToCamelCase = (kebabString: string): string => {
  let camelString = kebabString[0]
  let i = 1
  let isUpperNextChar = false
  while (i < kebabString.length) {
    const char = kebabString[i]
    if (char === '-') {
      isUpperNextChar = true
    } else {
      if (isUpperNextChar) {
        camelString = ''.concat(
          camelString, char.toUpperCase()
        )
        isUpperNextChar = false
      } else {
        camelString = ''.concat(
          camelString, char
        )
      }
    }
    i++
  }
  return camelString
}
