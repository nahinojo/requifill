import React, { useState, useEffect, useContext } from 'react'
import VerticalDotsIcon from './icons/VerticalDots'
import getFieldName from '../utils/getFieldName'
import { FieldDataContext, FieldDataDispatchContext } from '../utils/fieldDataContext'

import type {
  Dispatch,
  FC,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  SetStateAction
} from 'react'
import type ActionProps from '../utils/ActionProps'
interface FieldContextMenuProps extends HTMLAttributes<HTMLElement> {
  id: string // Forces dependency in props
  transformSVG: string
  setIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
}

const FieldContextMenu: FC <FieldContextMenuProps> = ({
  id,
  setIsUnsavedChanges,
  transformSVG
}) => {
  const fieldData = useContext(FieldDataContext)
  const fieldDataDispatch = useContext(FieldDataDispatchContext) as Dispatch<ActionProps>
  const [position, setPosition] = useState<{ left: number, top: number } | null>(null)
  const openContextMenuId = `${id}.context-menu-vdots`
  const isSingleValueField =
    typeof fieldData[getFieldName(id)].autofillValue === 'string'

  const handleOpenContextMenu = (evt: React.MouseEvent<HTMLDivElement>): void => {
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
    const fieldName = getFieldName(id)
    fieldDataDispatch({
      fieldName,
      type: 'deactivate-field'
    })
    setIsUnsavedChanges(true)
  }

  const handleSetSingleValue: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    const { id: targetId } = evt.target as HTMLButtonElement
    const fieldName = getFieldName(targetId)
    const prevAutofillValue = fieldData[fieldName].autofillValue as Record<string, string>
    const autofillValue = prevAutofillValue[0]
    fieldDataDispatch({
      autofillValue,
      fieldName,
      type: 'set-autofill'
    })
    setIsUnsavedChanges(true)
  }
  const handleSetMultiValue: MouseEventHandler<HTMLButtonElement> =
  (evt: MouseEvent<HTMLButtonElement>) => {
    const { id: targetId } = evt.target as HTMLButtonElement
    const fieldName = getFieldName(targetId)
    const prevAutofillValue = fieldData[fieldName].autofillValue as string
    const autofillValue = {
      0: prevAutofillValue,
      1: ''
    }
    fieldDataDispatch({
      autofillValue,
      fieldName,
      type: 'set-autofill'
    })
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
  const buttonStyling = 'w-full flex align-middle items-center text-start pl-2 pt-1 text-white'
  const buttonRemoveStyling = `${buttonStyling} h-9 border-b border-solid border-iron`
  const buttonToggleValueStyling = `${buttonStyling} h-9`

  return (
    <>
      <VerticalDotsIcon
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
            <button
              className={buttonRemoveStyling}
              id={`${id}.context-menu-remove`}
              type='button'
              onClick={handleDeactivateField}
            >Remove
            </button>
            {
              !!isSingleValueField && (
                <button
                  className={buttonToggleValueStyling}
                  id={`${id}.context-menu-enable-multivalue`}
                  type='button'
                  onClick={handleSetMultiValue}
                >Enable Multivalue
                </button>
              )
            } {
              !isSingleValueField && (
                <button
                  className={buttonToggleValueStyling}
                  id={`${id}.context-menu-disable-multivalue`}
                  type='button'
                  onClick={handleSetSingleValue}
                >Disable Multivalue
                </button>
              )
            }
          </div>
        )
      }
    </>
  )
}

export default FieldContextMenu
