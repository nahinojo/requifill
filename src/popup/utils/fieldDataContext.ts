import { createContext } from 'react'
import type { Dispatch } from 'react'
import type FieldDataProps from './FieldDataProps'
import type ActionProps from './ActionProps'

export const FieldDataContext = createContext<FieldDataProps | null>(null)
export const FieldDataDispatchContext = createContext<Dispatch<ActionProps> | null>(null)
