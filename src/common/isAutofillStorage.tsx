import syncStorage from './syncStorage'

/*
Determines if autofill is toggled on/off.
*/
const isAutofillStorage = async (): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then(storage => {
      console.log('storage?.settings?.isAutofill:', storage?.settings?.isAutofill)
      return Boolean(storage?.settings?.isAutofill)
    }).catch(error => {
      console.log(error)
      return false
    })
}
export default isAutofillStorage
