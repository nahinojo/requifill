import React, { type ReactEventHandler, type HTMLAttributes } from 'react'
import Switch from './Switch'

interface BannerProps extends HTMLAttributes<HTMLInputElement> {
  isAutofill: boolean
  handleAutofillChange: ReactEventHandler<HTMLInputElement>
}

const Banner: React.FC<BannerProps> = ({ isAutofill, handleAutofillChange }) => {
  return (
    <div
      id='toggle-autofill-background'
      className='bg-thunder w-full h-16 flex items-center'
    >
      <Switch
        className='ml-1'
        isToggled={isAutofill}
        handleToggle={handleAutofillChange}
      />
      <h1
        id='toggle-autofill-title'
        className='font-bold ml-2 mt-1'
      >Enable Autofill</h1>
    </div>
  )
}

export default Banner
