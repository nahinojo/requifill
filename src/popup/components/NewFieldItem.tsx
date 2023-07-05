import React, { useState } from 'react'
import type { FC } from 'react'
import PlusSVG from './PlusSVG'

const NewFieldItem: FC = (props) => {
  const [isSelections, setIsSelections] = useState(false)
  const buttonFieldItemStyling = 'text-left bg-night border border-solid border-wither pl-3 py-2'
  return (
      <div
        className='mx-1 mt-1.5'
        onClick={() => { setIsSelections(true) }}
      >
        {!isSelections &&
        <div
          id='new-field-initiator'
          className='flex justify-center w-fit mx-auto cursor-pointer'
        >
          <PlusSVG
            className='mr-1 mt-0.5'
          />
          <button
          id='new-field'
            className='text-sm text-silver'
          >New Field</button>
        </div>
        }
        {isSelections &&
          <div
            id='field-selections'
            className='flex flex-col'
          >
            <h1
              className='mx-auto font-bold text-sm'
            >New Autofill Field</h1>
            <button 
              className={`${buttonFieldItemStyling} border-b-0 rounded-t-md`}
              onClick={ () => { setIsSelections(false) }}
            >Field Item 1</button>
            <button 
              className={`${buttonFieldItemStyling} border-b-0`}
              onClick={ () => { setIsSelections(false) }}
            >Field Item 2</button>
            <button
              className={`${buttonFieldItemStyling} border-b-0`}
              onClick={ () => { setIsSelections(false) }}
            >Field Item 3</button>
            <button
              className={`${buttonFieldItemStyling} rounded-b-md`}
              onClick={ () => { setIsSelections(false) }}
            >Field Item 4</button>
          </div>
        }
      </div>
  )
}

export default NewFieldItem
