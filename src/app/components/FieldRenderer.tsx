import React, { useContext } from 'react'
import { camelToTitleCase } from '../../utils'
import {
  SingleValueField,
  MultiValueField
} from './'
import { fieldDataContext } from '../hooks'

import type {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction
} from 'react'
import type { Field, FieldName } from '../../types'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  setIsRenderAddNewField: Dispatch<SetStateAction<boolean>>
  setIsUnsavedChanges: Dispatch<SetStateAction<boolean>>
}

export const FieldRenderer: FC<FieldRendererProps> = ({
  setIsRenderAddNewField,
  setIsUnsavedChanges
}) => {
  const fieldData = useContext(fieldDataContext)
  const isActiveFields = Object
    .values(fieldData)
    .some(fieldName => { return fieldName.isActive })
  const isInactiveFields = Object
    .values(fieldData)
    .some(fieldName => { return !fieldName.isActive })

  if (isInactiveFields) {
    setIsRenderAddNewField(true)
  }

  return (
    <>
      {
        !!isActiveFields && (
          <>
            <header
              className='text-silver text-sm ml-1 mt-3'
              id='autofill-values-title'
            >Autofill Values
            </header>
            {
              Object.entries(fieldData)
                .map((
                  [fieldName, field]: [FieldName, Field], index: number
                ) => {
                  const title = field.title === undefined
                    ? camelToTitleCase(fieldName)
                    : field.title
                  const key = `${fieldName}.${index}`
                  const { autofill } = field
                  if (
                    field.isActive &&
                    typeof autofill === 'string'
                  ) {
                    return (
                      <SingleValueField
                        id={fieldName}
                        key={key}
                        setIsUnsavedChanges={setIsUnsavedChanges}
                        title={title}
                        value={autofill}
                      />
                    )
                  } else if (
                    field.isActive &&
                    typeof field.autofill === 'object'
                  ) {
                    return (
                      <MultiValueField
                        id={fieldName}
                        key={key}
                        multiValues={Object.values(field.autofill)}
                        setIsRenderAddNewField={setIsRenderAddNewField}
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
