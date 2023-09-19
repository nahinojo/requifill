export const fieldNameToRequisitionFormId = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  description: 'document.documentHeader.documentDescription',
  phoneNumber: 'document.deliveryToPhoneNumber',
  roomNumber: 'document.deliveryBuildingRoomNumber'
} as const
