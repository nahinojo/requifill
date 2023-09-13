import type { FieldNames } from '../objects/fieldNames'

type FieldData = {
  [K in FieldNames[number]]: {
    autofill: string | Record<number, string>
    isActive: boolean
    title?: string
  }
}
export default FieldData
