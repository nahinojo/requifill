import React from 'react'
import type { FC, HTMLAttributes, ReactEventHandler } from 'react'
import Plus from './icons/Plus'
import syncStorage from '../../common/syncStorage'
import camelToTitleCase from '../../common/camelToTitleCase'
import { type FieldDataProps } from '../App'

interface AddNewFieldProps extends HTMLAttributes<HTMLElement> {
  fieldData: FieldDataProps
  isAdding: boolean
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewField: FC<AddNewFieldProps> = ({ fieldData, isAdding, setIsAdding }) => {
  const fieldOptions = Object.keys(fieldData)
    .filter(key => { return !fieldData[key].isActive })
  const buttonFieldStylingBase = 'text-left bg-night border border-solid border-overcast pl-3 py-2'
  const handleActivateField: ReactEventHandler<HTMLButtonElement> = (evt) => {
    const buttonElement = evt.target as HTMLButtonElement
    const fieldName = buttonElement.id
    syncStorage
      .get('fieldData')
      .then(storage => {
        const prevFieldData = storage.fieldData !== undefined
          ? storage.fieldData
          : {}
        const currFieldData = {
          ...prevFieldData,
          [fieldName]: {
            ...prevFieldData[fieldName],
            isActive: true
          }
        }
        syncStorage
          .set({
            fieldData: currFieldData
          })
          .catch(error => {
            console.log(error)
          })
        setIsAdding(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div
      className='mx-1 mt-2'
      id='add-new-field'
    >
      {
        !isAdding &&
        fieldOptions.length !== 0 && (
          <div
            className='flex justify-center w-fit mx-auto cursor-pointer'
            id='new-field-initiator'
            onClick={() => { setIsAdding(true) }}
          >
            <Plus />
            <button
              className='text-sm text-silver hover:underline'
              id='new-field'
              type='button'
            >New Field
            </button>
          </div>
        )
      }
      {
        !!isAdding && (
          <div
            className='flex flex-col'
            id='field-selector'
          >
            <h1
              className='mx-auto font-bold text-sm'
            >Add Autofill Field
            </h1>
            {
              fieldOptions.map((
                id, index
              ) => {
                let buttonFieldStyling: string
                if (index === 0) {
                  buttonFieldStyling = `${buttonFieldStylingBase} rounded-t-md`
                  if (fieldOptions.length > 1) {
                    buttonFieldStyling = `${buttonFieldStyling} border-b-0`
                  } else {
                    buttonFieldStyling = `${buttonFieldStyling} rounded-b-md`
                  }
                } else if (index < fieldOptions.length - 1) {
                  buttonFieldStyling = `${buttonFieldStylingBase} border-b-0`
                } else {
                  buttonFieldStyling = `${buttonFieldStylingBase} rounded-b-md`
                }
                return (
                  <button
                    className={buttonFieldStyling}
                    id={id}
                    key={`${id}.${index}`}
                    type='button'
                    onClick={handleActivateField}
                  >{camelToTitleCase(id)}
                  </button>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default AddNewField
