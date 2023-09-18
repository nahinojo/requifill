import { syncStorage } from '../utils'

import type { SyncStorageData } from '../types'

export const getIsAutofill = async (): Promise<boolean> => {
  return await syncStorage.get()
    .then((storage: SyncStorageData) => {
      return Boolean(storage?.settings?.isEnabled)
    })
    .catch(error => {
      console.error(error)
      return false
    })
}
