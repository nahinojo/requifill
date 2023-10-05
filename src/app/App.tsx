import React, {
  useEffect,
  useState,
  useReducer
} from 'react'
import {
  AddNewField,
  FieldRenderer,
  ToggleAutofillHeader,
  UnsavedChangesPrompt
} from './components'
import {
  fieldDataContext,
  fieldDataDispatchContext,
  fieldDataReducer
} from './hooks'
import {
  initialFieldData,
  syncStorage
} from '../utils'

import type { FC } from 'react'
import { NavMenu } from './components/NavMenu'

const App: FC = () => {
  const [fieldData, fieldDataDispatch] = useReducer(
    fieldDataReducer,
    initialFieldData
  )
  const [isUnsavedChanges, setIsUnsavedChanges] = useState<boolean>(false)
  const [isAddingField, setIsAddingField] = useState<boolean>(false)
  const [isRenderAddNewField, setIsRenderAddNewField] = useState<boolean>(true)

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
              type: 'set-field-data'
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
              type: 'set-field-data'
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
        <div
          className='absolute top-0 bottom-24 overflow-scroll'
          id='fields-conatiner'
        >
          <ToggleAutofillHeader />
          <FieldRenderer
            setIsRenderAddNewField={setIsRenderAddNewField}
            setIsUnsavedChanges={setIsUnsavedChanges}
          />
          {
            !!isRenderAddNewField && (
              <AddNewField
                isAddingField={isAddingField}
                setIsAddingField={setIsAddingField}
                setIsUnsavedChanges={setIsUnsavedChanges}
              />
            )
          }
        </div>
        {
          !!isUnsavedChanges && (
            <UnsavedChangesPrompt
              setIsUnsavedChanges={setIsUnsavedChanges}
            />
          )
        }
        {
          !isUnsavedChanges && (
            <NavMenu />
          )
        }
      </fieldDataDispatchContext.Provider>
    </fieldDataContext.Provider>
  )
}

export default App
