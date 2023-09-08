/*
  Returns index of target field within any xValueField component
*/
const getFieldName = (targetId: string | undefined): string => {
  if (targetId === undefined) {
    throw new Error('fieldName not found on component')
  }
  const fieldNameRegex = /^[^.]*/
  const fieldName = String(targetId.match(fieldNameRegex))
  return fieldName
}

export default getFieldName
