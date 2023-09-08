import React from 'react'
import type { FC, HTMLAttributes } from 'react'

interface TrashProps extends HTMLAttributes<HTMLDivElement> {
  id: string
}

const Trash: FC<TrashProps> = ({ id, onClick }) => {
  return (
    <div
      className='justify-self-center mr-1 col-span-2 hover:cursor-pointer'
      id={`${id}.trash-div`}
      onClick={onClick}
    >
      <svg
        fill="none"
        height="24"
        id={`${id}.trash-svg`}
        stroke="rgb(214, 216, 220)"
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
          id={`${id}.trash-path`}
          stroke="none"
        />
        <line
          id={`${id}.trash-line`}
          x1="4"
          x2="20"
          y1="7"
          y2="7"
        />
        <line
          id={`${id}.trash-line`}
          x1="10"
          x2="10"
          y1="11"
          y2="17"
        />
        <line
          id={`${id}.trash-line`}
          x1="14"
          x2="14"
          y1="11"
          y2="17"
        />
        <path
          d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
          id={`${id}.trash-path`}
        />
        <path
          d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
          id={`${id}.trash-path`}
        />
      </svg>
    </div>
  )
}

export default Trash
