import syncStorage from './syncStorage'

/*
Retrieves setting of whether autofill is toggled on/off.
*/
const isAutofillStorage = syncStorage.get('settings')
  .then(storage => {
    return Boolean(storage?.settings?.isAutofill)
  }).catch(error => {
    console.log(error)
    return false
  })

export default isAutofillStorage
