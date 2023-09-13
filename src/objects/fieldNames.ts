import removeReadOnlyFromArray from '../utils/removeReadOnlyFromArray'

const fieldNamesReadonly = [
  'adHocUserId',
  'commodityCode',
  'description',
  'phoneNumber',
  'roomNumber'
] as const
export type FieldNames = typeof fieldNamesReadonly
export type FieldName = FieldNames[number]
const fieldNames = removeReadOnlyFromArray(fieldNamesReadonly)
export default fieldNames
