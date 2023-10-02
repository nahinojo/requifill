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
                        setIsUnsavedChanges={setIsUnsavedChanges}
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
