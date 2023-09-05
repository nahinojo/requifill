import React from 'react'
import type { FC } from 'react'

const Trash: FC = () => {
  return (
    <div
      className='justify-self-center mr-1 col-span-2'
    >
      <svg
        fill="none"
        height="24"
        stroke="rgb(255,255,255)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0h24v24H0z"
          fill="none"
          stroke="none"
        />
        <line
          x1="4"
          x2="20"
          y1="7"
          y2="7"
        />
        <line
          x1="10"
          x2="10"
          y1="11"
          y2="17"
        />
        <line
          x1="14"
          x2="14"
          y1="11"
          y2="17"
        />
        <path
          d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
        />
        <path
          d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
        />
      </svg>
    </div>
  )
}

export default Trash
