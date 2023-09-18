import type {
  Autofill
} from './'

export interface Field {
    autofill: Autofill
    isActive: boolean
    isFillToForm: boolean
    title?: string
}
