import React from 'react'

import type { HTMLAttributes, ReactEventHandler } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
  handleToggle: ReactEventHandler<HTMLInputElement>
  isLoading: boolean
  isToggled: boolean
}

export const Switch: React.FC<SwitchProps> = ({ handleToggle, isToggled, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className='switch-track ml-1'
      >
      </div>
    )
  }
  return (
    <>
      <input
        checked={isToggled}
        className='toggle-switch'
        id='toggle-autofill'
        type='checkbox'
        onChange={handleToggle}
      />
      <label
        className='switch-track ml-1'
        htmlFor='toggle-autofill'
      >
        <span
          className='switch-slider'
        />
      </label>
    </>
  )
}
