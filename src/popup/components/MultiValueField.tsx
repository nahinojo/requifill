import React, { useRef, useState } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC,
  ReactEventHandler
} from 'react'
import FieldContextMenu from './FieldContextMenu'
import ChevronPointer from './icons/ChevronPointer'
import Trash from './icons/Trash'
import VerticalArrows from './icons/VerticalArrows'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'onChange' | 'name' | 'inputMode'
>
interface MultiValueFieldProps extends HTMLProps, LabelProps, InputProps {
  title: string
  id: string
}

const MultiValueField: FC<MultiValueFieldProps> = ({ id, name, onChange, title, value }) => {
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnClickUp: ReactEventHandler<HTMLElement> = () => {
    console.log('Clicked up!')
  }

  const handleOnClickDown: ReactEventHandler<HTMLElement> = () => {
    console.log('Clicked down!')
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
              <ChevronPointer
                id={`${id}-expander`}
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
          <>
            <div
              className='bg-thunder rounded-t mx-1 h-14 flex flex-row flex-nowrap items-stretch'
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
                <ChevronPointer
                  id={`${id}-expander`}
                  transformSVG='scale(0.75)'
                />
              </div>
              <FieldContextMenu
                id={id}
                transformSVG='scale(.33)'
              />
            </div>
            <div
              className='h-14 mx-1 bg-overcast border-y border-silver grid grid-cols-12 items-center'
            >
              <VerticalArrows
                id={id}
                onClickDown={handleOnClickDown}
                onClickUp={handleOnClickUp}
              />
              <input
                className='bg-iron text-base h-9 ml-2 col-span-9 rounded indent-2 pt-1'
                id={`${id}-input`}
                name={name}
                ref={inputRef}
                type={'text'}
                value={value}
                onChange={onChange}
              />
              <Trash />
            </div>
          </>
        )
      }
    </>
  )
}

export default MultiValueField
