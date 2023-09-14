import { fieldNameToId } from './'
import type { FieldName } from '../types'

export const getTargetInput = (fieldName: FieldName): HTMLInputElement => {
  return document.getElementById(fieldNameToId[fieldName]) as HTMLInputElement
}
