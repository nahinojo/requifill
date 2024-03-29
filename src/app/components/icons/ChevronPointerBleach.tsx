import React from 'react'
import type { FC, HTMLAttributes } from 'react'

interface ChevronPointerProps extends HTMLAttributes<HTMLElement> {
  id: string
  transformSVG?: string
  transformDiv?: string
}

export const ChevronPointerBleach: FC<ChevronPointerProps> = ({ id, transformSVG, transformDiv }) => {
  transformDiv = transformDiv !== undefined
    ? transformDiv
    : ''
  transformSVG = transformSVG !== undefined
    ? transformSVG
    : ''
  id = `${id}.pointer`

  return (
    <div
      className='w-6 h-full flex items-center justify-self-end hover:cursor-pointer'
      id={id}
      style={{ transform: `${transformDiv}` }}
    >
      <svg
        id={id}
        transform={transformSVG}
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m207.029 381.476-194.343-194.344c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04l154.746 154.021 154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941l-194.342 194.344c-9.373 9.372-24.569 9.372-33.942 0z"
          fill="rgb(214, 216, 220)"
          id={id}
        />
      </svg>
    </div>
  )
}
