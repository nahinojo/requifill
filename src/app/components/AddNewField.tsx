import React, { useContext } from 'react'
import { PlusSilver } from './icons'
import {
  fieldDataContext,
  fieldDataDispatchContext
} from '../hooks'
import {
  camelToTitleCase,
  getFieldName
} from '../../utils'

import type {
  Dispatch,
  FC,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler
} from 'react'
import type {
  ActionProps,
  FieldName
} from '../../types'
interface AddNewFieldProps extends HTMLAttributes<HTMLElement> {
  isAddingField: boolean
  setIsAddingField: React.Dispatch<React.SetStateAction<boolean>>
  setIsUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddNewField: FC<AddNewFieldProps> = ({
  isAddingField,
  setIsAddingField,
  setIsUnsavedChanges
}) => {
  const fieldData = useContext(fieldDataContext)
  const fieldDataDispatch = useContext(fieldDataDispatchContext) as Dispatch<ActionProps>
  const activeFieldNames = Object.keys(fieldData)
    .filter((key: FieldName) => { return !fieldData[key].isActive }) as FieldName[]
  const buttonFieldStylingBase = 'mx-1 text-left bg-night border border-solid border-overcast pl-3 py-2'

  const handleActivateField: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    const { id: targetId } = evt.target as HTMLButtonElement
    const fieldName = getFieldName(targetId)
    fieldDataDispatch({
      autofill: '',
      fieldName,
      type: 'set-autofill'
    })
    fieldDataDispatch({
      fieldName,
      type: 'enable-is-active'
    })
    setIsAddingField(false)
    setIsUnsavedChanges(true)
  }
  return (
    <div
      className='mb-1'
      id='add-new-field'
    >
      {
        !isAddingField &&
          activeFieldNames.length !== 0 && (
          <button
            className='mt-2 w-fit mx-auto cursor-pointer flex justify-center text-sm text-silver'
            id='add-new-field-initiator'
            type='button'
            onClick={() => { setIsAddingField(true) }}
          >
            <PlusSilver />New Field
          </button>
        )
      }
      {
        !!isAddingField && (
          <div
            className='mt-2 flex flex-col'
            id='field-selector'
          >
            <header
              className='mx-auto font-bold text-sm'
            >Add Autofill Field
            </header>
            {
              activeFieldNames.map((
                fieldName, index
              ) => {
                const selectionTitle = fieldData[fieldName].title === undefined
                  ? camelToTitleCase(fieldName)
                  : fieldData[fieldName].title as string
                let buttonFieldStyling: string
                if (index === 0) {
                  buttonFieldStyling = `${buttonFieldStylingBase} rounded-t-md`
                  if (activeFieldNames.length > 1) {
                    buttonFieldStyling = `${buttonFieldStyling} border-b-0`
                  } else {
                    buttonFieldStyling = `${buttonFieldStyling} rounded-b-md`
                  }
                } else if (index < activeFieldNames.length - 1) {
                  buttonFieldStyling = `${buttonFieldStylingBase} border-b-0`
                } else {
                  buttonFieldStyling = `${buttonFieldStylingBase} rounded-b-md`
                }
                return (
                  <button
                    className={buttonFieldStyling}
                    id={fieldName}
                    key={`${fieldName}.${index}`}
                    type='button'
                    onClick={handleActivateField}
                  >{selectionTitle}
                  </button>
                )
              })
            }
            <button
              className='font-semibold pt-1 text-sm w-fit mx-auto hover:underline flex justify-center'
              type='button'
              onClick={
                () => { setIsAddingField(false) }
              }
            >
              Cancel
            </button>
          </div>
        )
      }
    </div>
  )
}
