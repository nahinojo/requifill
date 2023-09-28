import React, { useContext } from 'react'
import type {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction
} from 'react'
import { camelToTitleCase } from '../../utils'
import {
  SingleValueField,
  MultiValueField
} from './'
import { fieldDataContext } from '../hooks'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  setIsRenderAddField: Dispatch<SetStateAction<boolean>>
  toggleIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
}

export const FieldRenderer: FC<FieldRendererProps> = ({
  setIsRenderAddField,
  toggleIsUnsavedChanges
}) => {
  const fieldData = useContext(fieldDataContext)
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
                  const title = data.title === undefined
                    ? camelToTitleCase(id)
                    : data.title
                  const key = `${id}.${index}`
                  const { autofill } = data
                  if (
                    data.isActive &&
                    typeof autofill === 'string'
                  ) {
                    return (
                      <SingleValueField
                        id={id}
                        key={key}
                        toggleIsUnsavedChanges={toggleIsUnsavedChanges}
                        title={title}
                        value={autofill}
                      />
                    )
                  } else if (
                    data.isActive &&
                    typeof data.autofill === 'object'
                  ) {
                    return (
                      <MultiValueField
                        id={id}
                        key={key}
                        multiValues={Object.values(data.autofill)}
                        setIsRenderAddField={setIsRenderAddField}
                        toggleIsUnsavedChanges={toggleIsUnsavedChanges}
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
