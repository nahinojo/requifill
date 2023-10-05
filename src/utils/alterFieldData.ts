import { isEmptyString } from './isEmptyString'

import type {
  Field,
  FieldData,
  FieldName,
  IndexableRecord
} from '../types'
import { convertArrayToIndexableRecord } from './convertArrayToIndexableRecord'
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
  console.count('Executing alterFieldData()')
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
    /*
    Ensures <MultiValueField /> displays sorted values
    */
    console.log('Altering autofill attribute')
    if (typeof value !== 'string') {
      throw new Error('alteredFieldData: Non-string value inputted for autofill')
    }
    const autofill = fieldData[fieldName].autofill as Record<number, string>
    const autofillValues = Object.values(autofill)
    const isValueAsEmptyString = isEmptyString(value)
    if (!isValueAsEmptyString) {
      let newAutofill = {
        ...autofill,
        [attributeIndex]: value
      }
      const newAutofillValues = Object.values(newAutofill)
      newAutofillValues.sort()
      newAutofill = convertArrayToIndexableRecord(newAutofillValues)
      return {
        ...fieldData,
        [fieldName]: {
          ...fieldData[fieldName],
          [attributeName as 'autofill']: newAutofillValues
        }
      }
    }
    /*
    Need to fix modification of empty value. Prevent sorting on inital key change. May have to be done outside this file.
    */
    let autofillValuesSorted = autofillValues.filter((str) => {
      return !isEmptyString(str)
    })
    const isNoEmptyStringInAutofill = autofillValues.every((str) => {
      return !isEmptyString(str)
    })
    if (isValueAsEmptyString && isNoEmptyStringInAutofill) {
      autofillValuesSorted = autofillValuesSorted.concat([''])
    }
    if (!isValueAsEmptyString) {
      autofillValuesSorted = autofillValuesSorted.concat([value])
      console.log(
        'Added value to autofillValuesSorted',
        '\nautofillValuesSorted:',
        autofillValuesSorted
      )
    }
    autofillValuesSorted.sort()
    const autofillSorted = convertArrayToIndexableRecord(autofillValuesSorted)

    console.log(
      'Finalized sorting autofill',
      '\nautofillSorted:',
      autofillSorted,
      '\nvalue:',
      value,
      '\nisEmptyStringInAutofill:',
      isNoEmptyStringInAutofill,
      '\nisValueAsEmptyString:',
      isValueAsEmptyString
    )

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
