import React, { useState, useEffect } from 'react'
import VerticalDots from './VerticalDots'
import kebabToCamelCase from '../../common/kebabToCamelCase'
import syncStorage from '../../common/syncStorage'

import type { FC, HTMLAttributes, ReactEventHandler } from 'react'

interface FieldContextMenuProps extends HTMLAttributes<HTMLElement> {
  id: string // Forces dependency in props
  transformSVG: string
}

const FieldContextMenu: FC <FieldContextMenuProps> = ({ className, id, transformSVG }) => {
  const [position, setPosition] = useState<{ left: number, top: number } | null>(null)
  const openContextMenuId = `${id}-context-menu-vdots`

  const handleOpenContextMenu = (evt: React.MouseEvent<HTMLDivElement>): void => {
    evt.preventDefault()
    const x = evt.clientX
    const y = evt.clientY
    setPosition({ left: x, top: y })
  }

  const handleDeactivateField = (fieldName: string): ReactEventHandler<HTMLButtonElement> => {
    const handleDeactivateFieldTemplate: ReactEventHandler<HTMLButtonElement> = () => {
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
              isActive: false
            }
          }
          console.log('handleDeactivateField() currFieldData:', currFieldData)
          syncStorage
            .set({
              fieldData: currFieldData
            }).catch(
              error => {
                console.log(error)
              }
            )
        }).catch(
          error => {
            console.log(error)
          }
        )
    }
    return handleDeactivateFieldTemplate
  }

  useEffect(() => {
    const handleCloseContextMenu = (evt: MouseEvent): void => {
      const clickTarget = evt.target as HTMLElement
      const clickTargetId = clickTarget.id
      const isClickedAway = !clickTargetId.includes(openContextMenuId)
      if (isClickedAway) {
        setPosition(null)
      }
    }

    document.addEventListener('click', handleCloseContextMenu)

    return () => {
      document.removeEventListener('click', handleCloseContextMenu)
    }
  }, [])

  const menuBottomButtonStyling = 'w-full h-9 flex align-middle items-center text-start indent-1 pt-1 text-white'
  // const menuButtonStyling = `${menuBottomButtonStyling} border-b border-solid border-iron`

  return (
    <>
      <VerticalDots
        className={className}
        id={openContextMenuId}
        transformSVG={transformSVG}
        onClick={handleOpenContextMenu}
      />
      {(position != null) &&
        <div
          className='fixed w-36 h-fit bg-night border border-solid border-iron z-50'
          style={{
            left: `calc(${position.left}px - 9rem)`,
            top: position.top
          }}
        >
          <button
            id={id}
            className={menuBottomButtonStyling}
            onClick={handleDeactivateField(kebabToCamelCase(id))}
          >Remove
          </button>
          {/* <button
            className={menuBottomButtonStyling}
          >Disable
          </button> */}
        </div>
      }
    </>
  )
}

export default FieldContextMenu
