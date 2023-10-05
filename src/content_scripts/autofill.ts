/*
Injects field values from browser storage into the requisition form's input
elements.
*/

import {
  fieldNameToRequisitionFormId,
  isProperURL,
  syncStorage,
  getIsAutofillEnabled
} from '../utils'

import type {
  FieldNames,
  SyncStorageData
} from '../types'
type SetInput = (value: string) => void

if (isProperURL) {
  /*
  Retrieves field data from browser storage to autofill requisition form <input> elements.
  */
  const autofill = (): void => {
    syncStorage
      .get()
      .then((storage: SyncStorageData) => {
        const { fieldData } = storage
        const fieldNames = Object.keys(fieldData) as unknown as FieldNames
        // When type-setting, figure out how to incorporate parameters in type definitions, maybe...
        for (const fieldName of fieldNames) {
          if (fieldData[fieldName].isActive) {
            let { autofill } = fieldData[fieldName]
            if (typeof autofill === 'object') {
              autofill = autofill[0]
            }
            const targetInput = document.getElementById(fieldNameToRequisitionFormId[fieldName]) as HTMLInputElement
            const isAlreadyAutofilled = targetInput.value === autofill
            // Prevents duplicate injections of adHocUserId.
            const hasSecondaryAdHocUserId = (
              fieldName === 'adHocUserId' &&
              document.getElementById('adHocRoutePerson[0].id') !== null
            )
            if (
              !isAlreadyAutofilled &&
              !hasSecondaryAdHocUserId
            ) {
              targetInput.value = autofill as string
            }
          }
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  /*
  Empties all field data from all requisition form <input> elements.
  */
  const autoclear = (): void => {
    syncStorage.get()
      .then((storage: SyncStorageData) => {
        const { fieldData } = storage
        const fieldNames = Object.keys(fieldData) as unknown as FieldNames
        for (const fieldName of fieldNames) {
          if (fieldData[fieldName].isActive) {
            const targetInput = document.getElementById(fieldNameToRequisitionFormId[fieldName]) as HTMLInputElement
            // Prevents duplicate injections of adHocUserId.
            const neglectAdHocUserId = (
              fieldName === 'adHocUserId' &&
                    document.getElementById('adHocRoutePerson[0].id') !== null
            )
            if (!neglectAdHocUserId) {
              targetInput.value = ''
            }
          }
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  /*
  Executes on initial page load.
  */
  getIsAutofillEnabled()
    .then(isAutofillEnabled => {
      if (isAutofillEnabled) {
        autofill()
      }
    })
    .catch(error => {
      console.error(error)
    })

  /*
  Executes when autofill switch is toggled.
  */
  syncStorage.onChanged.addListener(() => {
    getIsAutofillEnabled()
      .then(isAutofillEnabled => {
        if (isAutofillEnabled) {
          autofill()
        } else {
          autoclear()
        }
      })
      .catch(error => {
        console.error(error)
      })
  })
  const focusInputValue = (targetInput: HTMLInputElement): SetInput => {
    return (value: string): void => {
      targetInput.value = value
      targetInput.select()
    }
  }
  /*
  Consider breaking this into two different files.
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
        setInputValue(currentNumber.toFixed(decimalPlace))
      }
    )
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
}
