import React from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC,
  ReactNode
} from 'react'
import FieldContextMenu from './FieldContextMenu'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'onChange' | 'name' | 'inputMode'
>
interface FieldTemplateProps extends HTMLProps, LabelProps, InputProps {
  title: string
  extraElements: ReactNode
}

const FieldTemplate: FC<FieldTemplateProps> = ({ id, title, extraElements }) => {
  // const inputRef = useRef<HTMLInputElement>(null)

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
        id={`${id}-selection`}
      >
        <label
          className='text-base ml-2'
          htmlFor={`${id}-input`}
          id={`${id}-label`}
        >{title}
        </label>
        {extraElements}
      </div>
      <FieldContextMenu
        id={id}
        transformSVG='scale(.33)'
      />
    </div>
  )
}

export default FieldTemplate
