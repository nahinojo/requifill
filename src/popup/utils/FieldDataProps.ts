/* eslint-disable react/destructuring-assignment */
type FieldDataProps = Record<string, {
  title?: string
  autofillValue: string | Record<string, string>
  isActive: boolean
}>

export default FieldDataProps
