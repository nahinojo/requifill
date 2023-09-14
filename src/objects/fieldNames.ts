import { removeReadOnlyFromArray } from '../utils'
export const fieldNamesReadonly = [
  'adHocUserId',
  'commodityCode',
  'description',
  'phoneNumber',
  'roomNumber'
] as const
export const fieldNames = removeReadOnlyFromArray(fieldNamesReadonly)
