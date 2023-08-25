const camelToKebabCase = (camelString: string): string => {
  var kebabString = camelString[0]
  let i = 1
  while (i < camelString.length) {
    let char = camelString[i]
    if (char !== char.toUpperCase()) {
      kebabString = ''.concat(kebabString, char)
    } else {
      kebabString = ''.concat(kebabString, '-', char.toLowerCase())
    }
    i++
  }
  return kebabString
}
export default camelToKebabCase