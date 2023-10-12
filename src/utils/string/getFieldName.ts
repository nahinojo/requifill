/*
Returns index of target field within any InputValueField component
*/
import {
  fieldNames
} from '..'
import type {
  FieldName
} from '../../types'

export const getFieldName = (targetId: string | undefined): FieldName => {
  if (targetId === undefined) {
    throw new Error('id not found on component')
  }
  const fieldNameRegex = /^[^.]*/
  const fieldNameMatch = String(targetId.match(fieldNameRegex)) as FieldName
  if (
    fieldNameMatch !== null &&
    fieldNames.has(fieldNameMatch)
  ) {
    return fieldNameMatch
  } else {
    throw new Error('field name not found on id')
  }
}
