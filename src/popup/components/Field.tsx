import React, { useRef } from 'react'
import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  FC,
  ReactEventHandler,
  SyntheticEvent
} from 'react'
import { syncStorage } from '../../content_scripts/constants'

type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'id'>
type LabelProps = Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>
type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>,
'type' | 'pattern' | 'value' | 'onChange' | 'name' | 'inputMode'
>
interface FieldItemProps extends HTMLProps, LabelProps, InputProps {
  title: string
}
// interface OnBlurEvent extends SyntheticEvent<HTMLInputElement> {
//   target: HTMLInputElement & {
//     name: string
//   }
// }
interface OnKeydownEvent extends SyntheticEvent<HTMLInputElement> {
  key: string
}

const FieldItem: FC<FieldItemProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { id } = props
  if (id === undefined) {
    throw new Error('React component ID not found.')
  }

  /*
  Synchronizes browser storage with values within input elements.
  */
  const handleSaveValue: ReactEventHandler<HTMLInputElement> =
  () => {
    const { name } = props
    const newData = { [String(name)]: props.value }
    syncStorage
      .get('fieldData')
      .then(result => {
        const previousData = result.fieldData !== 'undefined'
          ? result.fieldData
          : {}
        const currentData = { ...previousData, ...newData }
        syncStorage
          .set({
            fieldData: currentData
          }).catch(
            error => { console.log(error) }
          )
      }).catch(
        error => { console.log(error) }
      )
  }

  /*
  Triggers handleSaveValue() listener on input elements.
  */
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
