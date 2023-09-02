import React, { type HTMLAttributes, type ReactEventHandler } from 'react'

interface UnsavedFieldPromptProps extends HTMLAttributes<HTMLElement> {
  discardFieldChanges: ReactEventHandler
  saveFieldChanges: ReactEventHandler
}

const UnsavedFieldPrompt: React.FC<UnsavedFieldPromptProps> = ({
  discardFieldChanges,
  saveFieldChanges
}) => {
  return (
    <div
      className='bg-aqua w-full h-1/6 fixed bottom-0'
    >
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
          type='button'
          onClick={discardFieldChanges}
        >Discard
        </button>
        <button
          className='font-semibold hover:underline'
          type='button'
          onClick={saveFieldChanges}
        >Save
        </button>
      </div>
    </div>
  )
}

export default UnsavedFieldPrompt
