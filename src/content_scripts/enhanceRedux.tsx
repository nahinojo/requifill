/* eslint-disable function-paren-newline */
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  fieldNameToId,
  getTargetInput,
  isProperURL,
  syncStorage
} from '../utils'

import type {
  Autofill,
  FieldName,
  SyncStorageData
} from '../types'
import type { FC } from 'react'
interface OptionsListProps {
  fieldName: FieldName
}

if (isProperURL) {
  const OptionsList: FC<OptionsListProps> = ({ fieldName }) => {
    let autofill: Autofill
    syncStorage.get()
      .then((storage: SyncStorageData) => {
        
      })
      .catch(error => {
        console.error(error)
      })
    return (
      <div>
        <p> Hello World</p>
      </div>
    )
  }
  const attachOptionsToInput = (fieldName: FieldName): void => {
    syncStorage.get()
      .then((storage: SyncStorageData) => {
        if (isActive) {
          const targetInput = getTargetInput(fieldName)
          targetInput.setAttribute(
            'list',
            fieldNameToId[fieldName]
          )
          const targetInputRoot = createRoot(targetInput)
          targetInputRoot.render(
            <OptionsList
              fieldName={fieldName}
            />
          )
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  attachOptionsToInput('description')
}
