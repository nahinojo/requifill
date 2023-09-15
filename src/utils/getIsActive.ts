import { syncStorage } from '../utils'

import type { FieldName, SyncStorageData } from '../types'

export const getIsActive = async (fieldName: FieldName): Promise<boolean> => {
  return await syncStorage
    .get()
    .then((storage: SyncStorageData) => {
      return storage.fieldData[fieldName].isActive
    })
    .catch(error => {
      console.error(error)
      throw new Error(`getIsActive.ts: Could not retrieve fieldData.${fieldName}.isActive`)
    })
}
