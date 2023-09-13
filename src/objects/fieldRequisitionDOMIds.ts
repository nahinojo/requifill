import removeReadOnlyFromArray from '../utils/removeReadOnlyFromArray'

const fieldRequisitionDOMIdsReadonly = [
  'newAdHocRoutePerson.id',
  'newPurchasingItemLine.purchasingCommodityCode',
  'document.documentHeader.documentDescription',
  'document.deliveryToPhoneNumber',
  'document.deliveryBuildingRoomNumber'
] as const
export type FieldRequisitionDOMIds = typeof fieldRequisitionDOMIdsReadonly
const fieldRequisitionDOMIds = removeReadOnlyFromArray(fieldRequisitionDOMIdsReadonly)
export default fieldRequisitionDOMIds
