import React, { useState } from 'react'
import type { FC, ReactEventHandler } from 'react'

const NewFieldItem: FC = (props) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleClick: ReactEventHandler<HTMLElement> = () => {
    setIsClicked(true)
  }
  return (
    <div onClick={handleClick}>
      <h1>Click me!</h1>
      {isClicked && <h1>I am clicked!!!</h1>}
    </div>
  )
}

export default NewFieldItem
