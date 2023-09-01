import React from 'react'
import type { FC, HTMLAttributes } from 'react'

interface VerticalDotsSVGProps extends HTMLAttributes<HTMLElement> {
  id: string
  transformSVG: string
}

const VerticalDots: FC<VerticalDotsSVGProps> = ({ className, id, transformSVG, onClick }) => {
  return (
    <div
      className={`${className ?? ''} cursor-pointer`}
      id={`${id}-vdots`}
      onClick={onClick}
    >
      <svg
        id={`${id}-vdots-svg`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 4 14"
        transform={transformSVG}
        >
          <path
            id={`${id}-vdots-path`}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
            d="M1.5 2h.01M1.5 7h.01m-.01 5h.01"
          />
      </svg>
    </div>
  )
}

export default VerticalDots
