import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import Title from './components/Banner'
import FieldHeader from './components/FieldHeader'
import Field from './components/Field'
import { syncStorage } from '../content_scripts/constants'

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

  /*
  Synchronizes field input value with fields stored by browser.
  */
  const handleChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFields(name, value)
  }

  return (
    <React.StrictMode>
      <Title />
      <div className='field-container'>
        <FieldHeader text='Default Values' />
        <form>
          <Field
            name='roomNumber'
            title='Room Number'
            id='room-number'
            type='text'
            pattern='^\d*$'
            value={fields.roomNumber}
            onChange={handleChange}
          />
          <Field
            name='commodityCode'
            title='Commodity Code'
            id='commodity-code'
            type='text'
            pattern='^\d*$'
            inputMode='numeric'
            value={fields.commodityCode}
            onChange={handleChange}
          />
          <Field
            name='adHocUserId'
            title='Ad Hoc User ID'
            id='ad-hoc-user-id'
            type='text'
            value={fields.adHocUserId}
            onChange={handleChange}
          />
        </form>
      </div>
    </React.StrictMode>
  )
}

export default App
