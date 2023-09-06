import React from 'react'
import type {
  HTMLAttributes,
  FC,
  ReactEventHandler
} from 'react'
import camelToTitleCase from '../../common/camelToTitleCase'
import SingleValueField from './SingleValueField'
import type { FieldDataProps } from '../../popup/App'
import MultiValueField from './MultiValueField'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  handleOnClickDown: ReactEventHandler<HTMLElement>
  handleOnClickUp: ReactEventHandler<HTMLElement>
  fieldData: FieldDataProps
  updateStateFieldData: ReactEventHandler<HTMLInputElement>
}

const FieldRenderer: FC<FieldRendererProps> = ({ handleOnClickDown, handleOnClickUp, updateStateFieldData, fieldData }) => {
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
                        title={title}
                        updateStateFieldData={updateStateFieldData}
                        value={value}
                      />
                    )
                  } else if (
                    data.isActive &&
                    typeof data.autofillValue === 'object'
                  ) {
                    return (
                      <MultiValueField
                        handleOnClickDown={handleOnClickDown}
                        handleOnClickUp={handleOnClickUp}
                        id={id}
                        key={key}
                        multiValues={Object.values(data.autofillValue)}
                        title={title}
                        updateStateFieldData={updateStateFieldData}
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
