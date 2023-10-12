import { syncStorage } from '..'

import type { SyncStorageData } from '../../types'

export const getIsAutofillEnabled = async (): Promise<boolean> => {
  return await syncStorage.get()
    .then((storage: SyncStorageData) => {
      return Boolean(storage?.settings?.isAutofillEnabled)
    })
    .catch(error => {
      console.error(error)
      return false
    })
}
