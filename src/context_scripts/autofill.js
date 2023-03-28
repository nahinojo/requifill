const syncStorage = browser.storage.sync

const nameToIdDict = {
    adHocUserId: "newAdHocRoutePerson.id",
    commodityCode: "newPurchasingItemLine.purchasingCommodityCode",
    requestorPersonPhoneNumber: "document.requestorPersonPhoneNumber"  
}

const fillRequisitionForm = async() => {
    const storedFillValues = await syncStorage.get(null)
    for (let name in storedFillValues) {
        const fillValue = storedFillValues[name]
        const targetInput = document.getElementById(nameToIdDict[name])
        if (targetInput.value !== fillValue) {
            targetInput.value = storedFillValues[name]
        }
    }
};

fillRequisitionForm();
syncStorage.onChanged.addListener(fillRequisitionForm);



