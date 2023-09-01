import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import syncStorage from '../common/syncStorage'
import Banner from './components/Banner'
import NewField from './components/NewField'
import FieldRenderer from './components/FieldRenderer'
import UnsavedFieldPrompt from './components/UnsavedFieldPrompt'

export type FieldData = Record<string, {
  title?: string
  value: string
  isActive: boolean
}>

const App: FC = () => {
  const [fieldData, setFieldData] = useState<FieldData>({})
  const [isUnsavedFieldChanges, setIsUnsavedFieldChanges] = useState(false)
  const [isAddingField, setIsAddingField] = useState(false)
  // console.log('App render ID:', Math.random())
  // console.log('App.fieldData:', fieldData)

  /*
  Keeps fieldData synchronized with values in <input> elements.
  */
  const updateFieldDataState: ReactEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    if (fieldData != null) {
      setFieldData(prevFieldData => {
        return {
          ...prevFieldData,
          [name]: {
            ...prevFieldData[name],
            value
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
  useEffect(() => {
    syncStorage
      .get()
      .then(storage => {
        if (Object.keys(storage).length <= 0) {
          const initialFieldData = {
            adHocUserId: {
              isActive: true,
              title: 'Ad Hoc User ID',
              value: 'adarami'
            },
            commodityCode: {
              isActive: false,
              value: '7786413'
            },
            phoneNumber: {
              isActive: false,
              value: '9491234567'
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
  }, [])

  return (
    <>
      <Banner />
      <div
        id='field-container'
      >
        <FieldRenderer
          fieldData={fieldData}
          onChange={updateFieldDataState}
        />
      </div>
      <NewField
        fieldData={fieldData}
        isAdding={isAddingField}
        setIsAdding={setIsAddingField}
      />
      {isUnsavedFieldChanges &&
        <UnsavedFieldPrompt
          discardFieldChanges={discardFieldChanges}
          saveFieldChanges={saveFieldChanges}
        />
      }
    </>
  )
}

export default App
