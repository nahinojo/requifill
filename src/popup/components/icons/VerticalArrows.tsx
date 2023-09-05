import React from 'react'
import ChevronPointer from './ChevronPointer'
import type { FC, HTMLAttributes, ReactEventHandler } from 'react'

interface VerticalArrowsProps extends HTMLAttributes<HTMLElement> {
  onClickDown: () => void
  onClickUp: () => void
  id: string
}

const VerticalArrows: FC<VerticalArrowsProps> = ({ id, onClickDown, onClickUp }) => {
  const handleClick: ReactEventHandler = (evt) => {
    const target = evt.target as HTMLAttributes<HTMLElement>
    const targetId = target.id as string
    if (targetId.includes('up-pointer')) {
      onClickUp()
    } else if (targetId.includes('down-pointer')) {
      onClickDown()
    }
  }

  return (
    <div
      className='w-full h-12 grid grid-rows-2'
      id={`${id}-vertical-arrows-container`}
      onClick={handleClick}
    >
      <ChevronPointer
        id={`${id}-up`}
        transformDiv='rotate(180deg)'
        transformSVG='scale(.7)'
      />
      <ChevronPointer
        id={`${id}-down`}
        transformSVG='scale(.7)'
      />
    </div>
  )
}

export default VerticalArrows
