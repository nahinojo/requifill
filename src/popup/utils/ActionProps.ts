import type FieldDataProps from './FieldDataProps'

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
  autofill?: string | Record<string, string>
  fieldIndex?: number
  fieldName?: string
  newFieldData?: FieldDataProps
  type: ActionTypeProps
}

export default ActionProps
