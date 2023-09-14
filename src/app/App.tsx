import React, {
  useEffect,
  useState,
  useReducer
} from 'react'
import {
  AddNewField,
  FieldRenderer,
  ToggleAutofillHeader,
  UnsavedFieldPrompt
} from './components'
import {
  fieldDataContext,
  fieldDataDispatchContext,
  fieldDataReducer
} from './hooks'
import {
  initialFieldData,
  syncStorage
} from '../objects'

import type { FC } from 'react'

const App: FC = () => {
  const [fieldData, fieldDataDispatch] = useReducer(
    fieldDataReducer,
    initialFieldData
  )
  console.log('Counter Render <App />')
  const [isUnsavedChanges, setIsUnsavedChanges] = useState<boolean>(false)
  const [isAddingField, setIsAddingField] = useState<boolean>(false)
  const [isRenderAddField, setIsRenderAddField] = useState<boolean>(true)

  /*
  Injects fieldData into field <input> elements.
  Ensures fieldData is in sync with browser storage.
  */
  useEffect(
    () => {
      syncStorage
        .get()
        .then(storage => {
          if (Object.keys(storage).length <= 0) {
            syncStorage
              .set({
                fieldData: initialFieldData
              })
              .catch(error => {
                console.error(error)
              })
          } else {
            fieldDataDispatch({
              newFieldData: storage.fieldData,
              type: 'set-data'
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
      syncStorage.onChanged.addListener(() => {
        syncStorage
          .get()
          .then(storage => {
            fieldDataDispatch({
              newFieldData: storage.fieldData,
              type: 'set-data'
            })
          })
          .catch(error => {
            console.error(error)
          })
      })
    }, []
  )

  return (
    <fieldDataContext.Provider
      value={fieldData}
    >
      <fieldDataDispatchContext.Provider
        value={fieldDataDispatch}
      >
        <ToggleAutofillHeader />
        <FieldRenderer
          setIsRenderAddField={setIsRenderAddField}
          setIsUnsavedChanges={setIsUnsavedChanges}
        />
        {
          !!isRenderAddField && (
            <AddNewField
              isAddingField={isAddingField}
              setIsAddingField={setIsAddingField}
              setIsUnsavedChanges={setIsUnsavedChanges}
            />
          )
        }
        {
          !!isUnsavedChanges && (
            <UnsavedFieldPrompt
              setIsUnsavedChanges={setIsUnsavedChanges}
            />
          )
        }
      </fieldDataDispatchContext.Provider>
    </fieldDataContext.Provider>
  )
}

export default App
