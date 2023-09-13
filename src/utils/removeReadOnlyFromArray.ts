type BaseElement = string | number | boolean | null
type BaseArray = BaseElement[]
type BaseArrayReadonly = readonly BaseElement[]

const removeReadOnlyFromArray = (arr: BaseArrayReadonly): BaseArray => {
  let newArr: BaseArray = []
  for (let i = 0; i < arr.length; i++) {
    newArr = arr.concat(
      newArr, arr[i]
    )
  }
  return newArr
}
export default removeReadOnlyFromArray
