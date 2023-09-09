import React, { useState, useContext } from 'react'
import FieldContextMenu from './FieldContextMenu'
import CheveronPointerWhite from './icons/ChevronPointerWhite'
import Trash from './icons/Trash'
import VerticalArrows from './icons/VerticalArrows'
import PlusWhite from './icons/PlusWhite'
import { FieldDataContext, FieldDataDispatchContext } from '../utils/fieldDataContext'
import getFieldIndex from '../utils/getFieldIndex'
import getFieldName from '../utils/getFieldName'

import type {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  SetStateAction
} from 'react'
import type ActionProps from '../utils/ActionProps'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id' >
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'inputMode' | 'onChange'
>

interface MultiValueFieldProps extends HTMLProps, LabelProps, InputProps {
  id: string
  multiValues: string[]
  setIsRenderAddField: Dispatch<SetStateAction<boolean>>
  setIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
  title: string
}

const MultiValueField: FC<MultiValueFieldProps> = ({
  id,
  multiValues,
  setIsRenderAddField,
  setIsUnsavedChanges,
  title
}) => {
  if (id === undefined) {
    throw new Error('React component ID not found.')
  }
  const fieldData = useContext(FieldDataContext)
  const fieldDataDispatch = useContext(FieldDataDispatchContext) as Dispatch<ActionProps>
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false)
  setIsRenderAddField(!isListExpanded)

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    const { id: targetId, value: autofillValue } = evt.target as HTMLInputElement
    const fieldName = getFieldName(targetId)
    const fieldIndex = getFieldIndex(targetId)
    fieldDataDispatch({
      autofillValue,
      fieldIndex,
      fieldName,
      type: 'set-autofill'
    })
    setIsUnsavedChanges(true)
  }

  const handleAddItem: MouseEventHandler<HTMLButtonElement> =
  () => {
    const fieldName = getFieldName(id)
    fieldDataDispatch({
      fieldName,
      type: 'add-item'
    })
    setIsUnsavedChanges(true)
  }

  const handleDeleteItem: MouseEventHandler<HTMLElement> =
  (evt: MouseEvent<HTMLDivElement>) => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldIndex = getFieldIndex(targetId)
    const fieldName = getFieldName(targetId)
    fieldDataDispatch({
      fieldIndex,
      fieldName,
      type: 'delete-item'
    })
    setIsUnsavedChanges(true)
  }

  const handleIncreasePriority: MouseEventHandler<HTMLElement> =
  (evt: MouseEvent<HTMLElement>) => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldName = getFieldName(targetId)
    const fieldIndex = getFieldIndex(targetId)
    const { autofillValue } = fieldData[fieldName]
    fieldDataDispatch({
      autofillValue,
      fieldIndex,
      fieldName,
      type: 'increase-priority'
    })
    setIsUnsavedChanges(true)
  }

  const handleDecreasePriority: MouseEventHandler<HTMLElement> =
  (evt: MouseEvent<HTMLElement>) => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldName = getFieldName(targetId)
    const fieldIndex = getFieldIndex(targetId)
    const { autofillValue } = fieldData[fieldName]
    fieldDataDispatch({
      autofillValue,
      fieldIndex,
      fieldName,
      type: 'decrease-priority'
    })
    setIsUnsavedChanges(true)
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
              <CheveronPointerWhite
                id={`${id}.expander`}
                transformDiv='rotate(90deg)'
                transformSVG='scale(0.75)'
              />
            </div>
            <FieldContextMenu
              id={id}
              setIsUnsavedChanges={setIsUnsavedChanges}
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
                <CheveronPointerWhite
                  id={`${id}-expander`}
                  transformSVG='scale(0.75)'
                />
              </div>
              <FieldContextMenu
                id={id}
                setIsUnsavedChanges={setIsUnsavedChanges}
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
                        onClickDown={handleDecreasePriority}
                        onClickUp={handleIncreasePriority}
                      />
                      <input
                        className='text-base h-9 ml-2 col-span-9 rounded indent-2 pt-1 bg-opacity-0 bg-storm'
                        id={`${id}.${index}.input`}
                        type={'text'}
                        value={val}
                        onChange={handleInputChange}
                      />
                      <Trash
                        id={`${id}.${index}`}
                        onClick={handleDeleteItem}
                      />
                    </div>
                  )
                })
            }
            <button
              className='mt-2 mb-3 mx-auto w-fit cursor-pointer flex justify-center text-sm text-bleach'
              id={`${id}.add-item-button`}
              type='button'
              onClick={handleAddItem}
            >
              <PlusWhite
                id={`${id}`}
              /> Add New Entry
            </button>
          </>
        )
      }
    </>
  )
}

export default MultiValueField
