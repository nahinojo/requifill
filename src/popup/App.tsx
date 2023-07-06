import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import syncStorage from '../common/syncStorage'
import Banner from './components/Banner'
import Field from './components/Field'
import FieldSelector from './components/FieldSelector'
import FieldRenderer from './components/FieldRenderer'

export interface FieldData {
  [name: string]: {
    title?: string
    value: string
    isActive: boolean
  };
}

const App: FC = () => {
  console.log('App render ID:', Math.random())
  const [fieldData, setFieldData] = useState<FieldData>({})
  console.log('App render fieldData:', fieldData)
  const [isSelecting, setIsSelecting] = useState(false)

  /*
  Change key-value pair within fields object.
  */
  const updateFieldValues = (name: string, value: string): void => {
    if (fieldData != null) {
      setFieldData(prevFieldData => {
        return {
          ...prevFieldData!,
          [name]: {
            value: value,
            isActive: !prevFieldData[name].isActive
          }
        }
      })
    }
  }

  /*
  Transfers input value to component state
  */
  const handleFieldChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFieldValues(name, value)
  }

  /*
  Sets initial fieldData state to syncStorage.
  Sets default for syncStorage if is null.
  */
  useEffect(() => {
    syncStorage.get().then( storage => {
      if (Object.keys(storage).length <= 0) {
        console.log('App - setting default value for syncStorage')
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
  }, [setIsSelecting])
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
