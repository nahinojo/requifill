import { fieldNameToRequisitionFormId } from './'
import type { FieldName } from '../types'

export const getTargetInput = (fieldName: FieldName): HTMLInputElement => {
  return document.getElementById(fieldNameToRequisitionFormId[fieldName]) as HTMLInputElement
}
