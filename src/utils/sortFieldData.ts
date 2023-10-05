import type { Field, FieldData, FieldName } from '../types'
import { convertArrayToIndexableRecord } from '../utils'

export const sortFieldData = (fieldData: FieldData): FieldData => {
  let fieldName: FieldName
  for (fieldName in fieldData) {
    const field = fieldData[fieldName]
    let fieldAttribute: keyof Field
    for (fieldAttribute in field) {
      if (fieldAttribute === 'autofill') {
        const { autofill } = fieldData[fieldName]
        if (typeof autofill !== 'string') {
          const autofillValues = Object.values(autofill)
          autofillValues.sort()
          const autofillSorted = convertArrayToIndexableRecord(autofillValues)
          fieldData[fieldName].autofill = autofillSorted
        }
      }
    }
  }
  return fieldData
}
