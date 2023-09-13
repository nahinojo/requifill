import type FieldData from './FieldData'

interface SyncStorageData {
  fieldData: FieldData
  settings: {
    isAutofill: boolean
  }
}
export default SyncStorageData
