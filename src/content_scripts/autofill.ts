/*
Injects field values in browser storage into the requisition form's input
elements
*/
import syncStorage from '../common/syncStorage'
import isProperURL from '../common/isProperURL'
import isAutofill from '../common/isAutofillStorage'

/*
Since actualy DOM IDs are absurdly long, a shorthand translation dict is used
*/
type NameToIdDictKeys = 'adHocUserId' | 'commodityCode' | 'roomNumber'
const nameToIdDict = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  roomNumber: 'document.deliveryBuildingRoomNumber'
}
console.log('autofill.ts')
/*
Uses field data from browser storage to autofill <input> elements
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
        // Prevents duplicate injections of adHocUserId
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

isAutofill().then(isAutofill => {
  if (isAutofill && isProperURL) {
    autofill()
  }
}).catch(error => {
  console.log(error)
})

// Does not properly autofill on conditional
syncStorage.onChanged.addListener(() => {
  console.log('Executing syncStorage.onChange listener')
  isAutofill().then(isAutofill => {
    console.log('isAutofill:', isAutofill)
    if (isAutofill && isProperURL) {
      autofill()
    }
  }).catch(error => {
    console.log(error)
  })
})
