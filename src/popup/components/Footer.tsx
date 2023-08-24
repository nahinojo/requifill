import React, { HTMLAttributes, ReactEventHandler, useRef } from 'react'
import type FC from 'react'

interface FooterProps extends HTMLAttributes<HTMLElement> {
  isUnsavedChanges: boolean
  discardFieldChanges: ReactEventHandler
  saveFieldChanges: ReactEventHandler
}

const Footer: React.FC<FooterProps> = ({
  isUnsavedChanges, 
  discardFieldChanges,
  saveFieldChanges
}) => {
  return(
    <footer
      className='bg-thunder w-full h-1/6 fixed bottom-0'
    >
      {isUnsavedChanges && 
      <>
        <p
          className='text-center mt-4 font-semibold'
          >Would you like to save your changes?
        </p>
        <div
          className='flex justify-around mt-5'
          id='save-choice-wrapper'
        >
          <button
            className='font-semibold hover:underline'
            onClick={discardFieldChanges}
          >Discard
          </button>
          <button
            className='font-semibold hover:underline'
            onClick={saveFieldChanges}
          >Save
          </button>
        </div>
      </>
      }
    </footer>
  )
}

export default Footer