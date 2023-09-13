/*
Adds features to requisition form DOM elements
*/
import isProperURL from '../objects/isProperURL'
import fieldNameToId from '../objects/fieldNameToId'
import syncStorage from '../objects/syncStorage'
import type { FieldNames } from '../objects/fieldNames'
import type SyncStorageData from '../types/SyncStorageData'

console.log('enchance.ts()')

if (isProperURL) {
  const enhance = (): void => {
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
    autofill: readonly string[]
  ): void => {
    const targetInput = document.getElementById(id) as HTMLInputElement
    const setInputValue = createSetInputValue(targetInput)
    let currentIdx = (
      autofill.includes(targetInput.value)
        ? autofill.indexOf(targetInput.value)
        : 0
    )
    targetInput.addEventListener(
      'wheel', (evt) => {
        evt.preventDefault()
        if (autofill.includes(targetInput.value)) {
          if (evt.deltaY > 0) {
            currentIdx = modulo(
              autofill.length, (currentIdx + 1)
            )
          } else {
            currentIdx = modulo(
              autofill.length, (currentIdx - 1)
            )
          }
        } else {
          currentIdx = 0
        }
        setInputValue(autofill[currentIdx])
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
    .get()
    .then((storage: SyncStorageData) => {
      console.log('Mapping multivalues in fieldData to targetInputs')
      const { fieldData } = storage
      const fieldNames = Object.keys(fieldData) as unknown as FieldNames
      console.log(
        'fieldNames:', fieldNames
      )
      for (const fieldName of fieldNames) {
        const { autofill } = fieldData[fieldName]
        let autofillValue: string | string[]
        if (typeof autofill === 'string') {
          autofillValue = [autofill]
        } else {
          autofillValue = Object.values(autofill)
        }
        const id = fieldNameToId[fieldName]
        addValuesScroller(
          id,
          autofillValue
        )
      }
      console.log('Finalized multivalue mapping')
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
  enhance()
  syncStorage.onChanged.addListener(enhance)
}
