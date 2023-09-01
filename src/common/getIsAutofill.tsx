import syncStorage from './syncStorage'

/*
Determines if autofill is toggled on/off.
*/
const getIsAutofill = async (): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then(storage => {
      return Boolean(storage?.settings?.isAutofill)
    })
    .catch(error => {
      console.log(error)
      return false
    })
}
export default getIsAutofill
