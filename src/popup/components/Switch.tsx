import React, { useState, useEffect } from 'react'
import type { HTMLAttributes, ReactEventHandler } from 'react'
import syncStorage from '../../common/syncStorage'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {}

const Switch: React.FC<SwitchProps> = ({ className }) => {
  console.log('Render ID:', Math.random())
  // Consider passing in the stored isAutofill as a prop.
  const [isAutofill, setIsAutofill] = useState<boolean>(false)
  const handleAutofillChange: ReactEventHandler<HTMLInputElement> = () => {
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

  useEffect(() => {
    syncStorage.get().then(storage => {
      const isAutofillStorage: boolean = storage.settings.isAutofill
      console.log('useEffect(): isAutofill:', isAutofill)
      console.log('useEffect(): isAutofillStorage:', isAutofillStorage)
      setIsAutofill(isAutofillStorage)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  console.log('isAutofill:', isAutofill)
  return (
    <>
      <input
        className="toggle-switch"
        id='toggle-autofill'
        type="checkbox"
        checked={isAutofill}
        onChange={handleAutofillChange}
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
