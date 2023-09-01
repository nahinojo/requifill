/*
Adds features to requisition form DOM elements.
*/
import isProperURL from '../common/isProperURL'

if (isProperURL) {
  /*
  Wrapper function for setting value of target <input> element.
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
  const modulo = (m: number, n: number): number => {
    return ((n % m) + m) % m
  }

  /*
  Enchance any list-based input.
  Scrolling cycles through list within target input element.
  */
  const addOptionsScroller = (
    id: string,
    options: string[]
  ): void => {
    const targetInput = document.getElementById(id) as HTMLInputElement
    const setInputValue = focusInputValue(targetInput)
    let currentIdx = (
      options.includes(targetInput.value)
        ? options.indexOf(targetInput.value)
        : 0
    )
    targetInput.addEventListener('wheel', (evt) => {
      evt.preventDefault()
      if (options.includes(targetInput.value)) {
        if (evt.deltaY > 0) {
          currentIdx = modulo(options.length, (currentIdx + 1))
        } else {
          currentIdx = modulo(options.length, (currentIdx - 1))
        }
      } else {
        currentIdx = 0
      }
      setInputValue(options[currentIdx])
    })
  }

  /*
  Enchance any numeric input.
  Scrolling increases or decreases target input element by 1.
  */
  const addNumericScroller = (
    id: string,
    defaultNumber: number,
    decimalPlace: number
  ): void => {
    const targetInput = document.getElementById(id) as HTMLInputElement
    const setInputValue = focusInputValue(targetInput)
    let currentNumber = defaultNumber
    targetInput.addEventListener('wheel', (evt) => {
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
    })
  }

  const addOptionsScrollerSelector = (
    selector: string,
    options: string[]
  ): void => {
    const elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
      addOptionsScroller(
        elements[i].id,
        options
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

  addOptionsScroller(
    'document.documentHeader.documentDescription',
    ['Amazon', 'Ebay', 'McMaster-Carr', 'Newegg']
  )

  addOptionsScroller(
    'document.documentHeader.organizationDocumentNumber',
    ['080p', '081p']
  )

  addOptionsScrollerSelector(
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
