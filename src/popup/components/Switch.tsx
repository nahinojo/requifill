import React from 'react'
import type { HTMLAttributes } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {
  handleToggle: () => void
  isOn: boolean
}

const Switch: React.FC<SwitchProps> = ({ className, handleToggle, isOn }) => {
  return (
    <>
      <input
        className="toggle-switch"
        id='toggle-autofill'
        type="checkbox"
        checked={isOn}
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
