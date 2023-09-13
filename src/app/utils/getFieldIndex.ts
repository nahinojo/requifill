/*
  Returns index of target field within MultiValueField component
*/
const getFieldIndex = (targetId: string | undefined): number => {
  if (targetId === undefined) {
    throw new Error('fieldIndex not found on component')
  }
  const fieldIdIndexRegex = /[0-9]*[0-9]/
  const fieldIndex = Number(targetId.match(fieldIdIndexRegex))
  return fieldIndex
}

export default getFieldIndex
