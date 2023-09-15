/* eslint-disable function-paren-newline */
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  getTargetInput,
  syncStorage
} from '../utils'

import type {
  FieldName,
  SyncStorageData
} from '../types'

// Setup for manual input of autofillValues
// Look into reinstating scroll feature
// Look into instating feature that shows all options, regardless of input value

const attachAutofillValuesToInput = (fieldName: FieldName): void => {
  syncStorage
    .get()
    .then((storage: SyncStorageData) => {
      const field = storage.fieldData[fieldName]
      const { isActive } = field
      if (!isActive) {
        throw new Error(`Cannot attach options because ${fieldName} is not active`)
      }
      const { autofill } = field
      if (typeof autofill === 'string') {
        throw new Error(`enhance.tsx: Cannot mount <OptionsList /> for ${fieldName}.autofill of type 'string'`)
      }
      const autofillValues = Object.values(autofill)
      const targetInput = getTargetInput(fieldName)
      const targetInputRoot = createRoot(targetInput)
      targetInput.setAttribute(
        'list',
        fieldName
      )
      targetInput.removeAttribute('type')
      targetInputRoot.render(
        <datalist
          id={`${fieldName}`}
        >
          {
            autofillValues.map((autofillValue, index) => {
              console.log(
                '<OptionsList /> autofillValues.map() \n',
                'autofillValue:',
                autofillValue,
                'index:',
                index
              )
              return (
                <option
                  key={index}
                  value={autofillValue}
                >
                </option>
              )
            }
            )
          }
        </datalist>)
    })
    .catch(error => {
      console.error(error)
      throw new Error(`enhance.tsx: Failed to execute attachOptionsToInput() for ${fieldName}`)
    })
}

attachAutofillValuesToInput('description')
