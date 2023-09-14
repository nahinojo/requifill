import { removeReadOnlyFromArray } from '../utils'

export const fieldRequisitionDOMIdsReadonly = [
  'newAdHocRoutePerson.id',
  'newPurchasingItemLine.purchasingCommodityCode',
  'document.documentHeader.documentDescription',
  'document.deliveryToPhoneNumber',
  'document.deliveryBuildingRoomNumber'
] as const
export const fieldRequisitionDOMIds = removeReadOnlyFromArray(fieldRequisitionDOMIdsReadonly)
