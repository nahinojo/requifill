import React, { useState, useEffect } from 'react'
import Switch from './icons/Switch'
import syncStorage from '../../utils/syncStorage'
import getIsAutofill from '../../utils/getIsAutofill'
import type { ReactEventHandler } from 'react'

const ToggleAutofillHeader: React.FC = () => {
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
    })
      .catch(error => {
        console.log(error)
      })
    setIsAutofill(isAutofill => {
      return !isAutofill
    })
  }

  /*
  Synchronizes component state with browser storage on initial render
  */
  useEffect(
    () => {
      getIsAutofill()
        .then(isAutofillStorage => {
          setIsAutofill(isAutofillStorage)
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }, []
  )

  return (
    <div
      className='bg-thunder w-full h-16 flex items-center'
      id='toggle-autofill-background'
    >
      <Switch
        handleToggle={handleAutofillChange}
        isLoading={isLoading}
        isToggled={isAutofill}
      />
      <h1
        className='font-bold ml-2 mt-1'
        id='toggle-autofill-title'
      >Enable Autofill
      </h1>
    </div>
  )
}

export default ToggleAutofillHeader
