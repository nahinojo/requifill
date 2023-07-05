import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import Banner from './components/Banner'
import FieldItem from './components/FieldItem'
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
  Change key-value pair within fields object.
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
  Transfers field state to browser storage.
  */
  const handleFieldChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFields(name, value)
  }

  /*
  On app refresh, updates all field states to match data in browser storage.
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
          className='text-silver text-sm mt-3 ml-1'
        >Autofill Values</header>
        <form>
          <FieldItem
            name='roomNumber'
            title='Room Number'
            id='room-number'
            type='text'
            pattern='^\d*$'
            value={fields.roomNumber}
            onChange={handleFieldChange}
          />
          <FieldItem
            name='commodityCode'
            title='Commodity Code'
            id='commodity-code'
            type='text'
            pattern='^\d*$'
            inputMode='numeric'
            value={fields.commodityCode}
            onChange={handleFieldChange}
          />
          <FieldItem
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
