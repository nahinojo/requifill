import { syncStorage } from '../utils'

import type {
  Autofill,
  FieldName,
  SyncStorageData
} from '../types'

export const getAutofill = async (fieldName: FieldName): Promise<Autofill> => {
  return await syncStorage
    .get()
    .then((storage: SyncStorageData) => {
      return storage.fieldData[fieldName].autofill
    })
    .catch(error => {
      console.error(error)
      throw new Error(`${__filename}: Could not retrieve fieldData.${fieldName}.autofill`)
    })
}
