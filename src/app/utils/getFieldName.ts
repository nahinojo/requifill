import type { FieldNames } from '../../objects/fieldNames'
import fieldNamesReadonly from '../../objects/fieldNames'

/*
  Returns index of target field within any xValueField component
*/
const getFieldName = (targetId: string | undefined): FieldNames[number] => {
  if (targetId === undefined) {
    throw new Error('id not found on component')
  }
  const fieldNameRegex = /^[^.]*/
  const fieldNameMatch = targetId.match(fieldNameRegex)
  if (
    fieldNameMatch !== null &&
    fieldNamesReadonly.includes(fieldNameMatch[0])
  ) {
    return 'adHocUserId'
  } else {
    throw new Error('field name not found on id')
  }
}

export default getFieldName
