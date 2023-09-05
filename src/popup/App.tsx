import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import syncStorage from '../common/syncStorage'
import ToggleAutofillHeader from './components/ToggleAutofillHeader'
import AddNewField from './components/AddNewField'
import FieldRenderer from './components/FieldRenderer'
import UnsavedFieldPrompt from './components/UnsavedFieldPrompt'

export type FieldDataProps = Record<string, {
  title?: string
  autofillValue: string | Record<number, string>
  isActive: boolean
}>

const App: FC = () => {
  const [fieldData, setFieldData] = useState<FieldDataProps>({})
  const [isUnsavedFieldChanges, setIsUnsavedFieldChanges] = useState(false)
  const [isAddingField, setIsAddingField] = useState(false)

  /*
  Keeps fieldData synchronized with values in <input> elements.
  */
  const updateStateFieldData: ReactEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    if (fieldData != null) {
      setFieldData(prevFieldData => {
        return {
          ...prevFieldData,
          [name]: {
            ...prevFieldData[name],
            autofillValue: value
          }
        }
      })
    }
    setIsUnsavedFieldChanges(true)
  }

  const saveFieldChanges: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage
      .set({ fieldData })
      .catch(error => {
        console.log(error)
      })
    setIsUnsavedFieldChanges(false)
  }

  const discardFieldChanges: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage
      .get()
      .then(storage => {
        setFieldData(storage.fieldData)
      })
      .catch(error => {
        console.log(error)
      })
    setIsUnsavedFieldChanges(false)
  }

  /*
  Fills in field <input> elements on page load.
  Ensure fieldData is in sync with browser storage.
  */
  useEffect(
    () => {
      syncStorage
        .get()
        .then(storage => {
          if (Object.keys(storage).length <= 0) {
            const initialFieldData = {
              adHocUserId: {
                autofillValue: 'adarami',
                isActive: true,
                title: 'Ad Hoc User ID'
              },
              commodityCode: {
                autofillValue: '7786413',
                isActive: false
              },
              phoneNumber: {
                autofillValue: '9491234567',
                isActive: false
              }
            }
            syncStorage
              .set({
                fieldData: initialFieldData
              })
              .catch(error => {
                console.log(error)
              })
            setFieldData(initialFieldData)
          } else {
            setFieldData(storage.fieldData)
          }
        })
        .catch(error => {
          console.log(error)
        })
      syncStorage.onChanged.addListener(() => {
        syncStorage
          .get()
          .then(storage => {
            setFieldData(storage.fieldData)
          })
          .catch(error => {
            console.log(error)
          })
      })
    }, []
  )

  return (
    <>
      <ToggleAutofillHeader />
      <div
        id='field-container'
      >
        <FieldRenderer
          fieldData={fieldData}
          onChange={updateStateFieldData}
        />
      </div>
      <AddNewField
        fieldData={fieldData}
        isAdding={isAddingField}
        setIsAdding={setIsAddingField}
      />
      {
        !!isUnsavedFieldChanges && (
          <UnsavedFieldPrompt
            discardFieldChanges={discardFieldChanges}
            saveFieldChanges={saveFieldChanges}
          />
        )
      }
    </>
  )
}

export default App
