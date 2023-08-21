import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import syncStorage from '../common/syncStorage'
import Banner from './components/Banner'
import FieldSelector from './components/FieldSelector'
import FieldRenderer from './components/FieldRenderer'

export interface FieldData {
  [name: string]: {
    title?: string
    value: string
    isActive?: boolean
  };
}

const App: FC = () => {
  const [fieldData, setFieldData] = useState<FieldData>({})
  const [isSelecting, setIsSelecting] = useState(false)
  console.log('App render ID:', Math.random())
  console.log('App state - fieldData:', fieldData)

  /*
  Ensures fieldData is in sync with value in input box
  */
  const handleFieldChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    if (fieldData != null) {
      setFieldData(prevFieldData => {
        const updatedFieldData = {
          ...prevFieldData,
          [name]: {
            ...prevFieldData[name],
            value: value
          }
        }
        return updatedFieldData
      })
    }
  }

  /*
  Sets default for syncStorage if null.
  Initialized fieldData state based on syncStorage.
  */
  useEffect(() => {
    syncStorage.get().then( storage => {
      if (Object.keys(storage).length <= 0) {
        syncStorage
        .set({
          fieldData: {
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
              isActive: false,
            },
            roomNumber: {
              value: '237',
              isActive: true,
            }
          }
        })
      }
    syncStorage.get().then(storage => {
      setFieldData(storage.fieldData)
    })
  }) 
  }, [])
  
  return (
    <>
      <Banner />
      <div className='field-container'>
        <header
          className='text-silver text-sm mt-3 ml-1'
        >Autofill Values</header>
        <form>
          <FieldRenderer
            fieldData={fieldData}
            onChange={handleFieldChange}
          />
        </form>
      </div>
      <FieldSelector
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
      />
    </>
  )
}

export default App
