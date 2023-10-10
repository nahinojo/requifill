import {
  initialFieldData,
  syncStorage
} from '../utils'

browser.runtime.onInstalled.addListener(() => {
  syncStorage
    .set({ fieldData: initialFieldData })
    .catch(error => {
      console.error(error)
    })
    .catch(error => {
      console.error(error)
    })
})
