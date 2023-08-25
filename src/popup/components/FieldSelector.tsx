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
  const buttonFieldItemStyling = 'text-left bg-night border border-solid border-wither pl-3 py-2'
  console.log('Object.keys(fieldData)',Object.keys(fieldData))
  console.log('Object.entries(fieldData)',Object.entries(fieldData))
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
          id='field-selections'
        >
          <h1
            className='mx-auto font-bold text-sm'
          >Add Autofill Field</h1>
            {Object.entries(fieldData!).map(([name, data], index) => {
              if (!data.isActive) {
                let buttonClassName = ''
                if (index === 0) {
                  buttonClassName = `${buttonFieldItemStyling} border-b-0 rounded-t-md`
                } else if (index < Object.entries(fieldData!).length - 1) {
                  buttonClassName = `${buttonFieldItemStyling} border-b-0`
                } else {
                  buttonClassName = `${buttonFieldItemStyling} rounded-b-md`
                }
                return(
                  <button
                    id={camelToKebabCase(name)}
                    className={buttonClassName}
                    onClick={handleActivateField}
                  >{camelToTitleCase(name)}</button>
                )
              }
            })}
        </div>
        }
        {/* {isSelecting &&
          <div
            id='field-selections'
            className='flex flex-col'
          >
            <h1
              className='mx-auto font-bold text-sm'
            >Add Autofill Field</h1>
            <button
              id='phone-number'
              className={`${buttonFieldItemStyling} border-b-0 rounded-t-md`}
              onClick={handleActivateField}
            >Phone Number</button>
            <button 
              className={`${buttonFieldItemStyling} border-b-0`}
            >Field Item 2</button>
            <button
              className={`${buttonFieldItemStyling} border-b-0`}
            >Field Item 3</button>
            <button
              className={`${buttonFieldItemStyling} rounded-b-md`}
            >Field Item 4</button>
          </div>
        } */}
      </div>
  )
}

export default FieldSelector
