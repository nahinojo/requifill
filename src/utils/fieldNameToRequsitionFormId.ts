export const fieldNameToRequisitionFormId = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  description: 'document.documentHeader.documentDescription',
  organizationDocumentNumber: 'document.documentHeader.organizationDocumentNumber',
  roomNumber: 'document.deliveryBuildingRoomNumber',
  unitOfMeasure: 'newPurchasingItemLine.itemUnitOfMeasureCode'
} as const
