import React from 'react'
import type {
  HTMLAttributes,
  FC,
  ReactEventHandler
} from 'react'
import camelToTitleCase from '../../utils/camelToTitleCase'
import SingleValueField from './SingleValueField'
import type { FieldDataProps } from '../../popup/App'
import MultiValueField from './MultiValueField'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  decreaseValuePriority: ReactEventHandler<HTMLElement>
  deleteAutofillValue: ReactEventHandler<HTMLElement>
  increaseValuePriority: ReactEventHandler<HTMLElement>
  fieldData: FieldDataProps
  syncStateFieldData: ReactEventHandler<HTMLInputElement>
}

const FieldRenderer: FC<FieldRendererProps> = ({ decreaseValuePriority, deleteAutofillValue, increaseValuePriority, syncStateFieldData, fieldData }) => {
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
                  [id, data], index
                ) => {
                  const title = data.title == null
                    ? camelToTitleCase(id)
                    : data.title
                  const key = `${id}-${index}`
                  const value = data.autofillValue
                  if (
                    data.isActive &&
                    typeof value === 'string'
                  ) {
                    return (
                      <SingleValueField
                        id={id}
                        key={key}
                        syncStateFieldData={syncStateFieldData}
                        title={title}
                        value={value}
                      />
                    )
                  } else if (
                    data.isActive &&
                    typeof data.autofillValue === 'object'
                  ) {
                    return (
                      <MultiValueField
                        decreaseValuePriority={decreaseValuePriority}
                        deleteAutofillValue={deleteAutofillValue}
                        id={id}
                        increaseValuePriority={increaseValuePriority}
                        key={key}
                        multiValues={Object.values(data.autofillValue)}
                        syncStateFieldData={syncStateFieldData}
                        title={title}
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
