import React, { useContext } from 'react'
import {
  fieldDataContext,
  fieldDataDispatchContext
} from '../hooks'
import { syncStorage } from '../../objects'

import type {
  Dispatch,
  FC,
  MouseEventHandler,
  ReactEventHandler,
  SetStateAction
} from 'react'
import type { ActionProps } from '../../types'

interface UnsavedFieldPromptProps {
  setIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
}

export const UnsavedFieldPrompt: FC<UnsavedFieldPromptProps> = ({
  setIsUnsavedChanges
}) => {
  const fieldData = useContext(fieldDataContext)
  const fieldDataDispatch = useContext(fieldDataDispatchContext) as Dispatch<ActionProps>

  const handleSaveChanges: ReactEventHandler<HTMLButtonElement> =
  () => {
    syncStorage
      .set({ fieldData })
      .catch(error => {
        console.error(error)
      })
    setIsUnsavedChanges(false)
  }

  const handleDiscardChanges: MouseEventHandler<HTMLButtonElement> =
  () => {
    syncStorage
      .get()
      .then(storage => {
        const newFieldData = storage.fieldData
        fieldDataDispatch({
          newFieldData,
          type: 'set-data'
        })
      })
      .catch(error => {
        console.error(error)
      })
    setIsUnsavedChanges(false)
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
          onClick={handleDiscardChanges}
        >Discard
        </button>
        <button
          className='font-semibold hover:underline'
          type='button'
          onClick={handleSaveChanges}
        >Save
        </button>
      </div>
    </div>
  )
}
