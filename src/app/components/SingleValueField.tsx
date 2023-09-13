import React, { useContext } from 'react'
import { FieldContextMenu } from '../components'
import { getFieldName } from '../../utils'

import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC,
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  ChangeEvent
} from 'react'
import {
  fieldDataContext,
  fieldDataDispatchContext
} from '../hooks'
import type { ActionProps } from '../../types'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'inputMode' | 'onChange'
>
interface SingleValueFieldProps extends HTMLProps, LabelProps, InputProps {
  id: string
  setIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
  title: string
}

export const SingleValueField: FC<SingleValueFieldProps> = ({
  id,
  setIsUnsavedChanges,
  title
}) => {
  const fieldData = useContext(fieldDataContext)
  const fieldDataDispatch = useContext(fieldDataDispatchContext) as Dispatch<ActionProps>
  const value = fieldData[getFieldName(id)].autofill as string

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value: autofill } = evt.target as HTMLInputElement
    const fieldName = getFieldName(id)
    fieldDataDispatch({
      autofill,
      fieldName,
      type: 'set-autofill'
    })
    setIsUnsavedChanges(true)
  }
  if (id === undefined) {
    throw new Error('React component ID not found.')
  }

  return (
    <div
      className='bg-thunder rounded mx-1 mb-1 h-14 flex flex-row flex-nowrap items-stretch'
      id={id}
    >
      <div
        className='flex-1 grow h-full items-center grid grid-cols-2'
        id={`${id}.selection`}
      >
        <label
          className='text-base ml-2'
          htmlFor={`${id}.input`}
          id={`${id}.label`}
        >{title}
        </label>
        <input
          className='bg-iron text-base h-9 ml-7 rounded indent-2 pt-1'
          id={`${id}.input`}
          type={'text'}
          value={value}
          onChange={handleInputChange}
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
