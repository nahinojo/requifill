import React, { useRef } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC,
  ReactEventHandler,
  SyntheticEvent
} from 'react'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'
>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<

InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'onChange' | 'name' | 'inputMode'
>

interface FieldItemProps extends HTMLProps, LabelProps, InputProps {
  title: string
}
interface OnBlurEvent extends SyntheticEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    name: string
  }
}
interface OnKeydownEvent extends SyntheticEvent<HTMLInputElement> {
  key: string
}

const FieldItem: FC<FieldItemProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { id } = props
  if (id === undefined) {
    throw new Error('React component id not found.')
  }

  const handleSaveValue: ReactEventHandler<HTMLInputElement> =
  (evt: OnBlurEvent) => {
    const { name } = evt.target
    browser.storage.sync
      .set({ [name]: props.value })
      .catch(error => { console.log(error) })
  }

  const handleEnterKeydown: ReactEventHandler<HTMLInputElement> = (
    evt: OnKeydownEvent
  ) => {
    const { key } = evt
    if (key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  return (
    <div
      className='field-item-wrapper'
      id={props.id}
    >
      <label
        className='field-item-label'
        id={`${id}-label`}
        htmlFor={`${id}-input`}
      >{props.title}</label>
      <input
        className='field-item-input'
        name={props.name}
        id={`${id}-input`}
        value={props.value}
        ref={inputRef}
        type={props.type}
        pattern={props.pattern}
        inputMode={props.inputMode}
        onChange={props.onChange}
        onBlur={handleSaveValue}
        onKeyDown={handleEnterKeydown}
      />
    </div>
  )
}

export default FieldItem
