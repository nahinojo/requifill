import { createContext } from 'react'
import type { Dispatch } from 'react'
import type FieldData from '../../types/FieldData'
import type ActionProps from './ActionProps'
import initialFieldData from '../../objects/initialFieldData'

export const FieldDataContext = createContext<FieldData>(initialFieldData)
export const FieldDataDispatchContext = createContext<Dispatch<ActionProps> | null>(null)
