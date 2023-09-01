import React from 'react'
import type { FC, HTMLAttributes } from 'react'

interface PlusSVGProps extends HTMLAttributes<SVGElement> {}

const PlusSVG: FC<PlusSVGProps> = ({ className }) => {
  return (
    <svg
      id='plus-svg'
      className={className}
      viewBox="0 0 448 512"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
    >
      <path
        d="m416 208h-144v-144c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144h-144c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-144h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
        fill="rgb(131 137 149)"
      />
    </svg>
  )
}

export default PlusSVG