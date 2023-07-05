import React, { useState } from 'react'
import type { FC } from 'react'
import PlusSVG from './PlusSVG'

const NewFieldItem: FC = (props) => {
  const [isSelections, setIsSelections] = useState(false)
  return (
      <div onClick={() => { setIsSelections(true) }}>
        {!isSelections &&
        <div
          className='flex justify-center mx-28 cursor-pointer'
        >
          <PlusSVG 
            className='mt-1 mr-1'
          />
          <button
            className='text-sm text-silver mt-1'
          >New Field Item</button>
        </div>
        }
        {isSelections &&
          <div
            className='flex flex-col'
          >
            <h1>New Autofill Field</h1>
            <button onClick={ () => { setIsSelections(false) }}>Field Item 1</button>
            <button onClick={ () => { setIsSelections(false) }}>Field Item 2</button>
            <button onClick={ () => { setIsSelections(false) }}>Field Item 3</button>
            <button onClick={ () => { setIsSelections(false) }}>Field Item 4</button>
          </div>
        }
      </div>
  )
}

export default NewFieldItem
