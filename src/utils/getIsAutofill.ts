import syncStorage from '../objects/syncStorage'

const getIsAutofill = async (): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then(storage => {
      return Boolean(storage?.settings?.isAutofill)
    })
    .catch(error => {
      console.error(error)
      return false
    })
}
export default getIsAutofill
