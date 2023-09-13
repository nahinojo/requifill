import { removeReadOnlyFromArray } from '../utils'

console.log('Executing fieldRequisitionDOMIds.ts()')

export const fieldRequisitionDOMIdsReadonly = [
  'newAdHocRoutePerson.id',
  'newPurchasingItemLine.purchasingCommodityCode',
  'document.documentHeader.documentDescription',
  'document.deliveryToPhoneNumber',
  'document.deliveryBuildingRoomNumber'
] as const
export const fieldRequisitionDOMIds = removeReadOnlyFromArray(fieldRequisitionDOMIdsReadonly)
