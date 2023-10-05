import React from 'react'

import type { FC } from 'react'

interface PlusWhiteProps extends Pick<HTMLElement, 'id'> {
  transform?: string
}

export const PlusWhite: FC<PlusWhiteProps> = ({
  id,
  transform
}) => {
  transform = transform !== undefined
    ? transform
    : ''
  return (
    <svg
      className='mr-1 mt-0.5'
      height="14"
      id={`${id}.plus-white-svg`}
      transform={transform}
      viewBox="0 0 448 512"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        color='white'
      >
        <path
          d="m416 208h-144v-144c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144h-144c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-144h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          fill="rgb(214, 216, 220)"
          id={`${id}.plus-white-path`}
        />
      </g>
    </svg>
  )
}
