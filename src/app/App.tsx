import React, {
  useEffect,
  useState,
  useReducer
} from 'react'
import type { FC } from 'react'
import fieldDataReducer from './utils/fieldDataReducer'
import ToggleAutofillHeader from './components/ToggleAutofillHeader'
import AddNewField from './components/AddNewField'
import FieldRenderer from './components/FieldRenderer'
import UnsavedFieldPrompt from './components/UnsavedFieldPrompt'
import { FieldDataContext, FieldDataDispatchContext } from './utils/fieldDataContext'
import syncStorage from '../objects/syncStorage'
import initialFieldData from '../objects/initialFieldData'

const App: FC = () => {
  const [fieldData, fieldDataDispatch] = useReducer(
    fieldDataReducer,
    initialFieldData
  )
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
    <FieldDataContext.Provider
      value={fieldData}
    >
      <FieldDataDispatchContext.Provider
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
      </FieldDataDispatchContext.Provider>
    </FieldDataContext.Provider>
  )
}

export default App
