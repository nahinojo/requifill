import React, { useContext } from 'react'
import type {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction
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
  const isActiveFields = Object
    .values(fieldData)
    .some(fieldName => { return fieldName.isActive })
  const isInactiveFields = Object
    .values(fieldData)
    .some(fieldName => { return !fieldName.isActive })

  if (isInactiveFields) {
    setIsRenderAddField(true)
  }

  return (
    <>
      {
        !!isActiveFields && (
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
                  const key = `${id}.${index}`
                  const { autofillValue } = data
                  if (
                    data.isActive &&
                    typeof autofillValue === 'string'
                  ) {
                    return (
                      <SingleValueField
                        id={id}
                        key={key}
                        setIsUnsavedChanges={setIsUnsavedChanges}
                        title={title}
                        value={autofillValue}
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
