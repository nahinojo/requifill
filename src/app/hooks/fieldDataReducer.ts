/* eslint-disable react/destructuring-assignment */
import type { Reducer } from 'react'

import type {
  ActionProps,
  FieldData
} from '../../types'
import { alteredFieldData } from '../../utils'

function assertDefined <T extends keyof ActionProps> (prop: ActionProps[T]): asserts prop is Exclude<ActionProps[T], undefined> {
  if (prop === undefined) {
    throw new Error('fieldDataReducer.tsx: Asserted property is undefined')
  }
}

export const fieldDataReducer: Reducer<FieldData, ActionProps> = (
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
  console.count('fieldDataReducer.ts:\'fieldData')
  switch (type) {
  case 'set-data': {
    assertDefined(newFieldData)
    return newFieldData
  }
  case 'set-autofill': {
    console.log('fieldDataReducer.ts: set-autofill...')
    assertDefined(fieldName)
    assertDefined(autofill)
    if (fieldIndex === undefined) {
      return alteredFieldData({
        attributeName: 'autofill',
        fieldData,
        fieldName,
        value: autofill as string
      })
    } else {
      return alteredFieldData({
        attributeName: 'autofill',
        fieldData,
        fieldName,
        value: autofill as string
      })
    }
  }
  case 'add-item': {
    assertDefined(fieldName)
    const newIndex = Object.keys(fieldData[fieldName].autofill).length
    return alteredFieldData({
      attributeIndex: newIndex,
      attributeName: 'autofill',
      fieldData,
      fieldName,
      value: ''
    })
  }
  case 'delete-item': {
    assertDefined(fieldName)
    const prevAutofill = fieldData[fieldName].autofill as Record<number, string>
    const newAutofill: Record<number, string> = {}
    let newIndex = 0
    for (const idx in prevAutofill) {
      const prevIndex = Number(idx)
      if (prevIndex !== fieldIndex) {
        newAutofill[newIndex] = prevAutofill[prevIndex]
        newIndex++
      }
    }
    if (Object.keys(newAutofill).length > 1) {
      return alteredFieldData({
        attributeName: 'autofill',
        fieldData,
        fieldName,
        value: newAutofill
      })
    } else {
      return alteredFieldData({
        attributeName: 'autofill',
        fieldData,
        fieldName,
        value: newAutofill[0]
      })
    }
  }
  case 'enable-is-active': {
    assertDefined(fieldName)
    return alteredFieldData({
      attributeName: 'isActive',
      fieldData,
      fieldName,
      value: true
    })
  }
  case 'disable-is-active': {
    assertDefined(fieldName)
    return alteredFieldData({
      attributeName: 'isActive',
      fieldData,
      fieldName,
      value: false
    })
  }
  case 'enable-is-fill-to-form': {
    assertDefined(fieldName)
    return alteredFieldData({
      attributeName: 'isFillToForm',
      fieldData,
      fieldName,
      value: true
    })
  }
  case 'disable-is-fill-to-form': {
    assertDefined(fieldName)
    return alteredFieldData({
      attributeName: 'isFillToForm',
      fieldData,
      fieldName,
      value: false
    })
  }
  }
  throw new Error('Invalid dispatch id')
}
