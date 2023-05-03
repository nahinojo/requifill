/*
Improves the DOM elements of requisition form, such as allowing integer
scrolling of numeric inputs.
*/
import { isProperURL } from './constants'

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
  Assists the cyclical indexing of Arrays.
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
    tenthsPlace: number
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
      setInputValue(currentNumber.toFixed(tenthsPlace))
    })
  }

  const addNumericScrollerSelector = (
    // scrollerFunction: (
    //   id: string,
    //   options: string[]
    // ) => void,
    selectors: string
  ): void => {
    console.log('Executing appendNumericScrollers')
    const options = document.querySelectorAll(selectors)
    console.log('options', options)
  }
  addNumericScrollerSelector('[id^="document.item"]')

  addOptionsScroller(
    'document.documentHeader.documentDescription',
    ['Amazon', 'Ebay', 'McMaster-Carr', 'Newegg']
  )

  addOptionsScroller(
    'document.documentHeader.organizationDocumentNumber',
    ['080p', '081p']
  )

  addNumericScroller(
    'newPurchasingItemLine.itemQuantity',
    1,
    0
  )

  addOptionsScroller(
    'newPurchasingItemLine.itemUnitOfMeasureCode',
    ['UN', 'PK']
  )

  addNumericScroller(
    'newPurchasingItemLine.itemUnitPrice',
    0.99,
    2
  )
}
