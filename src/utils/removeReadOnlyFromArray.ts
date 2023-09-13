type BaseElement = string | number | boolean | null | undefined

const removeReadOnlyFromArray = <T extends BaseElement>(arr: readonly T[]): T[] => {
  let newArr: T[] = []
  for (let i = 0; i < arr.length; i++) {
    newArr = arr.concat(
      newArr, arr[i]
    )
  }
  return newArr
}
export default removeReadOnlyFromArray
