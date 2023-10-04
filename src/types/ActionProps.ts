import type {
  Autofill,
  FieldData,
  FieldName
} from './'

type ActionType =
  'add-item' |
  'delete-item' |
  'disable-is-active' |
  'disable-is-fill-to-form' |
  'enable-is-active' |
  'enable-is-fill-to-form' |
  'set-autofill' |
  'set-field-data' |
  'save-changes'

export interface ActionProps {
  autofill?: Autofill
  fieldIndex?: number
  fieldName?: FieldName
  newFieldData?: FieldData
  type: ActionType
}
