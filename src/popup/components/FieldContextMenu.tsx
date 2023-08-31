import React, { FC, HTMLAttributes, useState, useEffect } from 'react'
import VerticalDots from './VerticalDots'

interface FieldContextMenuProps extends HTMLAttributes<HTMLElement> {
}

const FieldContextMenu: FC <FieldContextMenuProps> = ({ className, id }) => {  
  const [position, setPosition] = useState<{left: number, top:number} | null>(null)

  const handleOpenContextMenu = (evt: React.MouseEvent<SVGElement>) => {
    evt.preventDefault()
    const x = evt.clientX
    const y = evt.clientY
    setPosition({ left: x, top: y})
  }

  useEffect(() => {
    const handleCloseContextMenu = (evt: MouseEvent) => {
      const clickTarget = evt.target as HTMLElement
      const clickTargetId = clickTarget.id
      const notClickedVerticalDots = (
        clickTargetId !== `${id}-vertical-dots-svg` 
        && clickTargetId !== `${id}-vertical-dots-path`
      )
      if (notClickedVerticalDots) {
        setPosition(null)
      }
    }

    document.addEventListener('click', handleCloseContextMenu)

    return (()=>{
      document.removeEventListener('click', handleCloseContextMenu)
    })
  }, [position])
  return(
    <>
      <VerticalDots
        className={className}
        id={id}
        transform='scale(0.5)'
        onClick={handleOpenContextMenu}
      />
      {position &&
        <div
          className='fixed w-36 h-32 bg-night border border-solid border-iron'
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
