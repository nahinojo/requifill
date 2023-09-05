import React from 'react'
import type {
  HTMLAttributes,
  FC,
  ReactEventHandler
} from 'react'
import camelToTitleCase from '../../common/camelToTitleCase'
import camelToKebabCase from '../../common/camelToKebabCase'
import SingleValueField from './SingleValueField'
import type { FieldDataProps } from '../../popup/App'
import MultiValueField from './MultiValueField'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  onChange: ReactEventHandler
  fieldData: FieldDataProps
}

const FieldRenderer: FC<FieldRendererProps> = ({ onChange, fieldData }) => {
  const hasActiveItems = Object
    .values(fieldData)
    .some(field => { return field.isActive })

  return (
    <>
      {
        !!hasActiveItems && (
          <>
            <header
              className='text-silver text-sm mt-3 ml-1'
              id='autofill-values-title'
            >Autofill Values
            </header>
            {
              Object.entries(fieldData)
                .map((
                  [name, data], index
                ) => {
                  const title = data.title == null
                    ? camelToTitleCase(name)
                    : data.title
                  const key = `${camelToKebabCase(name)}-${index}`
                  const id = camelToKebabCase(name)
                  if (
                    data.isActive &&
                    Object.keys(data.autofillValue).length === 1
                  ) {
                    return (
                      <SingleValueField
                        id={id}
                        key={key}
                        name={name}
                        title={title}
                        onChange={onChange}
                      />
                    )
                  } else if (
                    Object.keys(data.autofillValue).length > 1
                  ) {
                    return (
                      <MultiValueField
                        id={id}
                        key={key}
                        multiValues={data.autofillValue as Record<number, string>}
                        name={name}
                        title={title}
                        onChange={onChange}
                      />
                    )
                  }
                  return null
                })
            }
          </>
        )
      }
    </>
  )
}

export default FieldRenderer
