import React from 'react'

import type { FC, HTMLAttributes } from 'react'

interface VerticalDotsProps extends HTMLAttributes<HTMLElement> {
  id: string
  transformSVG: string
}

export const VerticalDots: FC<VerticalDotsProps> = ({ id, transformSVG, onClick }) => {
  return (
    <div
      className='w-6 h-full flex items-center cursor-pointer'
      id={`${id}-vdots`}
      onClick={onClick}
    >
      <svg
        fill="none"
        id={`${id}-vdots-svg`}
        transform={transformSVG}
        viewBox="0 0 4 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.5 2h.01M1.5 7h.01m-.01 5h.01"
          id={`${id}-vdots-path`}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}
