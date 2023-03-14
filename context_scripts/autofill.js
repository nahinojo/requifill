
// This script saves the phone number then injects it from the browsers storage. The .set() command only needs to be called once.
userStorage = browser.storage.local
requestorPhoneInput = document.getElementById("document.requestorPersonPhoneNumber")
userStorage.get(["requestorPhone"]).then(result => {
    requestorPhoneInput.value = result.requestorPhone
});

