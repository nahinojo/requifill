import React, { useState, useEffect } from 'react'
import type { HTMLAttributes, ReactEventHandler } from 'react'
import syncStorage from '../../common/syncStorage'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {}

const Switch: React.FC<SwitchProps> = ({ className }) => {
  console.log('Rendering Switch Component:', Math.random())
  // Consider passing in the stored isAutofill as a prop.
  const [isAutofill, setIsAutofill] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
      console.log('Getting and returning storage object.')
      const isAutofillStorage = Boolean(storage.settings?.isAutofill)
      console.log('useEffect(): isAutofill:', isAutofill)
      console.log('useEffect(): isAutofillStorage:', isAutofillStorage)
      setIsAutofill(isAutofillStorage)
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  console.log('isAutofill:', isAutofill)
  if (isLoading) return <div className='w-10'></div>
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
