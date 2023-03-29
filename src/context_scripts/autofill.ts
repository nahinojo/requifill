const syncStorage: browser.storage.StorageAreaSync = browser.storage.sync

interface NameToIdDict {
    [key: string]: string;
}

const nameToIdDict: NameToIdDict = {
    adHocUserId: "newAdHocRoutePerson.id",
    commodityCode: "newPurchasingItemLine.purchasingCommodityCode",
    requestorPersonPhoneNumber: "document.requestorPersonPhoneNumber"  
}

const fillRequisitionForm = async(): Promise<void> => {
    const storedFillValues = await syncStorage.get(null)
    for (let name in storedFillValues) {
        const fillValue = storedFillValues[name]
        const targetInput = document.getElementById(nameToIdDict[name]) as HTMLInputElement
        if (targetInput.value !== fillValue) {
            targetInput.value = storedFillValues[name]
        }
    }
};

fillRequisitionForm();
syncStorage.onChanged.addListener(fillRequisitionForm);



