import { syncStorage } from '../objects'

export const getIsAutofill = async (): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then(storage => {
      return Boolean(storage?.settings?.isAutofill)
    })
    .catch(error => {
      console.error(error)
      return false
    })
}
