import type {
  Field,
  FieldData,
  FieldName
} from '../types'
type AttributeIndex = number
type IndexableRecord = Record<number, string>
type Value = string | boolean | IndexableRecord | Field
interface modifyFieldDataParameters {
  fieldData: FieldData
  fieldName: FieldName
  attributeName?: keyof Field
  attributeIndex?: AttributeIndex
  value: Value
}
/*
Subset of attributes whose value type is Record
*/
type AttributeNameOfIndexableRecord = Exclude <{
  [K in keyof Field]: Field[K] extends IndexableRecord ? K : never
}[keyof Field], undefined>

export const alteredFieldData = (params: modifyFieldDataParameters): FieldData => {
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
  const testFieldData = {
    ...fieldData,
    [fieldName]: {
      ...fieldData[fieldName],
      [attributeName as AttributeNameOfIndexableRecord]: {
        ...fieldData[fieldName][attributeName] as IndexableRecord,
        [attributeIndex]: value as string | boolean
      }
    }
  }
  return testFieldData
}
