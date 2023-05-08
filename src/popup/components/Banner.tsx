import React, { useState } from 'react'
import Switch from './Switch'

const Banner: React.FC = () => {
  const [isAutofilling, setIsAutofilling] = useState<boolean>(true)
  return (
    <div
      id='toggle-autofill-background'
      className='bg-thunder w-full h-16 flex items-center'
    >
      <Switch
        className='ml-1'
        isOn={isAutofilling}
        handleToggle={
          () => { setIsAutofilling(!isAutofilling) }
        }
      />
      <h1
        id='toggle-autofill-title'
        className='font-bold ml-2 mt-1'
      >Enable Autofill</h1>
    </div>
  )
}

export default Banner
