import React, { useContext } from 'react'
import { FieldDataDispatchContext } from '../utils/fieldDataContext'

import type { FC, MouseEventHandler, MouseEvent } from 'react'

const UnsavedFieldPrompt: FC = () => {
  const fieldDataDispatch = useContext(FieldDataDispatchContext)

  const saveChanges: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    fieldDataDispatch({
      autofillValue: 
      type: 'save-changes'
    })
  }
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
          onClick={discardChanges}
        >Discard
        </button>
        <button
          className='font-semibold hover:underline'
          type='button'
          onClick={saveChanges}
        >Save
        </button>
      </div>
    </div>
  )
}

export default UnsavedFieldPrompt
