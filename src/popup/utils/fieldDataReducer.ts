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
Changes autofillValue for any field within fieldData.
*/
const setAutofillValue = (
  fieldData: FieldDataProps,
  fieldName: string,
  autofillValue: string | Record<string, string>,
  fieldIndex: number | null = null
): FieldDataProps => {
  return fieldIndex === null
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

const fieldDataPrimeReducer: Reducer<FieldDataProps, ActionProps> = (
  fieldData: FieldDataProps,
  action: ActionProps
): FieldDataProps => {
  const {
    autofillValue,
    fieldIndex,
    fieldName,
    newFieldData,
    type
  } = action
  switch (type) {
  case 'set': {
    if (newFieldData === null) {
      throw new Error('No new field Data Found')
    } else {
      return newFieldData
    }
  }
  case 'sync-input': {
    return fieldIndex === null
      ? setAutofillValue(
        fieldData,
        fieldName,
        autofillValue
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
    const indexLowerBoundary = Object.keys(autofillValue).length - 1
    if (fieldIndex === null) {
      throw new Error('No index found on deprioritized item')
    }
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
    if (fieldIndex === null) {
      throw new Error('No index found on deprioritized item')
    }
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
        newAutofillValue[0]
      )
    } else {
      return setAutofillValue(
        fieldData,
        fieldName,
        newAutofillValue
      )
    }
  }
  }
  throw new Error('Dispactch not found')
}
export default fieldDataPrimeReducer
