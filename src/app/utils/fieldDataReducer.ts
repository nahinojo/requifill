/* eslint-disable react/destructuring-assignment */
import type FieldData from '../../types/FieldData'
import type { Reducer } from 'react'
import type ActionProps from './ActionProps'
import type { FieldName } from '../../objects/fieldNames'
import type Autofill from '../../types/Autofill'

/*
Checks 'undefined' possiblility in type-setting
*/
function assertDefined <T extends keyof ActionProps> (prop: ActionProps[T]): asserts prop is Exclude<ActionProps[T], undefined> {
  // eslint-disable-next-line valid-typeof
  if (prop === undefined) {
    throw new Error('asserted property is undefined')
  }
}

/*
Changes autofill for any field within fieldData.
*/
const setAutofillValue = (
  autofill: Autofill,
  fieldData: FieldData,
  fieldName: FieldName,
  fieldIndex?: number
): FieldData => {
  return fieldIndex === undefined
  // Editing autofill of <SingleValueField />.
  // Or, editing entire autofill object of <MultiValueField />.
    ? {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        autofill
      }
    }
  // Editing a specific value within autofill of <MultiValueField />.
    : {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        autofill: {
          ...fieldData[fieldName].autofill as Record<string, string>,
          [fieldIndex]: autofill
        }
      }
    }
}

/*
Changes priority of two items for <MultiValueField />
*/
const swapAutofillItemIndeces = (
  fieldData: FieldData,
  fieldName: FieldName,
  fieldIndex1: number,
  fieldIndex2: number
): FieldData => {
  const prevAutofillValue = fieldData[fieldName].autofill as Record<string, string>
  const fieldValue1 = prevAutofillValue[fieldIndex1]
  const fieldValue2 = prevAutofillValue[fieldIndex2]
  return {
    ...fieldData,
    [fieldName]: {
      ...fieldData[fieldName],
      autofill: {
        ...prevAutofillValue,
        [fieldIndex1]: fieldValue2,
        [fieldIndex2]: fieldValue1
      }
    }
  }
}

const fieldDataReducer: Reducer<FieldData, ActionProps> = (
  fieldData: FieldData,
  action: ActionProps
): FieldData => {
  const {
    autofill,
    fieldIndex,
    fieldName,
    newFieldData,
    type
  }: ActionProps = action
  switch (type) {
  case 'set-data': {
    assertDefined(newFieldData)
    return newFieldData
  }
  case 'set-autofill': {
    assertDefined(fieldName)
    assertDefined(autofill)
    return fieldIndex === undefined
      ? setAutofillValue(
        autofill,
        fieldData,
        fieldName
      )
      : setAutofillValue(
        autofill,
        fieldData,
        fieldName,
        fieldIndex
      )
  }
  case 'decrease-priority': {
    assertDefined(fieldName)
    assertDefined(fieldIndex)
    const indexLowerBoundary = Object.keys(fieldData[fieldName].autofill).length - 1
    if (fieldIndex < indexLowerBoundary) {
      return swapAutofillItemIndeces(
        fieldData,
        fieldName,
        fieldIndex,
        fieldIndex + 1
      )
    } else {
      return fieldData
    }
  }
  case 'increase-priority': {
    assertDefined(fieldName)
    assertDefined(fieldIndex)
    if (fieldIndex > 0) {
      return swapAutofillItemIndeces(
        fieldData,
        fieldName,
        fieldIndex,
        fieldIndex - 1
      )
    } else {
      return fieldData
    }
  }
  case 'add-item': {
    assertDefined(fieldName)
    const newIndex = Object.keys(fieldData[fieldName].autofill).length
    return setAutofillValue(
      '',
      fieldData,
      fieldName,
      newIndex
    )
  }
  case 'delete-item': {
    assertDefined(fieldName)
    const prevAutofillValue = fieldData[fieldName].autofill as Record<string, string>
    const newAutofillValue: Record<number, string> = {}
    let newIndex = 0
    for (const idx in prevAutofillValue) {
      const prevIndex = Number(idx)
      if (prevIndex !== fieldIndex) {
        newAutofillValue[newIndex] = prevAutofillValue[prevIndex]
        newIndex++
      }
    }
    if (Object.keys(newAutofillValue).length === 1) {
      return setAutofillValue(
        newAutofillValue[0],
        fieldData,
        fieldName
      )
    } else {
      return setAutofillValue(
        newAutofillValue,
        fieldData,
        fieldName
      )
    }
  }
  case 'activate-field': {
    assertDefined(fieldName)
    return {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        isActive: true
      }
    }
  }
  case 'deactivate-field': {
    assertDefined(fieldName)
    return {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        isActive: false
      }
    }
  }
  }
  throw new Error('Invalid dispatch id')
}
export default fieldDataReducer
