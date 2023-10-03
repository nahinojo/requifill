export const fieldNameToRequisitionFormId = {
  adHocUserId: 'newAdHocRoutePerson.id',
  commodityCode: 'newPurchasingItemLine.purchasingCommodityCode',
  description: 'document.documentHeader.documentDescription',
  explanation: 'document.documentHeader.explanation',
  organizationDocumentNumber: 'document.documentHeader.organizationDocumentNumber',
  roomNumber: 'document.deliveryBuildingRoomNumber',
  unitOfMeasure: 'newPurchasingItemLine.itemUnitOfMeasureCode'
} as const
