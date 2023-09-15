import type { FieldData } from '../types'

export const initialFieldData: FieldData = {
  adHocUserId: {
    autofill: 'adarami',
    isActive: true,
    title: 'Ad Hoc User ID'
  },
  commodityCode: {
    autofill: '',
    isActive: false
  },
  description: {
    autofill: {
      0: 'Amazon',
      1: 'Digikey',
      2: 'Home Depot',
      3: 'Mouser'
    },
    isActive: true
  },
  phoneNumber: {
    autofill: '',
    isActive: false
  },
  roomNumber: {
    autofill: '237',
    isActive: false
  }
}
