import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import Title from './components/Title'
import FillHeader from './components/FillHeader'
import FillItem from './components/FillItem'

interface FieldDict {
  adHocUserId: string
  commodityCode: string
  roomNumber: string
}

const App: FC = () => {
  const [fillValues, setFillValues] = useState<FieldDict>({
    adHocUserId: '',
    commodityCode: '',
    roomNumber: ''
  })

  useEffect(() => {
    browser.storage.sync.get()
      .then((fillValuesSync) => {
        for (const name in fillValuesSync) {
          updateFillValues(name, fillValuesSync[name])
        }
      }).catch(error => { console.log(error) })
  }, [])

  const updateFillValues = (name: string, value: string): void => {
    setFillValues(prevFieldValues => {
      return {
        ...prevFieldValues,
        [name]: value
      }
    })
  }

  const handleAnyChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target
    updateFillValues(name, value)
  }

  const handlePatternChange: ReactEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, pattern } = evt.target
    const regex = new RegExp(pattern)
    if (regex.test(value)) {
      updateFillValues(name, value)
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
          value={fillValues.roomNumber}
          onChange={handlePatternChange}
        />
        <FillItem
          name='commodityCode'
          title='Commodity Code'
          id='commodity-code'
          type='text'
          pattern='^\d*$'
          inputMode='numeric'
          value={fillValues.commodityCode}
          onChange={handlePatternChange}
        />
        <FillItem
          name='adHocUserId'
          title='Ad Hoc User ID'
          id='ad-hoc-user-id'
          type='text'
          value={fillValues.adHocUserId}
          onChange={handleAnyChange}
        />
      </div>
    </React.StrictMode>
  )
}

export default App
