import syncStorage from '../../objects/syncStorage'
import type FieldData from '../../types/FieldData'

async function fieldDataInitializer (): Promise<FieldData> {
  // syncStorage.onChanged.addListener(async () => {
  //   return await syncStorage
  //     .get()
  //     .then(storage => {
  //       return storage.fieldData
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // })
  return await syncStorage
    .get()
    .then(storage => {
      if (Object.keys(storage).length <= 0) {
        const initialFieldData = {
          adHocUserId: {
            autofill: 'adarami',
            isActive: true,
            title: 'Ad Hoc User ID'
          },
          commodityCode: {
            autofill: '7786413',
            isActive: false
          },
          description: {
            autofill: {
              0: 'Amazon',
              1: 'Digikey',
              2: 'Home Depot',
              3: 'Mouser'
            },
            isActive: true
          },
          phoneNumber: {
            autofill: '9491234567',
            isActive: false
          }
        }
        return syncStorage
          .set({
            fieldData: initialFieldData
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        return storage.fieldData
      }
    })
    .catch(error => {
      console.error(error)
    })
}

export default fieldDataInitializer
