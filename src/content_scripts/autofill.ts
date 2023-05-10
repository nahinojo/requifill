/*
Injects field values in browser storage into the requisition form's input
elements.
*/
import syncStorage from '../common/syncStorage'
import isProperURL from '../common/isProperURL'

type NameToIdDictKeys = 'adHocUserId' | 'commodityCode' | 'roomNumber'
const nameToIdDict = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  roomNumber: 'document.deliveryBuildingRoomNumber'
}

const autofill = (): void => {
  const fillRequisitionForm = (): void => {
    syncStorage.get()
      .then(storage => {
        const { fieldData } = storage
        for (const fieldName in fieldData) {
          const fieldValue = fieldData[fieldName]
          const targetInput = document.getElementById(
            nameToIdDict[fieldName as NameToIdDictKeys]
          ) as HTMLInputElement
          // Prevent duplicate injections of adHocUserId
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

  fillRequisitionForm()
  syncStorage.onChanged.addListener(fillRequisitionForm)
}

const getIsAutofill = async (): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then(settings => {
      return settings.isAutofill
    }).catch(error => {
      console.log(error)
      return false
    })
}

if (isProperURL) {
  syncStorage.onChanged.addListener(changes => {
    console.log('Event heard: storage change')
    console.log(changes)
    console.log('Due to storage change, checking autofill conditional')
    getIsAutofill().then(isAutofill => {
      if (isProperURL && isAutofill) {
        console.log('According to storage, autofill now enabled')
        autofill()
      }
    }).catch(error => {
      console.log(error)
    })
  })
}
