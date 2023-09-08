import React from 'react'
import type {
  HTMLAttributes,
  FC,
  ReactEventHandler,
  Dispatch,
  SetStateAction
} from 'react'
import camelToTitleCase from '../../utils/camelToTitleCase'
import SingleValueField from './SingleValueField'
import type { FieldDataProps } from '../../popup/App'
import MultiValueField from './MultiValueField'

interface FieldRendererProps extends HTMLAttributes<HTMLElement> {
  addAutofillItem: ReactEventHandler<HTMLElement>
  decreaseItemPriority: ReactEventHandler<HTMLElement>
  deleteAutofillItem: ReactEventHandler<HTMLElement>
  increaseItemPriority: ReactEventHandler<HTMLElement>
  fieldData: FieldDataProps
  syncFieldDataState: ReactEventHandler<HTMLInputElement>
  setIsRenderAddField: Dispatch<SetStateAction<boolean>>
}

const FieldRenderer: FC<FieldRendererProps> = ({
  addAutofillItem,
  decreaseItemPriority,
  deleteAutofillItem,
  fieldData,
  increaseItemPriority,
  setIsRenderAddField,
  syncFieldDataState
}) => {
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
                        syncFieldDataState={syncFieldDataState}
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
                        addAutofillItem={addAutofillItem}
                        decreaseItemPriority={decreaseItemPriority}
                        deleteAutofillItem={deleteAutofillItem}
                        id={id}
                        increaseItemPriority={increaseItemPriority}
                        key={key}
                        multiValues={Object.values(data.autofillValue)}
                        setIsRenderAddField={setIsRenderAddField}
                        syncFieldDataState={syncFieldDataState}
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
