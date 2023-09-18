import type {
  Autofill,
  FieldData,
  FieldNames
} from './'

type ActionType =
  'add-item' |
  'delete-item' |
  'disable-is-active' |
  'disable-is-fill-to-form' |
  'enable-is-active' |
  'enable-is-fill-to-form' |
  'set-autofill' |
  'set-data' |
  'save-changes'

export interface ActionProps {
  autofill?: Autofill
  fieldIndex?: number
  fieldName?: FieldNames[number]
  newFieldData?: FieldData
  type: ActionType
}
