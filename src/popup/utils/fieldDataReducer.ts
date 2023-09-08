import syncStorage from '../../utils/syncStorage'

import type FieldDataProps from './FieldDataProps'
import type { Reducer } from 'react'
import type ActionProps from './ActionProps'
/* eslint-disable react/destructuring-assignment */

// /*
// Returns index of target field within MultiValueField component
// */
// const getFieldIndex = (targetElement: HTMLElement): number => {
//   const { id: targetId } = targetElement
//   if (targetId === undefined) {
//     throw new Error('fieldIndex not found on component')
//   }
//   const fieldIdIndexRegex = /[0-9]*[0-9]/
//   const fieldIndex = Number(targetId.match(fieldIdIndexRegex))
//   return fieldIndex
// }
// /*
// Returns index of target field within any xValueField component
// */
// const getFieldName = (targetElement: HTMLElement): string => {
//   const { id: targetId } = targetElement
//   if (targetId === undefined) {
//     throw new Error('fieldName not found on component')
//   }
//   const fieldNameRegex = /^[^.]*/
//   const fieldName = String(targetId.match(fieldNameRegex))
//   return fieldName
// }

/*
Checks 'undefined' possiblility in type-setting
*/
const assertDefined = <T extends keyof ActionProps>(value: ActionProps[T]): ActionProps[T] => {
  if (value === undefined) {
    throw new Error('Value is undefined')
  } else {
    return value
  }
}

/*
Changes autofillValue for any field within fieldData.
*/
const setAutofillValue = (
  fieldData: FieldDataProps,
  fieldName: string,
  autofillValue: string | Record<string, string>,
  fieldIndex: number | undefined
): FieldDataProps => {
  return fieldIndex === undefined
  // Editing autofillValue of <SingleValueField />.
  // Or, editing entire autofillValue object of <MultiValueField />.
    ? {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        autofillValue
      }
    }
  // Editing a specific value within autofillValue of <MultiValueField />.
    : {
      ...fieldData,
      [fieldName]: {
        ...fieldData[fieldName],
        autofillValue: {
          ...fieldData[fieldName].autofillValue as Record<string, string>,
          [fieldIndex]: autofillValue
        }
      }
    }
}

/*
Changes priority of two items for <MultiValueField />
*/
const swapAutofillItemIndeces = (
  fieldData: FieldDataProps,
  fieldName: string,
  fieldIndex1: number,
  fieldIndex2: number
): FieldDataProps => {
  const prevAutofillValue = fieldData[fieldName].autofillValue as Record<string, string>
  const fieldValue1 = prevAutofillValue[fieldIndex1]
  const fieldValue2 = prevAutofillValue[fieldIndex2]
  return {
    ...fieldData,
    [fieldName]: {
      ...fieldData[fieldName],
      autofillValue: {
        ...prevAutofillValue,
        [fieldIndex1]: fieldValue2,
        [fieldIndex2]: fieldValue1
      }
    }
  }
}

const fieldDataReducer: Reducer<FieldDataProps, ActionProps> = (
  fieldData: FieldDataProps,
  action: ActionProps
): FieldDataProps => {
  let {
    autofillValue,
    fieldIndex,
    fieldName,
    newFieldData,
    type
  } = action
  switch (type) {
  case 'set': {
    newFieldData = assertDefined(newFieldData) as FieldDataProps
    return newFieldData
  }
  case 'sync-input': {
    fieldName = assertDefined(fieldName) as string
    autofillValue = assertDefined(autofillValue) as string | Record<string, string>
    return fieldIndex === undefined
      ? setAutofillValue(
        fieldData,
        fieldName,
        autofillValue,
        undefined
      )
      : setAutofillValue(
        fieldData,
        fieldName,
        autofillValue,
        fieldIndex
      )
  }
  case 'save-changes': {
    syncStorage
      .set({ prevFieldData: fieldData })
      .catch(error => {
        console.log(error)
      })
    break
  }
  case 'discard-changes': {
    syncStorage
      .get()
      .then(storage => {
        return storage.fieldData
      })
      .catch(error => {
        console.log(error)
      })
    break
  }
  case 'decrease-item-priority': {
    autofillValue = assertDefined(autofillValue) as Record<string, string>
    fieldName = assertDefined(fieldName) as string
    fieldIndex = assertDefined(fieldIndex) as number
    const indexLowerBoundary = Object.keys(autofillValue).length - 1
    if (fieldIndex < indexLowerBoundary) {
      return swapAutofillItemIndeces(
        fieldData,
        fieldName,
        fieldIndex,
        fieldIndex + 1
      )
    }
    break
  }
  case 'increase-item-priority': {
    fieldName = assertDefined(fieldName) as string
    fieldIndex = assertDefined(fieldIndex) as number
    if (fieldIndex > 0) {
      return swapAutofillItemIndeces(
        fieldData,
        fieldName,
        fieldIndex,
        fieldIndex - 1
      )
    }
    break
  }
  case 'add-item': {
    fieldName = assertDefined(fieldName) as string
    const newIndex = Object.keys(fieldData[fieldName].autofillValue).length
    setAutofillValue(
      fieldData,
      fieldName,
      '',
      newIndex
    )
    break
  }
  case 'delete-item': {
    fieldName = assertDefined(fieldName) as string
    const prevAutofillValue = fieldData[fieldName].autofillValue as Record<string, string>
    const newAutofillValue: Record<string, string> = {}
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
        fieldData,
        fieldName,
        newAutofillValue[0],
        undefined
      )
    } else {
      return setAutofillValue(
        fieldData,
        fieldName,
        newAutofillValue,
        undefined
      )
    }
  }
  }
  throw new Error('Dispactch not found')
}
export default fieldDataReducer
