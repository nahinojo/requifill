import React, { FC, HTMLAttributes, useState, useEffect } from 'react'
import VerticalDots from './VerticalDots'

interface FieldContextMenuProps extends HTMLAttributes<HTMLElement> {
  transformSVG: string
}

const FieldContextMenu: FC <FieldContextMenuProps> = ({ className, id, transformSVG }) => {  
  const [position, setPosition] = useState<{left: number, top:number} | null>(null)

  const handleOpenContextMenu = (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault()
    const x = evt.clientX
    const y = evt.clientY
    setPosition({ left: x, top: y})
  }

  useEffect(() => {
    const handleCloseContextMenu = (evt: MouseEvent) => {
      const clickTarget = evt.target as HTMLElement
      const clickTargetId = clickTarget.id
      const isClickedVerticalDots = clickTargetId.includes(`${id}-vdots`)
      if (!isClickedVerticalDots) {
        setPosition(null)
      }
      console.log('clickTargetId:', clickTargetId)
      console.log('checkMatchIdString', `${id}-context-menu-vdots`)
      console.log('isClickedVerticalDots:', isClickedVerticalDots)
    }

    document.addEventListener('click', handleCloseContextMenu)

    return (()=>{
      document.removeEventListener('click', handleCloseContextMenu)
    })
  }, [])
  return(
    <>
      <VerticalDots
        className={className}
        id={id}
        transformSVG={transformSVG}
        onClick={handleOpenContextMenu}
      />
      {position &&
        <div
          className='fixed w-36 h-32 bg-night border border-solid border-iron z-50'
          style={{
            left: `calc(${position.left}px - 9rem)`,
            top: position.top
          }}
          id='field-context-menu-dropdown'
        ></div>
      }
    </>
  )

}

export default FieldContextMenu
