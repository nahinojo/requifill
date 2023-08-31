import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import syncStorage from '../common/syncStorage'
import Banner from './components/Banner'
import FieldSelector from './components/FieldSelector'
import FieldRenderer from './components/FieldRenderer'
import UnsavedChanges from './components/UnsavedChanges'

export interface FieldData {
  [name: string]: {
    title?: string
    value: string
    isActive: boolean
  };
}

const App: FC = () => {
  const [fieldData, setFieldData] = useState<FieldData>({})
  const [isUnsavedFieldChanges, setIsUnsavedFieldChanges] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  console.log('App render ID:', Math.random())
  console.log('App.fieldData:', fieldData)

  /*
  Keeps fieldData synchronized with values in <input> elements.
  */
  const updateFieldDataState: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    if (fieldData != null) {
      setFieldData(prevFieldData => {
        return {
          ...prevFieldData,
          [name]: {
            ...prevFieldData[name],
            value: value
          }
        }
      })
    }
    setIsUnsavedFieldChanges(true)
  }

  const saveFieldChanges: ReactEventHandler<HTMLInputElement> =() => {
    syncStorage.set({fieldData: fieldData})
    setIsUnsavedFieldChanges(false)
  }

  const discardFieldChanges: ReactEventHandler<HTMLInputElement> =() => {
    syncStorage.get().then(storage => {
      setFieldData(storage.fieldData)
    })
    setIsUnsavedFieldChanges(false)
  }

  /*
  Fills in field <input> elements on page load.
  Ensure fieldData is in sync with browser storage.
  */
  useEffect(() => {
    syncStorage.get().then(storage => {
      if (Object.keys(storage).length <= 0) {
        const initialFieldData = {
          adHocUserId: {
            title: 'Ad Hoc User ID',
            value: 'adarami',
            isActive: true,
          },
          commodityCode: {
            value: '7786413',
            isActive: true,
          },
          phoneNumber: {
            value: '9491234567',
            isActive: false
          },
          comment:{
            value: '',
            isActive: false
          }
        }
        syncStorage.set({fieldData: initialFieldData})
        setFieldData(initialFieldData)
      } else {
        setFieldData(storage.fieldData)
      }
    })
    syncStorage.onChanged.addListener(() => {
      syncStorage.get().then(storage => {
        setFieldData(storage.fieldData)
      })
    })
  }, [])
  
  return (
    <>
      <Banner />
      <div 
        id='field-container'
      >
        <header
          id='autofill-values-title'
          className='text-silver text-sm mt-3 ml-1'
        >Autofill Values</header>
        <form>
          <FieldRenderer
            fieldData={fieldData}
            onChange={updateFieldDataState}
          />
        </form>
      </div>
      <FieldSelector
        fieldData={fieldData}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
      /> 
      <UnsavedChanges
        isUnsavedFieldChanges={isUnsavedFieldChanges}
        discardFieldChanges={discardFieldChanges}
        saveFieldChanges={saveFieldChanges}
      />
    </>
  )
}

export default App
