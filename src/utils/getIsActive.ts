import { syncStorage } from '../utils'

import type { FieldName, SyncStorageData } from '../types'

export const getIsActive = async (fieldName: FieldName): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then((storage: SyncStorageData) => {
      return Boolean(storage.fieldData[fieldName].isActive)
    })
    .catch(error => {
      console.error(error)
      return false
    })
}
