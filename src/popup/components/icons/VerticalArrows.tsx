import React from 'react'
import ChevronPointer from './ChevronPointer'
import type { FC, HTMLAttributes, MouseEventHandler } from 'react'

interface VerticalArrowsProps extends HTMLAttributes<HTMLElement> {
  onClickDown: MouseEventHandler<HTMLDivElement>
  onClickUp: MouseEventHandler<HTMLDivElement>
  id: string
}

const VerticalArrows: FC<VerticalArrowsProps> = ({ id, onClickDown, onClickUp }) => {
  const upPointerId = `${id}.up`
  const downPointerId = `${id}.down`

  const handleClick: MouseEventHandler<HTMLDivElement> = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const target = evt.target as HTMLAttributes<HTMLElement>
    const targetId = target.id as string
    if (targetId.includes(upPointerId)) {
      onClickUp(evt)
    } else if (targetId.includes(downPointerId)) {
      onClickDown(evt)
    }
  }

  return (
    <div
      className='w-full h-full grid grid-rows-2'
      id={`${id}.vertical-arrows-container`}
      onClick={handleClick}
    >
      <ChevronPointer
        id={upPointerId}
        transformDiv='rotate(180deg)'
        transformSVG='scale(.7)'
      />
      <ChevronPointer
        id={downPointerId}
        transformSVG='scale(.7)'
      />
    </div>
  )
}

export default VerticalArrows
