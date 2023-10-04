import { isEmptyString } from './isEmptyString'

import type {
  Field,
  FieldData,
  FieldName,
  IndexableRecord
} from '../types'
import { setArrayAsIndexableRecord } from './setArrayAsIndexableRecord'
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
  if (attributeName === 'autofill') {
    if (typeof value !== 'string') {
      throw new Error('alteredFieldData: Non-string value inputted for autofill')
    }
    const { autofill } = fieldData[fieldName]
    const autofillValues = Object.values(autofill)
    /*
    Need to fix handling of empty value. Only permit one.
    */
    const autofillValuesSorted = autofillValues.filter((str) => {
      return !isEmptyString(str)
    })
    if (!isEmptyString(value)) {
      autofillValuesSorted.concat([value])
    }
    // if () {
    //   autofillValuesSorted.concat([''])
    // }
    autofillValuesSorted.sort()
    const autofillSorted = setArrayAsIndexableRecord(autofillValuesSorted)
    return {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        [attributeName as 'autofill']: autofillSorted
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
