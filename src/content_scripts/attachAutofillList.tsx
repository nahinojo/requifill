/* eslint-disable function-paren-newline */
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  getTargetInput,
  isProperURL,
  syncStorage
} from '../utils'

import type {
  FieldName,
  SyncStorageData
} from '../types'

if (isProperURL) {
  const attachAutofillToInput = (
    fieldName: FieldName,
    autofillValues?: string[]
  ): void => {
    syncStorage
      .get()
      .then((storage: SyncStorageData) => {
        const field = storage.fieldData[fieldName]
        const { isActive } = field
        if (isActive) {
          if (autofillValues === undefined) {
            const { autofill } = field
            if (typeof autofill === 'string') {
              autofillValues = [autofill]
            } else {
              autofillValues = Object.values(autofill)
            }
          }
          const targetInput = getTargetInput(fieldName)
          targetInput.style.borderColor = '#4C88FF'
          targetInput.classList.add('requifill')
          const targetInputRoot = createRoot(targetInput)
          targetInput.setAttribute(
            'list',
            fieldName
          )
          targetInputRoot.render(
            <datalist
              className='requifill'
              id={`${fieldName}`}
            >
              {
                autofillValues.map((autofillValue, index) => {
                  if (autofillValue !== '') {
                    return (
                      <option
                        className='requifill'
                        key={index}
                        value={autofillValue}
                      >
                      </option>
                    )
                  }
                  return null
                }
                )
              }
            </datalist>
          )
        }
      })
      .catch(error => {
        console.error(error)
        throw new Error(`attachAutofillList.tsk: Failed to execute enhanceRequisitionInput() for ${fieldName}`)
      })
  }

  const attachAutofillToEveryInput = (): void => {
    syncStorage
      .get()
      .then((storage: SyncStorageData) => {
        const activeFieldNames = Object
          .keys(storage.fieldData)
          .filter((fieldName: FieldName) => {
            return storage.fieldData[fieldName].isActive
          }) as FieldName[]
        for (const activeFieldName of activeFieldNames) {
          attachAutofillToInput(activeFieldName)
        }
      })
      .catch(error => {
        console.error(error)
        throw new Error('attachAutofillList.tsk: Failed to execute enhanceAllRequisitionInputs()')
      })
  }

  const detachAutofillFromEveryInput = (): void => {
    const modifiedInputs = document.querySelectorAll('input.requifill')
    modifiedInputs.forEach((modifiedInput: HTMLInputElement) => {
      modifiedInput.style.borderColor = ''
      while (modifiedInput.firstChild !== null) {
        modifiedInput.removeChild(modifiedInput.firstChild)
      }
    })
  }
  attachAutofillToEveryInput()
  syncStorage.onChanged.addListener(() => {
    detachAutofillFromEveryInput()
    attachAutofillToEveryInput()
  }
  )
}
