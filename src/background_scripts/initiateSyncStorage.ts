import {
  initialFieldData,
  syncStorage
} from '../utils'

import type { SyncStorageData } from '../types'

syncStorage
  .get()
  .then((storage: SyncStorageData) => {
    if (Object.keys(storage).length === 0) {
      syncStorage
        .set({ fieldData: initialFieldData })
        .catch(error => {
          console.error(error)
        })
    }
  })
  .catch(error => {
    console.error(error)
  })
