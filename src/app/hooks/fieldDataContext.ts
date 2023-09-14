import { createContext } from 'react'
import { initialFieldData } from '../../utils'

import type { Dispatch } from 'react'
import type {
  ActionProps,
  FieldData
} from '../../types/'

export const fieldDataContext = createContext<FieldData>(initialFieldData)
export const fieldDataDispatchContext = createContext<Dispatch<ActionProps> | null>(null)
