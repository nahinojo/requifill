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

const App: FC = () => {
  const [fieldData, fieldDataDispatch] = useReducer(
    fieldDataReducer,
    initialFieldData
  )
  console.count('App render')
  const [isUnsavedChanges, setIsUnsavedChanges] = useState<boolean>(false)
  const [isAddingField, setIsAddingField] = useState<boolean>(false)
  const [isRenderAddField, setIsRenderAddField] = useState<boolean>(true)

  /* You can somehow listen for if the UnsavedChangesPrompt is onscreen, but set the isUnsavedChanges at the same time
     This is because the listener/checker will only return true after the app refresh, not on state update.
     You cannot make changes to <body> on state update becuase you need the size of new root, not prior root.
     Yet hmmm you also don't want to double render, one root without and one root with.
     Maybe, wait for the new size of root before adding unsaved changes.
     How would this work??
  */
  const toggleIsUnsavedChanges = (newIsUnsavedChanges: boolean): void => {
    setIsUnsavedChanges(newIsUnsavedChanges)
    const { body } = document
    if (newIsUnsavedChanges) {
      const root = document.getElementById('root') as HTMLDivElement
      const rootHeight = root.clientHeight
      const bodyHeight = body.clientHeight
      const unsavedChangesHeight = 96
      const componentTreeHeight = rootHeight + unsavedChangesHeight
      const isUnsavedChangesNeedsMoreSpace = componentTreeHeight > bodyHeight
      if (isUnsavedChangesNeedsMoreSpace) {
        console.log('Increasing <body/> height')
        body.style.height = `${componentTreeHeight}px`
      }
    } else {
      body.style.height = '600px'
    }
  }
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
          toggleIsUnsavedChanges={toggleIsUnsavedChanges}
        />
        {
          !!isRenderAddField && (
            <AddNewField
              isAddingField={isAddingField}
              setIsAddingField={setIsAddingField}
              toggleIsUnsavedChanges={toggleIsUnsavedChanges}
            />
          )
        }
        {
          !!isUnsavedChanges && (
            <UnsavedChangesPrompt
              toggleIsUnsavedChanges={toggleIsUnsavedChanges}
            />
          )
        }
      </fieldDataDispatchContext.Provider>
    </fieldDataContext.Provider>
  )
}

export default App
