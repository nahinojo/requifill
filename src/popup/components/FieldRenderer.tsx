import React from 'react'
import type {
  HTMLAttributes,
  FC,
  ReactEventHandler
} from 'react'
import camelToTitleCase from '../../common/camelToTitleCase'
import camelToKebabCase from '../../common/camelToKebabCase'
import Field from './Field'
import type { FieldData } from '../../popup/App'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  onChange: ReactEventHandler
  fieldData: FieldData
}

const FieldRenderer: FC<FieldRendererProps> = ({ onChange, fieldData }) => {
  const hasActiveItems = Object.values(fieldData)
    .some(field => { return field.isActive })
  return (
    <>
    {hasActiveItems && (
      <>
        <header
          id='autofill-values-title'
          className='text-silver text-sm mt-3 ml-1'
        >Autofill Values
        </header>
        {Object.entries(fieldData)
          .map(([name, data], index) => {
            if (data.isActive) {
              const title = data.title == null
                ? camelToTitleCase(name)
                : data.title
              return (
<Field
  name={name}
  key={`${camelToKebabCase(name)}-${index}`}
  title={title}
  id={camelToKebabCase(name)}
  value={data.value}
  onChange={onChange}
/>
              )
            }
            return null
          })}
      </>
    )}
    </>
  )
}

export default FieldRenderer
