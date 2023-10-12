import { fieldNameToRequisitionFormId } from '..'
import type { FieldName } from '../../types'

export const fieldNames = new Set(Object.keys(fieldNameToRequisitionFormId) as FieldName[])
