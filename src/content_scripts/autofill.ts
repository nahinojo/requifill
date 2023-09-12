/*
Injects field values from browser storage into the requisition form's input
elements.
*/
import syncStorage from '../utils/syncStorage'
import isProperURL from '../utils/isProperURL'
import getIsAutofill from '../utils/getIsAutofill'
import nameToId from '../utils/nameToId'

import type FieldDataProps from '../popup/utils/FieldDataProps'
import type { nameToIdKeys } from '../utils/nameToId'

if (isProperURL) {
  /*
  Retrieves field data from browser storage to autofill requisition form <input> elements.
  */
  const autofill = (): void => {
    syncStorage
      .get()
      .then(storage => {
        const fieldData = storage.fieldData as FieldDataProps
        for (const fieldName in fieldData) {
          if (fieldData[fieldName].isActive) {
            let { autofill } = fieldData[fieldName]
            if (typeof autofill === 'object') {
              autofill = autofill[0]
            }
            const targetInput = document.getElementById(nameToId[fieldName as nameToIdKeys]) as HTMLInputElement
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
              targetInput.value = autofill
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
        const fieldData = storage.fieldData as FieldDataProps
        for (const fieldName in fieldData) {
          if (fieldData[fieldName].isActive) {
            const targetInput = document.getElementById(nameToId[fieldName as nameToIdKeys]) as HTMLInputElement
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
