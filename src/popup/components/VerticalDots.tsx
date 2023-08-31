import React from 'react'
import type { FC, HTMLAttributes } from 'react'

interface VerticalDotsSVGProps extends HTMLAttributes<SVGElement> {
  transform: string
}

const VerticalDots: FC<VerticalDotsSVGProps> = ({ className, id, transform, onClick}) => {
  return (
    <svg
      id={`${id}-vertical-dots-svg`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 4 16"
      transform={transform}
      onClick={onClick}
    >
      <path
        id={`${id}-vertical-dots-path`}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="3"
        d="M1.5 2h.01M1.5 8h.01m-.01 6h.01"
      />
    </svg>
  )
}

export default VerticalDots