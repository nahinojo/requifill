import React, { useRef, useState } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC,
  SetStateAction
} from 'react'
import FieldContextMenu from './FieldContextMenu'
import CheveronPointerWhite from './icons/ChevronPointerWhite'
import Trash from './icons/Trash'
import VerticalArrows from './icons/VerticalArrows'
import PlusWhite from './icons/PlusWhite'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id' >
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'inputMode' | 'onChange'
>

interface MultiValueFieldProps extends HTMLProps, LabelProps, InputProps {
  id: string
  multiValues: string[]
  title: string
  setIsRenderAddField: Dispatch<SetStateAction<boolean>>
}

const MultiValueField: FC<MultiValueFieldProps> = ({
  id,
  setIsRenderAddField,
  title
}) => {
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
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
                  setIsRenderAddField(false)
                }
              }
            >
              <label
                className='text-base ml-2'
                htmlFor={`${id}.input`}
                id={`${id}.label`}
              >{title}
              </label>
              <CheveronPointerWhite
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
                    setIsRenderAddField(true)
                  }
                }
              >
                <label
                  className='text-base ml-2'
                  htmlFor={`${id}-input`}
                  id={`${id}-label`}
                >{title}
                </label>
                <CheveronPointerWhite
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
                  let divStyling = 'bg-night hover:bg-storm h-14 mx-1 border-t border-iron grid grid-cols-12 items-center'
                  if (index === multiValues.length - 1) {
                    divStyling = `${divStyling} mb-1 rounded-b`
                  }
                  return (
                    <div
                      className={divStyling}
                      id={`${id}.${index}.option-wrapper`}
                      key={`${index}`}
                    >
                      <VerticalArrows
                        id={`${id}.${index}`}
                        onClickDown={decreaseItemPriority}
                        onClickUp={increaseItemPriority}
                      />
                      <input
                        className='text-base h-9 ml-2 col-span-9 rounded indent-2 pt-1 bg-opacity-0 bg-storm'
                        id={`${id}.${index}.input`}
                        ref={inputRef}
                        type={'text'}
                        value={val}
                        onChange={syncFieldDataState}
                      />
                      <Trash
                        id={`${id}.${index}`}
                        onClick={deleteAutofillItem}
                      />
                    </div>
                  )
                })
            }
            <div
              className='flex justify-center mt-2 mb-3 mx-auto w-fit cursor-pointer'
              id={`${id}.add-new-entry-wrapper`}
              onClick={addAutofillItem}
            >
              <PlusWhite
                id={`${id}`}
              />
              <button
                className='text-sm text-bleach'
                id={`${id}.add-new-entry-button`}
                type='button'
              >
                Add New Entry
              </button>
            </div>
          </>
        )
      }
    </>
  )
}

export default MultiValueField
