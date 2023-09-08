import type FieldDataProps from './FieldDataProps'

interface ActionProps {
  autofillValue: string | Record<string, string>
  fieldIndex: number | null
  fieldName: string
  newFieldData: FieldDataProps | null
  type: string
}

export default ActionProps
