import type { FieldData } from '../types'

export const initialFieldData: FieldData = {
  adHocUserId: {
    autofill: 'adarami',
    isActive: true,
    isFillToForm: true,
    title: 'Ad Hoc User ID'
  },
  commodityCode: {
    autofill: '',
    isActive: false,
    isFillToForm: false
  },
  description: {
    autofill: {
      0: 'Amazon',
      1: 'Digikey',
      2: 'Home Depot',
      3: 'Mouser'
    },
    isActive: true,
    isFillToForm: false
  },
  organizationDocumentNumber: {
    autofill: '',
    isActive: false,
    isFillToForm: false,
    title: 'Budget Code'
  },
  roomNumber: {
    autofill: '237',
    isActive: false,
    isFillToForm: true
  },
  unitOfMeasure: {
    autofill: '',
    isActive: false,
    isFillToForm: false,
    title: 'UOM'
  }
}
