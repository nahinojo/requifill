import React from 'react'
import type { FC, HTMLAttributes, ReactEventHandler } from 'react'
import PlusSVG from './PlusSVG'
import syncStorage from '../../common/syncStorage'

interface FieldSelectorProps extends HTMLAttributes<HTMLElement> {
  isSelecting: boolean
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>
}

const FieldSelector: FC<FieldSelectorProps> = ({isSelecting, setIsSelecting}) => {
  
  const buttonFieldItemStyling = 'text-left bg-night border border-solid border-wither pl-3 py-2'
  const handleActivateField: ReactEventHandler<HTMLButtonElement> =() => {
    syncStorage
      .get('fieldData')
      .then(storage => {
        const previousData = storage.fieldData !== undefined
          ? storage.fieldData
          : {}
        const currentData = { 
          ...previousData, 
          phoneNumber: {
            value: '77777777',
            isActive: true
          }
        }
        syncStorage
          .set({
            fieldData: currentData
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
        onClick={() => {setIsSelecting(true)}}
      >
        {!isSelecting &&
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
        {isSelecting &&
          <div
            id='field-selections'
            className='flex flex-col'
          >
            <h1
              className='mx-auto font-bold text-sm'
            >Add Autofill Field</h1>
            <button 
              className={`${buttonFieldItemStyling} border-b-0 rounded-t-md`}
              onClick={handleActivateField}
            >PhoneNumber</button>
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
        }
      </div>
  )
}

export default FieldSelector
