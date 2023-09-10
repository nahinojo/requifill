/*
Adds features to requisition form DOM elements
*/
import isProperURL from '../utils/isProperURL'

if (isProperURL) {
  /*
  Wrapper function for setting value of target <input>
  */
  type InputSetter = (value: string) => void
  const focusInputValue = (targetInput: HTMLInputElement): InputSetter => {
    return (value: string): void => {
      targetInput.value = value
      targetInput.select()
    }
  }

  /*
  Assists cyclicaly indexing Arrays.
  */
  const modulo = (
    mod: number,
    num: number
  ): number => {
    return ((num % mod) + mod) % mod
  }

  /*
  Enchance any list-based input
  Scrolling cycles through list within target <input>
  */
  const addAutofillValueScroller = (
    id: string,
    autofillValue: string[]
  ): void => {
    const targetInput = document.getElementById(id) as HTMLInputElement
    const setInputValue = focusInputValue(targetInput)
    let currentIdx = (
      autofillValue.includes(targetInput.value)
        ? autofillValue.indexOf(targetInput.value)
        : 0
    )
    targetInput.addEventListener(
      'wheel', (evt) => {
        evt.preventDefault()
        if (autofillValue.includes(targetInput.value)) {
          if (evt.deltaY > 0) {
            currentIdx = modulo(
              autofillValue.length, (currentIdx + 1)
            )
          } else {
            currentIdx = modulo(
              autofillValue.length, (currentIdx - 1)
            )
          }
        } else {
          currentIdx = 0
        }
        setInputValue(autofillValue[currentIdx])
      }
    )
  }

  /*
  Enchance any numeric <input>
  Scrolling increases or decreases target input element by 1
  */
  const addNumericScroller = (
    id: string,
    defaultNumber: number,
    decimalPlace: number
  ): void => {
    const targetInput = document.getElementById(id) as HTMLInputElement
    const setInputValue = focusInputValue(targetInput)
    let currentNumber = defaultNumber
    targetInput.addEventListener(
      'wheel', (evt) => {
        evt.preventDefault()
        const inputContainsValidNumber = (
          Number(targetInput.value) !== null &&
        Number(targetInput.value) >= defaultNumber)
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
        setInputValue(currentNumber.toFixed(decimalPlace))
      }
    )
  }

  const addAutofillValueScrollerSelector = (
    selector: string,
    autofillValue: string[]
  ): void => {
    const elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
      addAutofillValueScroller(
        elements[i].id,
        autofillValue
      )
    }
  }

  const addNumericScrollerSelector = (
    selector: string,
    defaultNumber: number,
    decimalPlace: number
  ): void => {
    const elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
      addNumericScroller(
        elements[i].id,
        defaultNumber,
        decimalPlace
      )
    }
  }

  addAutofillValueScroller(
    'document.documentHeader.documentDescription',
    ['Amazon', 'Ebay', 'McMaster-Carr', 'Newegg']
  )

  addAutofillValueScroller(
    'document.documentHeader.organizationDocumentNumber',
    ['080p', '081p']
  )

  addAutofillValueScrollerSelector(
    '[id$=".itemUnitOfMeasureCode"]',
    ['UN', 'PK']
  )

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
