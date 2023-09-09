import type FieldDataProps from './FieldDataProps'

type ActionTypeProps =
  'set-data' |
  'deactivate-field' |
  'activate-field' |
  'sync-input' |
  'add-item' |
  'delete-item' |
  'increase-priority' |
  'decrease-priority' |
  'save-changes'

interface ActionProps {
  autofillValue?: string | Record<string, string>
  fieldIndex?: number
  fieldName?: string
  newFieldData?: FieldDataProps
  type: ActionTypeProps
}

export default ActionProps
