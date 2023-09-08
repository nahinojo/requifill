import React, { useContext } from 'react'
import type {
  HTMLAttributes,
  FC,
  SetStateAction,
  Dispatch
} from 'react'
import camelToTitleCase from '../../utils/camelToTitleCase'
import SingleValueField from './SingleValueField'
import MultiValueField from './MultiValueField'
import { FieldDataContext } from '../utils/fieldDataContext'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  setIsRenderAddField: Dispatch<SetStateAction<boolean>>
  setIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
}

const FieldRenderer: FC<FieldRendererProps> = ({
  setIsRenderAddField,
  setIsUnsavedChanges
}) => {
  const fieldData = useContext(FieldDataContext)
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
                        setIsUnsavedChanges={setIsUnsavedChanges}
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
                        id={id}
                        key={key}
                        multiValues={Object.values(data.autofillValue)}
                        setIsRenderAddField={setIsRenderAddField}
                        setIsUnsavedChanges={setIsUnsavedChanges}
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
