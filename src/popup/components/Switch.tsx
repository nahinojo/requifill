import React from 'react'
import type { HTMLAttributes, ReactEventHandler } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {
  handleToggle: ReactEventHandler<HTMLInputElement>
  isToggled: boolean
}

const Switch: React.FC<SwitchProps> = ({ className, handleToggle, isToggled }) => {
  return (
    <>
      <input
        className="toggle-switch"
        id='toggle-autofill'
        type="checkbox"
        checked={isToggled}
        onChange={handleToggle}
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
