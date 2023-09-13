/*
Returns index of target field within any InputValueField component
*/
import type { FieldName, FieldNames } from '../../objects/fieldNames'
import fieldNames from '../../objects/fieldNames'

/*
fieldNames cannot be searched through because Typescript only permits searching using
variables whose type matches the string-literal of elements within fieldNames.

Identical array fieldNamesSearchable is typed to permit searching using any string variable.
*/
const fieldNamesSearchable = fieldNames as readonly string[]

const getFieldName = (targetId: string | undefined): FieldNames[number] => {
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

export default getFieldName
