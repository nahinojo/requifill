import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import syncStorage from '../common/syncStorage'
import Banner from './components/Banner'
import Field from './components/Field'
import FieldSelector from './components/FieldSelector'

interface FieldDict {
  adHocUserId: string
  commodityCode: string
  roomNumber: string
}

const App: FC = () => {
  const [fieldValues, setFieldValues] = useState<FieldDict>({
    adHocUserId: '',
    commodityCode: '',
    roomNumber: ''
  })

  /*
  Change key-value pair within fields object.
  */
  const updateFieldValues = (name: string, value: string): void => {
    setFieldValues(prevFieldValues => {
      return {
        ...prevFieldValues,
        [name]: value
      }
    })
  }

  /*
  Transfers field state to browser storage.
  */
  const handleFieldChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFieldValues(name, value)
  }

  /*
  On app refresh, updates all field states to match data in browser storage.
  */
  useEffect(() => {
    syncStorage.get()
      .then((storage) => {
        const { fieldData } = storage
        for (const fieldName in fieldData) {
          const fieldValue = fieldData[fieldName].value
          console.log('useEffect - fieldValue:', fieldValue)
          updateFieldValues(fieldName, fieldValue)
        }
      }).catch(error => { console.log(error) })
  }, [])
  return (
    <>
      <Banner />
      <div className='field-container'>
        <header
          className='text-silver text-sm mt-3 ml-1'
        >Autofill Values</header>
        <form>
          <Field
            name='roomNumber'
            title='Room Number'
            id='room-number'
            value={fieldValues.roomNumber}
            onChange={handleFieldChange}
          />
          <Field
            name='commodityCode'
            title='Commodity Code'
            id='commodity-code'
            value={fieldValues.commodityCode}
            onChange={handleFieldChange}
          />
          <Field
            name='adHocUserId'
            title='Ad Hoc User ID'
            id='ad-hoc-user-id'
            value={fieldValues.adHocUserId}
            onChange={handleFieldChange}
          />
        </form>
      </div>
      <FieldSelector />
    </>
  )
}

export default App
