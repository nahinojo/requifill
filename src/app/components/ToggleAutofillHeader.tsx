import React, { useState, useEffect } from 'react'
import { Switch } from './icons'
import {
  syncStorage,
  getIsAutofillEnabled
} from '../../utils'

import type { ReactEventHandler } from 'react'

export const ToggleAutofillHeader: React.FC = () => {
  const [isAutofillEnabled, setIsAutofillEnabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /*
  Flips Enabled for both component state and browser storage
  */
  const toggleAutofill: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage
      .set({
        settings: {
          isAutofillEnabled: !isAutofillEnabled
        }
      })
      .catch(error => {
        console.error(error)
      })
    setIsAutofillEnabled(isAutofillEnabled => {
      return !isAutofillEnabled
    })
  }

  /*
  Synchronizes component state with browser storage on initial render
  */
  useEffect(
    () => {
      getIsAutofillEnabled()
        .then(isAutofillStorage => {
          setIsAutofillEnabled(isAutofillStorage)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
        })
    }, []
  )

  return (
    <div
      className='bg-thunder w-full h-16 flex items-center'
      id='toggle-autofill-background'
    >
      <Switch
        handleToggle={toggleAutofill}
        isLoading={isLoading}
        isToggled={isAutofillEnabled}
      />
      <h1
        className='font-bold ml-2 mt-1'
        id='toggle-autofill-title'
      >Autofill First Value
      </h1>
    </div>
  )
}
