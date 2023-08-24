import React, { useState, useEffect } from 'react'
import Switch from './Switch'
import syncStorage from '../../common/syncStorage'
import getIsAutofill from '../../common/getIsAutofill'
import type { ReactEventHandler } from 'react'

const Banner: React.FC = () => {
  const [isAutofill, setIsAutofill] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /*
  Flips isAutofill for both component state and browser storage
  */
  const handleAutofillChange: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage.set({
      settings: {
        isAutofill: !isAutofill
      }
    }).catch(error => {
      console.log(error)
    })
    setIsAutofill(isAutofill => {
      return !isAutofill
    })
  }

  /*
  Synchronizes component state with browser storage on initial render
  */
  useEffect(() => {
    getIsAutofill().then(isAutofillStorage => {
      setIsAutofill(isAutofillStorage)
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div
      id='toggle-autofill-background'
      className='bg-thunder w-full h-16 flex items-center'
    >
      <Switch
        className='ml-1'
        isLoading={isLoading}
        isToggled={isAutofill}
        handleToggle={handleAutofillChange}
      />
      <h1
        id='toggle-autofill-title'
        className='font-bold ml-2 mt-1'
      >Enable Autofill</h1>
    </div>
  )
}

export default Banner
