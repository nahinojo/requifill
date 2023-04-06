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
        const targetInput = document.getElementById(nameToIdDict[name as NameToIdDictKeys]) as HTMLInputElement
        if (targetInput.value !== fillValue) {
          targetInput.value = storedFillValues[name]
        }
      }
    })
    .catch(error => {
      console.log(error)
    })
}

fillRequisitionForm()
syncStorage.onChanged.addListener(fillRequisitionForm)
