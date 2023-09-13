import type {
  Autofill,
  FieldName
} from './'

export type FieldData = {
  [K in FieldName]: {
    autofill: Autofill
    isActive: boolean
    title?: string
  }
}
