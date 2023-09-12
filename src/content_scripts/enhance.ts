/*
Adds features to requisition form DOM elements
*/
import isProperURL from '../utils/isProperURL'
import syncStorage from '../utils/syncStorage'

if (isProperURL) {
  /*
  Wrapper function for setting value of target <input>
  */
  type InputSetter = (value: string) => void
  const createSetInputValue = (targetInput: HTMLInputElement): InputSetter => {
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
  const addValuesScroller = (
    id: string,
    autofillValues: string[]
  ): void => {
    const targetInput = document.getElementById(id) as HTMLInputElement
    const setInputValue = createSetInputValue(targetInput)
    let currentIdx = (
      autofillValues.includes(targetInput.value)
        ? autofillValues.indexOf(targetInput.value)
        : 0
    )
    targetInput.addEventListener(
      'wheel', (evt) => {
        evt.preventDefault()
        if (autofillValues.includes(targetInput.value)) {
          if (evt.deltaY > 0) {
            currentIdx = modulo(
              autofillValues.length, (currentIdx + 1)
            )
          } else {
            currentIdx = modulo(
              autofillValues.length, (currentIdx - 1)
            )
          }
        } else {
          currentIdx = 0
        }
        setInputValue(autofillValues[currentIdx])
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
    const setInputValue = createSetInputValue(targetInput)
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

  const addValuesScrollerSelector = (
    selector: string,
    autofillValues: string[]
  ): void => {
    const elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i++) {
      addValuesScroller(
        elements[i].id,
        autofillValues
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
  // Do this for all autofill objects in fieldData
  // Ignore cases where isActive is true
  // Reset if syncStorage fiedData changes
  // Ensure indexing is right and proper
  syncStorage
    .get('fieldData')
    .then(({ fieldData }) => {
      const fieldNames = Object.keys(fieldData)
      for (const fieldName of fieldNames) {
        const autofill = fieldData[fieldName].autofill as string | Record<string, string>
        if (typeof autofill === 'object') {
          addValuesScroller(
            'document.documentHeader.documentDescription',
            autofill as Record<string, string>
          )
      }
    })
    .catch(error => {
      console.error(error)
    })

  addValuesScroller(
    'document.documentHeader.organizationDocumentNumber',
    ['080p', '081p']
  )

  addValuesScrollerSelector(
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
