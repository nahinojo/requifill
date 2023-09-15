import type {
  Autofill
} from './'

export interface Field {
    autofill: Autofill
    isActive: boolean
    title?: string
}
