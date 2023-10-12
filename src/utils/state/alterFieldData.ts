import type {
  Field,
  FieldData,
  FieldName,
  IndexableRecord
} from '../../types'
type AttributeIndex = number
type Value = string | boolean | IndexableRecord | Field
interface alterFieldDataParameters {
  fieldData: FieldData
  fieldName: FieldName
  attributeName?: keyof Field
  attributeIndex?: AttributeIndex
  value: Value
}

type AttributeNameOfIndexableRecord = Exclude <{
  [K in keyof Field]: Field[K] extends IndexableRecord ? K : never
}[keyof Field], undefined>

export const alterFieldData = (params: alterFieldDataParameters): FieldData => {
  const {
    fieldData,
    fieldName,
    attributeName,
    attributeIndex,
    value
  } = params
  if (attributeName === undefined) {
    return {
      ...fieldData,
      [fieldName]: value as Field
    }
  }
  if (attributeIndex === undefined) {
    return {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        [attributeName]: value as Exclude<Value, Field>
      }
    }
  }
  return {
    ...fieldData,
    [fieldName]: {
      ...fieldData[fieldName],
      [attributeName as AttributeNameOfIndexableRecord]: {
        ...fieldData[fieldName][attributeName] as IndexableRecord,
        [attributeIndex]: value as string | boolean
      }
    }
  }
}
