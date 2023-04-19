/*
Injects field values in browser storage into the requisition form's input
elements.
*/
import { isProperURL, syncStorage } from './constants'

if (isProperURL) {
  type NameToIdDictKeys = 'adHocUserId' | 'commodityCode' | 'roomNumber'
  const nameToIdDict = {
    adHocUserId: 'newAdHocRoutePerson.id',
    commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
    roomNumber: 'document.deliveryBuildingRoomNumber'
  }

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
