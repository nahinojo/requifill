import React, { useState, useEffect, useContext } from 'react'
import { getFieldName } from '../../utils'
import { VerticalDots } from './icons'
import {
  fieldDataContext,
  fieldDataDispatchContext
} from '../hooks'
import type {
  Dispatch,
  FC,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  SetStateAction
} from 'react'
import type { ActionProps } from '../../types'

interface FieldContextMenuProps extends HTMLAttributes<HTMLElement> {
  id: string // Forces dependency in props
  transformSVG: string
  setIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
}

export const FieldContextMenu: FC<FieldContextMenuProps> = ({
  id,
  setIsUnsavedChanges,
  transformSVG
}) => {
  const fieldData = useContext(fieldDataContext)
  const fieldDataDispatch = useContext(fieldDataDispatchContext) as Dispatch<ActionProps>
  const fieldName = getFieldName(id)
  const isFillToForm = fieldData[fieldName].isFillToForm
  const isSingleValueField = typeof fieldData[fieldName].autofill === 'string'
  const [position, setPosition] = useState<{ left: number, top: number } | null>(null)
  const openContextMenuId = `${id}.context-menu-vdots`
  const buttonStyling = 'w-full flex align-middle items-center text-start pl-2 pt-1 text-white'
  const buttonRemoveStyling = `${buttonStyling} h-9`
  const buttonToggleValueStyling = `${buttonStyling} h-9 border-b border-solid border-iron`

  const handleOpenContextMenu: MouseEventHandler<HTMLDivElement> = (evt: MouseEvent<HTMLDivElement>): void => {
    evt.preventDefault()
    const x = evt.clientX
    const y = evt.clientY
    setPosition({ left: x, top: y })
  }

  const handleCloseContextMenu: EventListener = (evt): void => {
    const clickTarget = evt.target as HTMLElement
    const clickTargetId = clickTarget.id
    const isClickedAway = !clickTargetId.includes(openContextMenuId)
    if (isClickedAway) {
      setPosition(null)
    }
  }

  const handleDeactivateField: MouseEventHandler<HTMLButtonElement> =
  () => {
    fieldDataDispatch({
      fieldName,
      type: 'disable-is-active'
    })
    setIsUnsavedChanges(true)
  }

  const handleSetSingleValue: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    const prevAutofillValue = fieldData[fieldName].autofill as Record<string, string>
    const autofill = prevAutofillValue[0]
    fieldDataDispatch({
      autofill,
      fieldName,
      type: 'set-autofill'
    })
    setIsUnsavedChanges(true)
  }
  const handleSetMultiValue: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    const prevAutofillValue = fieldData[fieldName].autofill as string
    const autofill = {
      0: prevAutofillValue,
      1: ''
    }
    fieldDataDispatch({
      autofill,
      fieldName,
      type: 'set-autofill'
    })
    setIsUnsavedChanges(true)
  }

  const handleEnableFillToForm: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    fieldData[fieldName].isFillToForm = true
    setIsUnsavedChanges(true)
  }

  const handleDisableFillToForm: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    fieldData[fieldName].isFillToForm = false
    setIsUnsavedChanges(true)
  }

  /*
  Establishes 'click out' escapability from context menu popup
  */
  useEffect(
    () => {
      document.addEventListener(
        'click', handleCloseContextMenu
      )
      return () => {
        document.removeEventListener(
          'click', handleCloseContextMenu
        )
      }
    }, []
  )
  return (
    <>
      <VerticalDots
        id={openContextMenuId}
        transformSVG={transformSVG}
        onClick={handleOpenContextMenu}
      />
      {
        (position != null) && (
          <div
            style={
              {
                left: `calc(${position.left}px - 10rem)`,
                top: position.top
              }
            }
            className='fixed w-40 h-fit bg-night border border-solid border-iron z-50'
            id={`${id}.context-menu`}
          >
            {
              !!isSingleValueField &&
              (
                <>
                  {
                    !isFillToForm &&
                       (
                         <button
                           className={buttonToggleValueStyling}
                           id={`${id}.context-menu-enable-fill-to-form`}
                           type='button'
                           onClick={handleEnableFillToForm}
                         >Enable fill to form
                         </button>
                       )
                  } {
                    !!isFillToForm &&
                        (
                          <button
                            className={buttonToggleValueStyling}
                            id={`${id}.context-menu-enable-fill-to-form`}
                            type='button'
                            onClick={handleDisableFillToForm}
                          >Disable fill to form
                          </button>
                        )
                  }
                  <button
                    className={buttonToggleValueStyling}
                    id={`${id}.context-menu-enable-multivalue`}
                    type='button'
                    onClick={handleSetMultiValue}
                  >Set multi-value
                  </button>
                </>
              )
            }
            {
              !isSingleValueField && (
                <button
                  className={buttonToggleValueStyling}
                  id={`${id}.context-menu-disable-multivalue`}
                  type='button'
                  onClick={handleSetSingleValue}
                >Set single-value
                </button>
              )
            }
            <button
              className={buttonRemoveStyling}
              id={`${id}.context-menu-remove`}
              type='button'
              onClick={handleDeactivateField}
            >Remove
            </button>
          </div>
        )
      }
    </>
  )
}
