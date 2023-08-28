import React, { useEffect, useState } from 'react'
import type { FC, HTMLAttributes, ReactEventHandler } from 'react'
import PlusSVG from './PlusSVG'
import syncStorage from '../../common/syncStorage'
import kebabToCamelCase from '../../common/kebabToCamelCase'
import camelToTitleCase from '../../common/camelToTitleCase'
import { FieldData } from '../App'
import camelToKebabCase from '../../common/camelToKebabCase'

interface FieldSelectorProps extends HTMLAttributes<HTMLElement> {
  fieldData: FieldData
  isSelecting: boolean
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>
}

const FieldSelector: FC<FieldSelectorProps> = ({fieldData, isSelecting, setIsSelecting}) => {
  console.log('Object.keys(fieldData)',Object.keys(fieldData))
  console.log('Object.entries(fieldData)',Object.entries(fieldData))
  const [newFieldOptions, setNewFieldOptions] = useState([])
  const buttonFieldStyling = 'text-left bg-night border-t border-solid border-wither pl-3 py-2'
  /* 
  Since new field option will disappear on full autofill, newFieldOptions is the ultimate requirement
  But, it may be extractable through fieldData, hence, no  component state is necessary
  */
  const handleActivateField: ReactEventHandler<HTMLButtonElement> =(evt) => {
    const buttonElement = evt.target as HTMLButtonElement
    const fieldName = kebabToCamelCase(buttonElement.id)
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
      }).catch(
        error => {
          console.log(error)
        }
        )
        setIsSelecting(false)
    }).catch(
      error => {
        console.log(error)
      }
    )
  }

  return (
      <div
        className='mx-1 mt-1.5'
        >
        {!isSelecting &&
        <div
          onClick={() => {setIsSelecting(true)}}
          id='new-field-iwrapper'
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
        {isSelecting && 
        <div
          className='flex flex-col'
          id='field-selector'
        >
          <h1
            className='mx-auto font-bold text-sm'
          >Add Autofill Field</h1>
          <div
            id='field-options'
            className='flex flex-col rounded-md bg-white'
          >
            {Object.entries(fieldData!).map(([name, data], index) => {
              if (!data.isActive) {
                let buttonClassName: string
                if (index === 0) {
                  buttonClassName = `${buttonFieldStyling} border-b-0 rounded-t-md`
                } else if (index < Object.entries(fieldData!).length - 1) {
                  buttonClassName = `${buttonFieldStyling} border-b-0`
                } else {
                  buttonClassName = `${buttonFieldStyling} rounded-b-md`
                }
                return(
                  <button
                  id={camelToKebabCase(name)}
                  className={buttonFieldStyling}
                  onClick={handleActivateField}
                  >{camelToTitleCase(name)}</button>
                  )
                }
              })}
          </div>
        </div>
        }
      </div>
  )
}

export default FieldSelector
