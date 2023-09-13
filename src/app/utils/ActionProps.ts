import type { FieldNames } from '../../objects/fieldNames'
import type FieldData from '../../types/FieldData'
import type Autofill from '../../types/Autofill'

type ActionTypeProps =
  'set-data' |
  'set-autofill' |
  'deactivate-field' |
  'activate-field' |
  'add-item' |
  'delete-item' |
  'increase-priority' |
  'decrease-priority' |
  'save-changes'

interface ActionProps {
  autofill?: Autofill
  fieldIndex?: number
  fieldName?: FieldNames[number]
  newFieldData?: FieldData
  type: ActionTypeProps
}

export default ActionProps
