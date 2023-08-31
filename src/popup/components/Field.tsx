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
import VerticalDotsSVG from './VerticalDots'

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
      className='bg-thunder rounded mx-1 mb-1 h-14 items-center flex flex-row'
      id={id}
    >
        <div
          className='flex-none grow h-full items-center justify-items-start grid grid-cols-2'
          id={`${id}-wrapper`}
        >
          <label
            className='text-base ml-2 w-32'
            id={`${id}-label`}
            htmlFor={`${id}-input`}
          >{title}</label>
          <input
            className='bg-iron text-base h-3/5 mx-3 rounded indent-1 pt-1'
            id={`${id}-input`}
            name={name}
            value={value}
            ref={inputRef}
            type={'text'}
            onChange={onChange}
          />
      </div>
      <VerticalDotsSVG
        className='flex-auto'
        transform='scale(.05)'
      />
    </div>
  )
}

export default Field
