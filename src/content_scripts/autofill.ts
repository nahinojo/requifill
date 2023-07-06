/*
Injects field values from browser storage into the requisition form's input
elements.
*/
import syncStorage from '../common/syncStorage'
import isProperURL from '../common/isProperURL'
import getIsAutofill from '../common/getIsAutofill'

if (isProperURL) {
  /*
  Since actualy DOM IDs are absurdly long, a shorthand translation dict is used.
  */
  type NameToIdDictKeys = 'adHocUserId' | 'commodityCode' | 'roomNumber'
  const nameToIdDict = {
    adHocUserId: 'newAdHocRoutePerson.id',
    commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
    roomNumber: 'document.deliveryBuildingRoomNumber'
  }

  /*
  Retrieves field data from browser storage to autofill requisition form <input> elements.
  */
  const autofill = (): void => {
    syncStorage.get()
      .then(storage => {
        const { fieldData } = storage
        for (const fieldName in fieldData) {
          const fieldValue = fieldData[fieldName]
          const targetInput = document.getElementById(
            nameToIdDict[fieldName as NameToIdDictKeys]
          ) as HTMLInputElement
          // Prevents duplicate injections of adHocUserId.
          const neglectAdHocUserId = (
            fieldName === 'adHocUserId' &&
                document.getElementById('adHocRoutePerson[0].id') !== null
          )
          if (targetInput.value !== fieldValue && !neglectAdHocUserId) {
            targetInput.value = fieldValue
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  /*
  Empties all field data from all requisition form <input> elements.
  */
  const autoclear = (): void => {
    syncStorage.get()
      .then(storage => {
        const { fieldData } = storage
        for (const fieldName in fieldData) {
          const targetInput = document.getElementById(
            nameToIdDict[fieldName as NameToIdDictKeys]
          ) as HTMLInputElement
          // Prevents duplicate injections of adHocUserId.
          const neglectAdHocUserId = (
            fieldName === 'adHocUserId' &&
                document.getElementById('adHocRoutePerson[0].id') !== null
          )
          if (!neglectAdHocUserId) {
            targetInput.value = ''
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  /*
  Executes on initial page load.
  */
  getIsAutofill().then(isAutofill => {
    if (isAutofill) {
      autofill()
    }
  }).catch(error => {
    console.log(error)
  })

  /*
  Executes when autofill switch is toggled.
  */
  syncStorage.onChanged.addListener(() => {
    getIsAutofill().then(isAutofill => {
      if (isAutofill) {
        autofill()
      } else {
        autoclear()
      }
    }).catch(error => {
      console.log(error)
    })
  })
}
