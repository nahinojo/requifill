import React, { useRef } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC,
  ReactEventHandler,
  SyntheticEvent
} from 'react'
import syncStorage from '../../common/syncStorage'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'onChange' | 'name' | 'inputMode'
>
interface FieldProps extends HTMLProps, LabelProps, InputProps {
  title: string
}

const Field: FC<FieldProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { id, name, title, value, onChange } = props
  if (id === undefined) {
    throw new Error('React component ID not found.')
  }

  return (
    <div
      id={id}
      className='bg-thunder rounded mx-1 mb-1 h-14 grid justify-start items-center grid-cols-2'
    >
      <label
        id={`${id}-label`}
        className='text-base ml-2'
        htmlFor={`${id}-input`}
      >{title}</label>
      <input
        id={`${id}-input`}
        className='bg-iron text-base h-3/5 mx-3 rounded indent-1 pt-1'
        name={name}
        value={value}
        ref={inputRef}
        type={'text'}
        onChange={onChange}
      />
    </div>
  )
}

export default Field
