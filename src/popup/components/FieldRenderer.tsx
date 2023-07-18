import React from 'react'
import type {
  HTMLAttributes,
  FC,
  ReactEventHandler,
} from 'react'
import camelToTitleCase from '../../common/camelToTitleCase'
import camelToKebabCase from '../../common/camelToKebabCase'
import Field from './Field'
import type { FieldData } from '../../popup/App'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  onChange: ReactEventHandler
  fieldData: FieldData
}

const FieldRenderer: FC<FieldRendererProps> = ({onChange, fieldData}) => {
  return(
    <>
      {Object.entries(fieldData!).map(([name, data]) => {
        if (data.isActive) {
          const title = data.title == null
            ? camelToTitleCase(name)
            : data.title
          return <Field 
            name={name}
            title={title}
            id={camelToKebabCase(name)}
            value={data.value}
            onChange={onChange}
          />
        }
      })}
    </>
  )
}

export default FieldRenderer