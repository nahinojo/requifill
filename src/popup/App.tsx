import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent, MouseEventHandler } from 'react'
import syncStorage from '../common/syncStorage'
import ToggleAutofillHeader from './components/ToggleAutofillHeader'
import AddNewField from './components/AddNewField'
import FieldRenderer from './components/FieldRenderer'
import UnsavedFieldPrompt from './components/UnsavedFieldPrompt'
import getFieldName from '../common/getFieldId'
import getFieldIndex from '../common/getFieldIndex'

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
    const { id: targetId, value } = evt.target
    const fieldName = getFieldName(targetId)
    if (fieldData != null) {
      setFieldData(prevFieldData => {
        let currFieldData
        if (typeof fieldData[fieldName].autofillValue === 'string') {
          currFieldData = {
            ...prevFieldData,
            [fieldName]: {
              ...prevFieldData[fieldName],
              autofillValue: value
            }
          }
        } else {
          const fieldIndex = getFieldIndex(targetId)
          currFieldData = {
            ...prevFieldData,
            [fieldName]: {
              ...prevFieldData[fieldName],
              autofillValue: {
                ...prevFieldData[fieldName].autofillValue as Record<number, string>,
                [fieldIndex]: value
              }
            }
          }
        }
        return currFieldData
      })
    }
    setIsUnsavedFieldChanges(true)
  }

  /*
  Saves fieldData state to browser storage
  */
  const saveFieldDataChanges: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage
      .set({ fieldData })
      .catch(error => {
        console.log(error)
      })
    setIsUnsavedFieldChanges(false)
  }

  /*
  Reverts fieldData state to browser storage
  */
  const discardFieldDataChanges: ReactEventHandler<HTMLInputElement> = () => {
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

  const handleOnClickDown: MouseEventHandler<HTMLDivElement> =
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      console.log(evt)
    }
  const handleOnClickUp: MouseEventHandler<HTMLDivElement> =
    (evt: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      console.log(evt)
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
              description: {
                autofillValue: {
                  0: 'Amazon',
                  1: 'Digikey',
                  2: 'Home Depot',
                  3: 'Mouser'
                },
                isActive: true
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
          handleOnClickDown={handleOnClickDown}
          handleOnClickUp={handleOnClickUp}
          updateStateFieldData={updateStateFieldData}
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
            discardFieldChanges={discardFieldDataChanges}
            saveFieldChanges={saveFieldDataChanges}
          />
        )
      }
    </>
  )
}

export default App
