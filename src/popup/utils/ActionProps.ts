import type FieldDataProps from './FieldDataProps'

interface ActionProps {
  autofillValue: string | Record<string, string> | undefined
  fieldIndex: number | undefined
  fieldName: string | undefined
  newFieldData: FieldDataProps | undefined
  type: string
}

export default ActionProps
