import React, { useState, useEffect } from 'react'
import type { HTMLAttributes, ReactEventHandler } from 'react'
import syncStorage from '../../common/syncStorage'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {}

const Switch: React.FC<SwitchProps> = ({ className }) => {
  const [isAutofill, setIsAutofill] = useState<boolean>(false)
  const handleAutofillChange: ReactEventHandler<HTMLInputElement> = () => {
    console.log('Executing handleAutofillChange()...')
    syncStorage.set({
      settings: {
        isAutofill: !isAutofill
      }
    }).catch(
      error => { console.log(error) }
    )
    toggleAutofill()
  }

  const toggleAutofill = (): void => {
    setIsAutofill(isAutofill => {
      return !isAutofill
    })
  }
  useEffect(() => {
    console.log('Executing Switch.useEffect()...')
    syncStorage.get().then((storage) => {
      console.log('settings.isAutofill:', storage.settings.isAutofill)
      console.log('settings:', storage.settings)
      setIsAutofill(storage.settings.isAutofill)
    }).catch(error => {
      console.log(error)
    })
  }, [isAutofill])
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
