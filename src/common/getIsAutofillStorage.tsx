import syncStorage from './syncStorage'

/*
Retrieves setting of whether autofill is toggled on/off.
*/
const getIsAutofillStorage = async (): Promise<boolean> => {
  return await syncStorage.get('settings')
    .then(storage => {
      return Boolean(storage.settings?.isAutofillToggled)
    }).catch(error => {
      console.log(error)
      return false
    })
}

export default getIsAutofillStorage
