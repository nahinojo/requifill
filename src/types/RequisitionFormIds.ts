import type { requisitionFormIds } from '../utils'

export type RequisitionFormIds = typeof requisitionFormIds
export type RequisitionFormId = RequisitionFormIds extends Set<infer T> ? T : never
