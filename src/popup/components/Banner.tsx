import React from 'react'
import Switch from './Switch'

const Banner: React.FC = () => {
  return (
    <div
      id='toggle-autofill-background'
      className='bg-thunder w-full h-14 flex items-center'
    >
      <Switch />
      <h1
        id='toggle-autofill-title'
        className='font-bold ml-1 mt-1'
      >Enable Autofill</h1>
    </div>
  )
}

export default Banner
