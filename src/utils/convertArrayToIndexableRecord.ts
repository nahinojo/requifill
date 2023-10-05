import type { IndexableRecord } from '../types'

export const convertArrayToIndexableRecord = (arr: string[]): IndexableRecord => {
  const newArr: IndexableRecord = {}
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i]
  }
  return newArr
}
