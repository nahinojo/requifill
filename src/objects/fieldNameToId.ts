/*
Since the requisition form DOM Ids are absurdly long, fieldNameToId
is used to translate between Requifill's stored field name and the
corresponding <input>'s id within the requisition form DOM.
*/
import {
  fieldNamesReadonly,
  fieldRequisitionDOMIdsReadonly
} from '../objects'

import type {
  FieldName,
  FieldNames,
  FieldRequisitionDOMId,
  FieldRequisitionDOMIds
} from '../types'

type FieldNameToIdPrototype<T extends number> = {
  [K in FieldNames[T]]?: FieldRequisitionDOMIds[T]
}
const fieldNameToIdPrototype: FieldNameToIdPrototype<number> = {}
for (let i = 0; i < fieldNamesReadonly.length; i++) {
  let fieldName: FieldName
  let fieldRequisitionDOMId: FieldRequisitionDOMId
  try {
    fieldName = fieldNamesReadonly[i]
  } catch {
    throw new Error('fieldName not found when defining fieldNameToId')
  }
  try {
    fieldRequisitionDOMId = fieldRequisitionDOMIdsReadonly[i]
  } catch {
    throw new Error('fieldRequisitionDOMId not found when defining fieldNameToId')
  }
  fieldNameToIdPrototype[fieldName] = fieldRequisitionDOMId
}
export type FieldNameToId<T extends number> = {
  [K in FieldNames[T]]: FieldRequisitionDOMIds[T]
}
export const fieldNameToId = fieldNameToIdPrototype as FieldNameToId<number>
