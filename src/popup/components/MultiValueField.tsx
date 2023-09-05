import React, { useRef, useState } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC
} from 'react'
import FieldContextMenu from './FieldContextMenu'
import ChevronPointerIcon from './ChevronPointerIcon'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'onChange' | 'name' | 'inputMode'
>
interface MultiValueFieldProps extends HTMLProps, LabelProps, InputProps {
  title: string
}

const MultiValueField: FC<MultiValueFieldProps> = ({ id, name, onChange, title, value }) => {
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false)

  if (id === undefined) {
    throw new Error('React component ID not found.')
  }

  return (
    <>
      {
        !isListExpanded && (
          <div
            className='bg-thunder rounded mx-1 mb-1 h-14 flex flex-row flex-nowrap items-stretch'
            id={id}
          >
            <div
              className='flex-1 grow h-full items-center grid grid-cols-2'
              id={`${id}-selection`}
              onClick={
                () => {
                  setIsListExpanded(true)
                }
              }
            >
              <label
                className='text-base ml-2'
                htmlFor={`${id}-input`}
                id={`${id}-label`}
              >{title}
              </label>
              <ChevronPointerIcon
                transformDiv='rotate(90deg)'
                transformSVG='scale(0.75)'
              />
            </div>
            <FieldContextMenu
              id={id}
              transformSVG='scale(.33)'
            />
          </div>
        )
      }
      {
        !!isListExpanded && (
          <div
            className='bg-thunder rounded-t mx-1 mb-1 h-14 flex flex-row flex-nowrap items-stretch'
            id={id}
          >
            <div
              className='flex-1 grow h-full items-center grid grid-cols-2 hover:cursor'
              id={`${id}-selection`}
              onClick={
                () => {
                  setIsListExpanded(false)
                }
              }
            >
              <label
                className='text-base ml-2'
                htmlFor={`${id}-input`}
                id={`${id}-label`}
              >{title}
              </label>
              <ChevronPointerIcon
                transformSVG='scale(0.75)'
              />
            </div>
            <FieldContextMenu
              id={id}
              transformSVG='scale(.33)'
            />
          </div>
        )
      }
    </>
  )
}

export default MultiValueField
