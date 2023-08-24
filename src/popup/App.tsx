import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import syncStorage from '../common/syncStorage'
import Banner from './components/Banner'
import FieldSelector from './components/FieldSelector'
import FieldRenderer from './components/FieldRenderer'
import Footer from './components/Footer'

export interface FieldData {
  [name: string]: {
    title?: string
    value: string
    isActive?: boolean
  };
}

const App: FC = () => {
  const [fieldData, setFieldData] = useState<FieldData>({})
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false)
  console.log('App render ID:', Math.random())
  console.log('App.fieldData:', fieldData)

  /*
  Keeps fieldData synchronized with values in <input> elements.
  */
  const handleFieldDataChange: ReactEventHandler<HTMLInputElement> = (
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
    setIsUnsavedChanges(true)
  }

  const saveFieldChanges: ReactEventHandler<HTMLInputElement> =() => {
    syncStorage.set({fieldData: fieldData})
    setIsUnsavedChanges(false)
  }

  const discardFieldChanges: ReactEventHandler<HTMLInputElement> =() => {
    syncStorage.get().then(storage => {
      setFieldData(storage.fieldData)
    })
    setIsUnsavedChanges(false)
  }

  /*
  Sets default for syncStorage if null.
  Initialized fieldData state based on syncStorage.
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
            isActive: true
          }
        }
        syncStorage.set({fieldData: initialFieldData})
        setFieldData(initialFieldData)
      } else {
        setFieldData(storage.fieldData)
      }
    })
  }, [])
  
  return (
    <>
      <Banner />
      <div 
        id='field-container'
      >
        <header
          className='text-silver text-sm mt-3 ml-1'
        >Autofill Values</header>
        <form>
          <FieldRenderer
            fieldData={fieldData}
            onChange={handleFieldDataChange}
          />
        </form>
      </div>
      <Footer
        isUnsavedChanges={isUnsavedChanges}
        discardFieldChanges={discardFieldChanges}
        saveFieldChanges={saveFieldChanges}
      />
      {/* <FieldSelector
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
      /> */}
    </>
  )
}

export default App
