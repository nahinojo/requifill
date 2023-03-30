import React, { useState, useEffect } from 'react'
import type { FC, ReactEventHandler, ChangeEvent } from 'react'
import Title from './components/Title'
import FillHeader from './components/FillHeader'
import FillItem from './components/FillItem'

interface FieldDict {
  requestorPersonPhoneNumber: string
  adHocUserId: string
  commodityCode: string
  budgetCode: string
}

const App: FC = () => {
  const [fillValues, setFillValues] = useState<FieldDict>({
    requestorPersonPhoneNumber: '',
    adHocUserId: '',
    commodityCode: '',
    budgetCode: ''
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
    setFillValues(prevFieldValues => ({
      ...prevFieldValues,
      [name]: value
    }))
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
          name='requestorPersonPhoneNumber'
          title='Requestor Phone #'
          id='requestor-person-phone-number'
          type='tel'
          pattern='^[\d\+\-\)\( ]*$'
          value={fillValues.requestorPersonPhoneNumber}
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
          name='budgetCode'
          title='Budget Code'
          id='budget-code'
          type='text'
          value={fillValues.budgetCode}
          onChange={handleAnyChange}
        />
      </div>
    </React.StrictMode>
  )
}

export default App
