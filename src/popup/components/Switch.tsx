import React from 'react'
import type { HTMLAttributes, ReactEventHandler } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {
  handleToggle: ReactEventHandler<HTMLInputElement>
  isLoading: boolean
  isToggled: boolean
}

const Switch: React.FC<SwitchProps> = ({ className, handleToggle, isToggled, isLoading }) => {
  if (isLoading) return <div className={`switch-track ${className ?? ''}`}></div>
  return (
    <>
      <input
        className='toggle-switch'
        id='toggle-autofill'
        type='checkbox'
        checked={isToggled}
        onChange={handleToggle}
      />
      <label
        className='switch-track'
        htmlFor='toggle-autofill'>
        <span className='switch-slider' />
      </label>
    </>
  )
}

export default Switch
