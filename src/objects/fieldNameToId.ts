/*
Since the requisition form DOM Ids are absurdly long, fieldNameToId
is used to translate between Requifill's stored field name and the
corresponding <input>'s id within the requisition form DOM.
*/
import fieldNamesReadonly from './fieldNames'
import fieldRequisitionDOMIdsReadonly from './fieldRequisitionDOMIds'

import type { FieldNames } from './fieldNames'
import type { FieldRequisitionDOMIds } from './fieldRequisitionDOMIds'
type FieldNameToId = Record<FieldNames[number], FieldRequisitionDOMIds[number]>

const fieldNameToId: FieldNameToId | Record<string, string> = {}
for (let i = 0; i < fieldNamesReadonly.length; i++) {
  fieldNameToId[fieldNamesReadonly[i]] = fieldRequisitionDOMIdsReadonly[i]
}
export default fieldNameToId
