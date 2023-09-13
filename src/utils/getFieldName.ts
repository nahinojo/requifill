/*
Returns index of target field within any InputValueField component
*/
import {
  fieldNames
} from '../objects'
import type {
  FieldName,
  FieldNames
} from '../types'

/*
fieldNames cannot be searched through because Typescript only permits searching Type[] using
variables whose type matches the type of elements within fieldNames, and these elements are
typed as string-literals. Essentially, you can only search fieldNames using strings that exactly
match those within fieldNames, defeating the entire purpose behind searching.

Identical array fieldNamesSearchable is typed to permit searching using any string variable.
*/
const fieldNamesSearchable = fieldNames as readonly string[]

export const getFieldName = (targetId: string | undefined): FieldNames[number] => {
  if (targetId === undefined) {
    throw new Error('id not found on component')
  }
  const fieldNameRegex = /^[^.]*/
  const fieldNameMatch = String(targetId.match(fieldNameRegex))
  if (
    fieldNameMatch !== null &&
    fieldNamesSearchable.includes(fieldNameMatch)
  ) {
    return fieldNameMatch as FieldName
  } else {
    throw new Error('field name not found on id')
  }
}
