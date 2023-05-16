import React, { useState, useEffect } from 'react'
import type { HTMLAttributes, ReactEventHandler } from 'react'
import syncStorage from '../../common/syncStorage'
import getIsAutofillStorage from '../../common/getIsAutofillStorage'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {}

// Issue: Component is only functional for isAutofill property
const Switch: React.FC<SwitchProps> = ({ className }) => {
  const [isAutofill, setIsAutofill] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /*
  Flips isAutofill for both component state and browser storage
  */
  const handleAutofillFieldChange: ReactEventHandler<HTMLInputElement> = () => {
    syncStorage.set({
      settings: {
        isAutofill: !isAutofill
      }
    }).catch(
      error => { console.log(error) }
    )
    setIsAutofill(isAutofill => {
      return !isAutofill
    })
  }

  /*
  Synchronizes component state with browser storage on initial render
  */
  useEffect(() => {
    getIsAutofillStorage().then(isAutofillStorage => {
      setIsAutofill(isAutofillStorage)
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  if (isLoading) return <div className='w-10'></div>
  return (
    <>
      <input
        className="toggle-switch"
        id='toggle-autofill'
        type="checkbox"
        checked={isAutofill}
        onChange={handleAutofillFieldChange}
      />
      <label
        className={`switch-track ${className ?? ''}`}
        htmlFor='toggle-autofill'>
        <span className='switch-slider' />
      </label>
    </>
  )
}

export default Switch
