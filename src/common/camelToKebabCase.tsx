const camelToKebabCase = (camelString: string): string => {
  var titleString = camelString[0].toLowerCase()
  let i = 1
  while (i < camelString.length) {
    let char = camelString[i]
    if (char !== char.toUpperCase()) {
      titleString = ''.concat(titleString, char)
    } else {
      titleString = ''.concat(titleString, '-', char.toLowerCase())
    }
    i++
  }
  return titleString
}
export default camelToKebabCase