import React from 'react'
import type { HTMLAttributes } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {}

const Switch: React.FC<SwitchProps> = ({ className }) => {
  return (
    <>
      <input
        className="toggle-switch"
        id='toggle-autofill'
        type="checkbox"
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
