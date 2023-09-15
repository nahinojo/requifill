import type {
  Field,
  FieldName
} from './'

export type FieldData = {
  [K in FieldName]: Field
}
