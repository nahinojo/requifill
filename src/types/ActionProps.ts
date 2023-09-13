import type {
  Autofill,
  FieldData,
  FieldNames
} from './'

type ActionType =
  'set-data' |
  'set-autofill' |
  'deactivate-field' |
  'activate-field' |
  'add-item' |
  'delete-item' |
  'increase-priority' |
  'decrease-priority' |
  'save-changes'

export interface ActionProps {
  autofill?: Autofill
  fieldIndex?: number
  fieldName?: FieldNames[number]
  newFieldData?: FieldData
  type: ActionType
}
