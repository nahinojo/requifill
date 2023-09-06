import React, { useRef } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC
} from 'react'
import FieldContextMenu from './FieldContextMenu'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'onChange' | 'name' | 'inputMode'
>
interface SingleValueFieldProps extends HTMLProps, LabelProps, InputProps {
  title: string
}

const SingleValueField: FC<SingleValueFieldProps> = ({ id, name, onChange, title, value }) => {
  const inputRef = useRef<HTMLInputElement>(null)

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
          name={name}
          ref={inputRef}
          type={'text'}
          value={value}
          onChange={onChange}
        />
      </div>
      <FieldContextMenu
        id={id}
        transformSVG='scale(.33)'
      />
    </div>
  )
}

export default SingleValueField
