import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import Banner from './components/Banner'
import Field from './components/FieldItem'
import syncStorage from '../common/syncStorage'
import NewFieldItem from './components/NewFieldItem'

interface FieldDict {
  adHocUserId: string
  commodityCode: string
  roomNumber: string
}

const App: FC = () => {
  const [fields, setFields] = useState<FieldDict>({
    adHocUserId: '',
    commodityCode: '',
    roomNumber: ''
  })

  /*
  Abstraction of changing one specific key-value in fields.
  */
  const updateFields = (name: string, value: string): void => {
    setFields(prevFieldValues => {
      return {
        ...prevFieldValues,
        [name]: value
      }
    })
  }

  /*
  Synchronizes field input value with fields stored by browser.
  */
  const handleFieldChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFields(name, value)
  }

  /*
  Synchronizes field state to match browser storage on refresh
  */
  useEffect(() => {
    syncStorage.get()
      .then((storage) => {
        const { fieldData } = storage
        for (const fieldName in fieldData) {
          const fieldValue = fieldData[fieldName]
          updateFields(fieldName, fieldValue)
        }
      }).catch(error => { console.log(error) })
  }, [])
  return (
    <>
      <Banner />
      <div className='field-container'>
        <header
          className='text-silver text-xs mt-3 ml-1'
        >Autofill Values</header>
        <form>
          <Field
            name='roomNumber'
            title='Room Number'
            id='room-number'
            type='text'
            pattern='^\d*$'
            value={fields.roomNumber}
            onChange={handleFieldChange}
          />
          <Field
            name='commodityCode'
            title='Commodity Code'
            id='commodity-code'
            type='text'
            pattern='^\d*$'
            inputMode='numeric'
            value={fields.commodityCode}
            onChange={handleFieldChange}
          />
          <Field
            name='adHocUserId'
            title='Ad Hoc User ID'
            id='ad-hoc-user-id'
            type='text'
            value={fields.adHocUserId}
            onChange={handleFieldChange}
          />
        </form>
      </div>
      <NewFieldItem />
    </>
  )
}

export default App
