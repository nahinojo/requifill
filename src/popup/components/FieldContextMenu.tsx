import React, { useState, useEffect, useContext } from 'react'
import VerticalDotsIcon from './icons/VerticalDots'
import getFieldName from '../utils/getFieldName'
import { FieldDataDispatchContext } from '../utils/fieldDataContext'

import type {
  Dispatch,
  FC,
  HTMLAttributes,
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
  const fieldDataDispatch = useContext(FieldDataDispatchContext) as Dispatch<ActionProps>
  const [position, setPosition] = useState<{ left: number, top: number } | null>(null)
  const openContextMenuId = `${id}.context-menu-vdots`

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

  const menuBottomButtonStyling = 'w-full h-9 flex align-middle items-center text-start indent-2 pt-1 text-white'
  // const menuButtonStyling = `${menuBottomButtonStyling} border-b border-solid border-iron`

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
                left: `calc(${position.left}px - 9rem)`,
                top: position.top
              }
            }
            className='fixed w-36 h-fit bg-night border border-solid border-iron z-50'
            id={`${id}.context-menu`}
          >
            <button
              className={menuBottomButtonStyling}
              id={`${id}.context-menu-option`}
              type='button'
              onClick={handleDeactivateField}
            >Remove
            </button>
            {/* <button
              className={menuBottomButtonStyling}
              type='button'
            >Disable MultiValue
            </button> */}
          </div>
        )
      }
    </>
  )
}

export default FieldContextMenu
