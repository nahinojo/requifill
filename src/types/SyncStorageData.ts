import type {
  FieldData
} from './'

export interface SyncStorageData {
  fieldData: FieldData
  settings: {
    isAutofillEnabled: boolean
  }
}
