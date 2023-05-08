import React from 'react'

const Switch: React.FC = () => {
  return (
    <>
      <input
        className="toggle-switch"
        id='toggle-autofill'
        type="checkbox"
      />
      <label
        className="switch-track"
        htmlFor='toggle-autofill'>
        <span className='switch-slider' />
      </label>
    </>
  )
}

export default Switch
