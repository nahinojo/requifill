import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import Title from './components/Title'
import FillHeader from './components/FieldHeader'
import FillItem from './components/Field'

const syncStorage: browser.storage.StorageAreaSync = browser.storage.sync

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
      .then((fieldsStorage) => {
        for (const name in fieldsStorage) {
          updateFields(name, fieldsStorage[name])
        }
      }).catch(error => { console.log(error) })
  }, [])

  /*
  Synchronizes field input value with fields stored by browser.
  */
  const handleAnyChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFields(name, value)
  }

  /*
  Synchronizes field input value with fields stored by browser.

  Strictly enforces pattern property
  */
  const handlePatternChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, pattern } = evt.target
    const regex = new RegExp(pattern)
    if (regex.test(value)) {
      updateFields(name, value)
    }
  }

  return (
    <React.StrictMode>
      <Title />
      <div className='fill-container'>
        <FillHeader text='Default Values' />
        <FillItem
          name='roomNumber'
          title='Room Number'
          id='room-number'
          type='tel'
          pattern='^\d*$'
          value={fields.roomNumber}
          onChange={handlePatternChange}
        />
        <FillItem
          name='commodityCode'
          title='Commodity Code'
          id='commodity-code'
          type='text'
          pattern='^\d*$'
          inputMode='numeric'
          value={fields.commodityCode}
          onChange={handlePatternChange}
        />
        <FillItem
          name='adHocUserId'
          title='Ad Hoc User ID'
          id='ad-hoc-user-id'
          type='text'
          value={fields.adHocUserId}
          onChange={handleAnyChange}
        />
      </div>
    </React.StrictMode>
  )
}

export default App
