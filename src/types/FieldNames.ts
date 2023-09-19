import type { fieldNameToRequisitionFormId } from '../utils'

export type FieldName = keyof typeof fieldNameToRequisitionFormId
export type FieldNames = FieldName[]
