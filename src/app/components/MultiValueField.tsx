import React, { useState, useContext } from 'react'
import { FieldContextMenu } from './FieldContextMenu'
import {
  fieldDataContext,
  fieldDataDispatchContext
} from '../hooks'
import {
  ChevronPointerWhite,
  PlusWhite,
  Trash,
  VerticalArrows

} from './icons'
import {
  getFieldIndex,
  getFieldName
} from '../../utils'

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
import type { ActionProps } from '../../types'

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

export const MultiValueField: FC<MultiValueFieldProps> = ({
  id,
  multiValues,
  setIsRenderAddField,
  setIsUnsavedChanges,
  title
}) => {
  if (id === undefined) {
    throw new Error('React component ID not found.')
  }
  const fieldData = useContext(fieldDataContext)
  const fieldDataDispatch = useContext(fieldDataDispatchContext) as Dispatch<ActionProps>
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false)
  setIsRenderAddField(!isListExpanded)

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    const { id: targetId, value: autofill } = evt.target as HTMLInputElement
    const fieldName = getFieldName(targetId)
    const fieldIndex = getFieldIndex(targetId)
    fieldDataDispatch({
      autofill,
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

  const handleDecreasePriority: MouseEventHandler<HTMLElement> =
  (evt: MouseEvent<HTMLElement>) => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldIndex = getFieldIndex(targetId)
    const fieldName = getFieldName(targetId)
    if (fieldIndex < (Object.keys(fieldData[fieldName].autofill).length - 1)) {
      const { autofill } = fieldData[fieldName]
      fieldDataDispatch({
        autofill,
        fieldIndex,
        fieldName,
        type: 'decrease-priority'
      })
      setIsUnsavedChanges(true)
    }
  }

  const handleIncreasePriority: MouseEventHandler<HTMLElement> =
  (evt: MouseEvent<HTMLElement>) => {
    const { id: targetId } = evt.target as HTMLElement
    const fieldIndex = getFieldIndex(targetId)
    if (fieldIndex > 0) {
      const fieldName = getFieldName(targetId)
      const autofill = fieldData[fieldName].autofill as Record<string, string>
      fieldDataDispatch({
        autofill,
        fieldIndex,
        fieldName,
        type: 'increase-priority'
      })
      setIsUnsavedChanges(true)
    }
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
              <ChevronPointerWhite
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
                <ChevronPointerWhite
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
