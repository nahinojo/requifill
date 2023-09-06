import React, { useRef, useState } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC
} from 'react'
import FieldContextMenu from './FieldContextMenu'
import ChevronPointer from './icons/ChevronPointer'
import Trash from './icons/Trash'
import VerticalArrows from './icons/VerticalArrows'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'onChange' | 'name' | 'inputMode'
>

interface MultiValueFieldProps extends HTMLProps, LabelProps, InputProps {
  multiValues: string[]
  id: string
  title: string
}

const MultiValueField: FC<MultiValueFieldProps> = ({ id, name, onChange, title, multiValues }) => {
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnClickUp = (): void => {
    console.log('Clicked up!')
  }

  const handleOnClickDown = (): void => {
    console.log('Clicked down!')
  }

  return (
    <>
      {
        !isListExpanded && (
          <div
            className='bg-thunder rounded mx-1 mb-1 h-14 flex flex-row flex-nowrap items-stretch'
            id={`${id}.field-container`}
          >
            <div
              className='flex-1 grow h-full items-center grid grid-cols-2'
              id={`${id}.selection`}
              onClick={
                () => {
                  setIsListExpanded(true)
                }
              }
            >
              <label
                className='text-base ml-2'
                htmlFor={`${id}.input`}
                id={`${id}.label`}
              >{title}
              </label>
              <ChevronPointer
                id={`${id}.expander`}
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
              id={`${id}.container-contracted`}
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
            {
              multiValues
                .map((
                  val, index
                ) => {
                  let divStyling = 'h-14 mx-1 bg-overcast border-t border-silver grid grid-cols-12 items-center'
                  if (index === multiValues.length - 1) {
                    divStyling = `${divStyling} mb-1 rounded-b`
                  }
                  return (
                    <div
                      className={divStyling}
                      id={`${id}.option-wrapper`}
                      key={`${id}.${index}`}
                    >
                      <VerticalArrows
                        id={id}
                        onClickDown={handleOnClickDown}
                        onClickUp={handleOnClickUp}
                      />
                      <input
                        className='bg-iron text-base h-9 ml-2 col-span-9 rounded indent-2 pt-1'
                        id={`${id}.${index}.input`}
                        name={id}
                        ref={inputRef}
                        type={'text'}
                        value={val}
                        onChange={onChange}
                      />
                      <Trash />
                    </div>
                  )
                })
            }
          </>
        )
      }
    </>
  )
}

export default MultiValueField
