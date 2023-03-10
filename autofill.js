
// This script saves the phone number then injects it from the browsers storage. The .set() command only needs to be called once.
browser.storage.local.set({
    "requestorPersonPhoneNumber": "777777778"
})

requestorPhoneInput = document.getElementById("document.requestorPersonPhoneNumber")


browser.storage.local.get(["requestorPersonPhoneNumber"]).then(result => {
    requestorPhoneInput.value = result.requestorPersonPhoneNumber
});