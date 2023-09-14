/*
Injects field values from browser storage into the requisition form's input
elements.
*/

import {
  fieldNameToId,
  isProperURL,
  syncStorage,
  getIsAutofill
} from '../utils'

import type {
  FieldNames,
  SyncStorageData
} from '../types'

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
            const targetInput = document.getElementById(fieldNameToId[fieldName]) as HTMLInputElement
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
            const targetInput = document.getElementById(fieldNameToId[fieldName]) as HTMLInputElement
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
  getIsAutofill()
    .then(isAutofill => {
      if (isAutofill) {
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
    getIsAutofill()
      .then(isAutofill => {
        if (isAutofill) {
          autofill()
        } else {
          autoclear()
        }
      })
      .catch(error => {
        console.error(error)
      })
  })
}
