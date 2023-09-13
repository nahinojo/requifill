import type { FieldName } from '../objects/fieldNames'
import type Autofill from './Autofill'

type FieldData = {
  [K in FieldName]: {
    autofill: Autofill
    isActive: boolean
  }
}
export default FieldData
