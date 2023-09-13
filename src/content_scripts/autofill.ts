/*
Injects field values from browser storage into the requisition form's input
elements.
*/
import syncStorage from '../objects/syncStorage'
import isProperURL from '../objects/isProperURL'
import getIsAutofill from '../utils/getIsAutofill'
import fieldNameToId from '../objects/fieldNameToId'

import type FieldData from '../types/FieldData'
import type SyncStorageData from '../types/SyncStorageData'

if (isProperURL) {
  /*
  Retrieves field data from browser storage to autofill requisition form <input> elements.
  */
  const autofill = (): void => {
    syncStorage
      .get()
      .then((storage: SyncStorageData) => {
        const { fieldData } = storage
        // When type-setting, figure out how to incorporate parameters in type definitions, maybe...
        for (const fieldName in fieldData) {
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
      .then(storage => {
        const fieldData = storage.fieldData as FieldData
        for (const fieldName in fieldData) {
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
