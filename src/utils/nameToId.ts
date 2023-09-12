/*
Since requisition form DOM IDs are absurdly long, a shorthand translation dictionary is used.
*/
const nameToId = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  description: 'document.documentHeader.documentDescription',
  phoneNumber: 'document.deliveryToPhoneNumber',
  roomNumber: 'document.deliveryBuildingRoomNumber'
}
export type nameToIdKeys = keyof typeof nameToId
export default nameToId
