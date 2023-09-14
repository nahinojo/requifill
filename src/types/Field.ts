import type {
  Autofill,
  FieldName
} from './'

export interface Field {
  [fieldName: FieldName]: {
    autofill: Autofill
    isActive: boolean
    title?: string
  }
}
