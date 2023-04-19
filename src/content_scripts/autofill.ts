/*
Injects fill values stored in the browser into the requisition form's input
elements.
*/
import { isProperURL } from './constants'

if (isProperURL) {
  const syncStorage: browser.storage.StorageAreaSync = browser.storage.sync
  type NameToIdDictKeys = 'adHocUserId' | 'commodityCode' | 'roomNumber'
  const nameToIdDict = {
    adHocUserId: 'newAdHocRoutePerson.id',
    commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
    roomNumber: 'document.deliveryBuildingRoomNumber'
  }

  const fillRequisitionForm = (): void => {
    syncStorage.get()
      .then(storedFillValues => {
        for (const name in storedFillValues) {
          const fillValue = storedFillValues[name]
          const targetInput = document.getElementById(
            nameToIdDict[name as NameToIdDictKeys]
          ) as HTMLInputElement
          // Prevent duplicate injections of adHocUserId
          const neglectAdHocUserId = (
            name === 'adHocUserId' &&
            document.getElementById('adHocRoutePerson[0].id') !== null
          )
          if (targetInput.value !== fillValue && !neglectAdHocUserId) {
            targetInput.value = fillValue
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
