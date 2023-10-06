import { isProperURL } from '../utils'

type SetInput = (value: string) => void

if (isProperURL) {
  const selectTargetInput = (targetInput: HTMLInputElement): SetInput => {
    return (value: string): void => {
      targetInput.select()
      targetInput.value = value
    }
  }
  const addNumericScroller = (
    id: string,
    defaultNumber: number,
    roundToDecimalPlace: number
  ): void => {
    const targetInput = document.getElementById(id) as HTMLInputElement
    const setInputValue = selectTargetInput(targetInput)
    let currentNumber = defaultNumber
    targetInput.addEventListener(
      'wheel', (evt) => {
        evt.preventDefault()
        const inputContainsValidNumber = (
          Number(targetInput.value) !== null &&
          Number(targetInput.value) >= defaultNumber
        )
        if (inputContainsValidNumber) {
          currentNumber = Number(targetInput.value)
          if (evt.deltaY < 0) {
            currentNumber += 1
          } else if (Number(targetInput.value) !== defaultNumber) {
            currentNumber -= 1
          }
        } else {
          currentNumber = defaultNumber
        }
        setInputValue(currentNumber.toFixed(roundToDecimalPlace))
      }
    )
  }
  const addNumericScrollerSelector = (
    selector: string,
    defaultNumber: number,
    roundToDecimalPlace: number
  ): void => {
    const elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
      addNumericScroller(
        elements[i].id,
        defaultNumber,
        roundToDecimalPlace
      )
    }
  }
  addNumericScrollerSelector(
    '[id$=".itemQuantity"]',
    1,
    0
  )

  addNumericScrollerSelector(
    '[id$=".itemUnitPrice"]',
    0.99,
    2
  )
}
