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
  const fieldOptions = Object.keys(fieldData).filter(key => !fieldData[key].isActive)
  const buttonFieldStylingBase = 'text-left bg-night border border-solid border-wither pl-3 py-2'
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
        fieldOptions.length !== 0 &&
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
          {fieldOptions.map((name, index) => {
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
            return(
              <button
              id={camelToKebabCase(name)}
              className={buttonFieldStyling}
              onClick={handleActivateField}
              >{camelToTitleCase(name)}</button>
              )
            })}
        </div>
        }
      </div>
  )
}

export default FieldSelector
