const syncStorage: browser.storage.StorageAreaSync = browser.storage.sync

type NameToIdDictKey = 'adHocUserId' | 'commodityCode' | 'requestorPersonPhoneNumber'

const nameToIdDict = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  requestorPersonPhoneNumber: 'document.requestorPersonPhoneNumber'
}

const fillRequisitionForm = (): undefined => {
  syncStorage.get()
    .then(storedFillValues => {
      for (const name in storedFillValues) {
        const fillValue = storedFillValues[name]
        const targetInput = document.getElementById(nameToIdDict[name as NameToIdDictKey]) as HTMLInputElement
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
