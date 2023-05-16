/*
Injects field values in browser storage into the requisition form's input
elements.
*/
import syncStorage from '../common/syncStorage'
import isProperURL from '../common/isProperURL'

/*
Since DOM IDs are absurdly long, a shorthand reference dict is utilized
*/
type NameToIdDictKeys = 'adHocUserId' | 'commodityCode' | 'roomNumber'
const nameToIdDict = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  roomNumber: 'document.deliveryBuildingRoomNumber'
}

/*
Retrieves isAutofill boolean for deciding to filling data to DOM
*/
export const getIsAutofill = async (): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then(storage => {
      return storage.settings.isAutofill
    }).catch(error => {
      console.log(error)
      return false
    })
}

/*
Conditionally autofills data to DOM
*/
const autofill = (): void => {
  getIsAutofill().then(isAutofill => {
    if (isAutofill && isProperURL) {
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
  }).catch(error => {
    console.log(error)
  })
}

autofill()
syncStorage.onChanged.addListener(() => {
  autofill()
})
